import prisma from '../lib/prismaClient.js';
import razorpay from '../config/razorpayConfig.js';
import { PaymentStatus } from '../constants/paymentStatus.js';


export const getPaymentPreview = async (sessionId) => {
  const session = await prisma.stagingCompany.findUnique({
    where: { id: sessionId }
  });

  if (!session || !session.servicesSelected) {
    throw new Error('No services selected for this session.');
  }

  const selectedServiceIds = JSON.parse(session.servicesSelected);

  const services = await prisma.service.findMany({
    where: {
      id: { in: selectedServiceIds }
    }
  });

  const totalAmount = services.reduce((sum, svc) => sum + parseFloat(svc.cost), 0);

  return {
    totalAmount,
    currency: 'INR',
    services: services.map(svc => ({
      id: svc.id,
      name: svc.serviceName,
      cost: parseFloat(svc.cost)
    }))
  };
};
/**
 * Create Razorpay order based on services selected in staging company
 */
export const createOrderForStagingCompany = async (sessionId) => {
  const session = await prisma.stagingCompany.findUnique({
    where: { id: sessionId }
  });

  if (!session) {
    throw new Error('Session not found.');
  }

  if (!session.isEmailVerified) {
    throw new Error('Email is not verified. Please verify your email before proceeding with payment.');
  }

  if (!session.servicesSelected) {
    throw new Error('No services selected for this session.');
  }

  const selectedServiceIds = JSON.parse(session.servicesSelected);

  const services = await prisma.service.findMany({
    where: {
      id: { in: selectedServiceIds }
    }
  });

  const totalAmount = services.reduce((sum, svc) => sum + parseFloat(svc.cost), 0);

  let order;
  try {
    order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `rcpt_${sessionId}`,
      notes: {
        sessionId,
        services: selectedServiceIds.join(', ')
      }
    });
  } catch (error) {
    throw new Error(`Failed to create Razorpay order: ${error.message}`);
  }

  await prisma.stagingCompany.update({
    where: { id: sessionId },
    data: {
      razorpayOrderId: order.id
    }
  });

  return order;
};


/**
 * Record Razorpay webhook payment event
 */
export const recordWebhookPayment = async (event, payment) => {
  const sessionId = payment.notes?.sessionId;

  if (!sessionId) throw new Error('No sessionId in payment notes');

  const baseData = {
    paymentReference: payment.id,
    currency: payment.currency,
    amount: payment.amount / 100,
    paymentMethod: payment.method,
    services: payment.notes?.services || 'Incorporation',
    stagingCompanyId: sessionId,
    paymentDate: new Date()
  };

  if (event === 'payment.captured') {
    await prisma.stagingCompany.update({
      where: { id: sessionId },
      data: { isPaid: true }
    });

    await prisma.payment.create({
      data: {
        ...baseData,
        paymentStatus: PaymentStatus.COMPLETED
      }
    });
  } else if (event === 'payment.failed') {
    await prisma.payment.create({
      data: {
        ...baseData,
        paymentStatus: PaymentStatus.FAILED
      }
    });
  }
};

/**
 * Refund Razorpay payment and save record
 */
export const refundPayment = async (paymentId) => {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });

  if (!payment) throw new Error('Payment not found');
  if (![PaymentStatus.COMPLETED].includes(payment.paymentStatus)) {
    throw new Error('Only completed payments can be refunded');
  }

  const refund = await razorpay.payments.refund(payment.paymentReference, {
    amount: Math.round(payment.amount * 100)
  });

  await prisma.refund.create({
    data: {
      paymentId: payment.id,
      refundId: refund.id,
      amount: refund.amount / 100,
      status: refund.status
    }
  });

  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      paymentStatus: PaymentStatus.REFUNDED
    }
  });

  return {
    refundId: refund.id,
    amount: refund.amount / 100,
    status: refund.status
  };
};
