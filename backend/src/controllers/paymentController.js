import prisma from '../lib/prismaClient.js';
import { 
  createOrderForStagingCompany, 
  recordWebhookPayment, 
  refundPayment,
  getPaymentPreview
} from '../services/paymentService.js';
import crypto from 'crypto';


export const previewPaymentAmount = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const preview = await getPaymentPreview(sessionId);
    res.json({ success: true, preview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createPaymentOrder = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const order = await createOrderForStagingCompany(sessionId);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyRazorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const payload = JSON.stringify(req.body);
  const signature = req.headers['x-razorpay-signature'];

  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (expected === signature) {
    const event = req.body.event;
    const payment = req.body.payload.payment.entity;

    await recordWebhookPayment(event, payment);
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(400).json({ error: 'Invalid signature' });
  }
};

export const refundPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const result = await refundPayment(parseInt(paymentId));
    res.json({ success: true, refund: result });
  } catch (err) {
    console.error('Refund error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const getPaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(paymentId) }
    });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ success: true, payment });
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const getPaymentsBySessionId = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const payments = await prisma.payment.findMany({
      where: { stagingCompanyId: sessionId }
    });
    res.json({ success: true, payments });
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany();
    res.json({ success: true, payments });
  } catch (err) {
    console.error('Error fetching all payments:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};