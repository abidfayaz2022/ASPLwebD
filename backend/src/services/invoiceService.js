import fs from 'fs-extra';
import PDFDocument from 'pdfkit';
import path from 'path';

export const generateInvoicePdf = async (company, payment) => {
  const invoiceFolder = path.join('invoices');
  const invoicePath = path.join(invoiceFolder, `invoice-${payment.id}.pdf`);

  await fs.ensureDir(invoiceFolder);

  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(invoicePath);
  doc.pipe(writeStream);

  doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();

  doc.fontSize(12)
    .text(`Invoice ID: ${payment.id}`)
    .text(`Date: ${new Date(payment.paymentDate).toDateString()}`)
    .text(`Company Name: ${company.companyName}`)
    .text(`Payment Reference: ${payment.paymentReference}`)
    .moveDown();

  doc.text(`Amount Paid: ${payment.amount} ${payment.currency}`)
    .text(`Payment Method: ${payment.paymentMethod}`)
    .text(`Payment Status: ${payment.paymentStatus}`)
    .moveDown();

  doc.text('Thank you for choosing Angel Services!', { align: 'center' });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(invoicePath));
    writeStream.on('error', reject);
  });
};
