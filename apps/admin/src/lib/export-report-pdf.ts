import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export type PdfTableSection = {
  title: string;
  head: string[][];
  body: (string | number)[][];
  foot?: (string | number)[][];
};

type DownloadReportPdfOptions = {
  filename: string;
  title: string;
  subtitle?: string;
  meta?: string[];
  sections: PdfTableSection[];
};

export function downloadReportPdf(options: DownloadReportPdfOptions) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  let y = 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(27, 42, 74);
  doc.text(options.title, 14, y);
  y += 8;

  if (options.subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text(options.subtitle, 14, y);
    y += 6;
  }

  for (const line of options.meta ?? []) {
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    doc.text(line, 14, y);
    y += 5;
  }

  y += 4;

  for (const section of options.sections) {
    if (section.body.length === 0 && !section.foot?.length) continue;

    if (y > 175) {
      doc.addPage();
      y = 14;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(27, 42, 74);
    doc.text(section.title, 14, y);
    y += 2;

    autoTable(doc, {
      startY: y + 2,
      head: section.head,
      body: section.body,
      foot: section.foot,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [232, 223, 196],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [27, 42, 74],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      footStyles: {
        fillColor: [253, 248, 227],
        textColor: [27, 42, 74],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [255, 252, 245] },
      theme: "grid",
      margin: { left: 14, right: 14 },
    });

    y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable
      .finalY + 10;
  }

  doc.save(options.filename);
}
