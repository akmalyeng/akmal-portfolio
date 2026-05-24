import fs from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';

const resumes = [
  {
    source: 'public/resume/technical-resume-sufyan-akmal.pdf',
    output: 'public/resume/technical-resume-sufyan-akmal-dron-2026.pdf',
    title: 'Technical Resume Sufyan Akmal Dron 2026',
  },
  {
    source: 'public/resume/general-resume-sufyan-akmal.pdf',
    output: 'public/resume/general-resume-sufyan-akmal-dron-2026.pdf',
    title: 'General Resume Sufyan Akmal Dron 2026',
  },
];

for (const resume of resumes) {
  const bytes = await fs.readFile(resume.source);
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false });

  pdf.setTitle(resume.title);
  pdf.setAuthor('Sufyan Akmal Dron');
  pdf.setSubject(resume.title);
  pdf.setKeywords(['Sufyan Akmal', 'Resume', 'Portfolio', 'Computer Science']);
  pdf.setProducer('Sufyan Akmal Portfolio');
  pdf.setCreator('Sufyan Akmal Portfolio');

  await fs.writeFile(resume.output, await pdf.save());
  console.log(`Updated ${resume.output}`);
}
