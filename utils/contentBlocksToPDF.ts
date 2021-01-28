import pdf from "html-pdf";
import { ContentBlock } from "types/project,types";

export const contentBlocksToPDF = (
  contentBlocks: ContentBlock[],
  projectName: string
): Promise<Buffer> => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
  </head>
  <body>
    ${contentBlocks.map((contentBlock) => contentBlockToHTML(contentBlock)).join("\n")}
  </body>
  </html>
  `;
  return htmlToBuffer(html);
};

const contentBlockToHTML = ({ value, type }: ContentBlock): string => {
  switch (type) {
    case "heading1":
      return `<h1>${value}</h1>`;
    case "heading2":
      return `<h2>${value}</h2>`;
    case "image":
      return `<img src="${value}">`;
    case "paragraph":
      return `<p>${value}</p>`;
    case "list":
      return `<ul>
        ${value
          .split("\n")
          .map((el) => `<li>${el}</li>`)
          .join("\n")}
      </ul>`;
    default:
      return `<div>${value}</div>`;
  }
};

const htmlToBuffer = (html: string): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    pdf.create(html).toBuffer((err, buffer) => {
      if (err) return reject(err);
      return resolve(buffer);
    });
  });
};
