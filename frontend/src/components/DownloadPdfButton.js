import jsPDF from 'jspdf';

export default function DownloadPdfButton({
  data,
  fileName = 'summary.pdf',
  title = 'Summary Report'
}) {
  const handleDownload = async () => {
    const doc = new jsPDF();

    // Load and draw logo
    const logoUrl =
      'https://angel-frontend.s3.ap-southeast-1.amazonaws.com/public/images/angelserviceslogo%20(2).png';

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = logoUrl;

    img.onload = () => {
      // Draw logo
      doc.addImage(img, 'PNG', 70, 10, 70, 25);

      // Tagline
      //doc.setFontSize(10);
      //doc.setTextColor(80);
      //doc.text('Your partner for business growth', 105, 38, { align: 'center' });

      // Divider
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(15, 42, 195, 42);

      // Title
      doc.setFontSize(14);
      doc.setTextColor('#1f2a44');
      doc.setFont('helvetica', 'bold');
      doc.text(title, 20, 55);

      // Data rows
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      let y = 65;

      data.forEach(({ label, value }) => {
        doc.text(label + ':', 20, y);
        doc.text(value, 190, y, { align: 'right' });
        y += 10;
      });

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(130);
      const timestamp = new Date().toLocaleString();
      doc.text(`Generated on: ${timestamp}`, 20, 285);

      doc.save(fileName);
    };
  };

  return (
    <button className="downloadBtn" onClick={handleDownload}>
      Download PDF Summary
      <style jsx>{`
        .downloadBtn {
          background-color: #fcb900;
          color: #000;
          font-weight: 600;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          margin-top: 30px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .downloadBtn:hover {
          background-color: #e6a800;
          transform: translateY(-2px);
        }
      `}</style>
    </button>
  );
}
