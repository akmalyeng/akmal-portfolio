import fs from 'node:fs/promises';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const previews = [
  {
    source: 'private/certificates/acad-certificate.pdf',
    output: 'public/certificates/acad-certificate-preview.pdf',
  },
  {
    source: 'private/certificates/mentorship-kinesis-certificate.pdf',
    output: 'public/certificates/mentorship-kinesis-certificate-preview.pdf',
  },
];

function drawWatermark(page, boldFont, regularFont) {
  const { width, height } = page.getSize();
  const mainText = 'PORTFOLIO PREVIEW';
  const noteText = 'For reference only';
  const mainSize = Math.max(34, Math.min(72, width / 10));
  const noteSize = Math.max(16, Math.min(28, width / 26));
  const mainWidth = boldFont.widthOfTextAtSize(mainText, mainSize);
  const noteWidth = regularFont.widthOfTextAtSize(noteText, noteSize);
  const centerX = width / 2;
  const centerY = height / 2;

  page.drawText(mainText, {
    x: centerX - mainWidth / 2,
    y: centerY + 6,
    size: mainSize,
    font: boldFont,
    color: rgb(0.42, 0.45, 0.5),
    opacity: 0.22,
    rotate: degrees(-28),
  });

  page.drawText(noteText, {
    x: centerX - noteWidth / 2,
    y: centerY - mainSize * 0.72,
    size: noteSize,
    font: regularFont,
    color: rgb(0.42, 0.45, 0.5),
    opacity: 0.28,
    rotate: degrees(-28),
  });
}

async function createPreview({ source, output }) {
  const bytes = await fs.readFile(source);
  const pdf = await PDFDocument.load(bytes);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdf.embedFont(StandardFonts.Helvetica);

  pdf.getPages().forEach((page) => drawWatermark(page, boldFont, regularFont));
  await fs.writeFile(output, await pdf.save());
  console.log(`Created ${output}`);
}

for (const preview of previews) {
  await createPreview(preview);
}
