import pdf from "html-pdf";
import { Stream } from "stream";
import { ContentBlock } from "types/project,types";

export const contentBlocksToPDF = (
  contentBlocks: ContentBlock[],
  projectName: string
): Promise<Stream> => {
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
  return htmlToStream(html);
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

const htmlToStream = (html: string): Promise<Stream> => {
  return new Promise<Stream>((resolve, reject) => {
    pdf.create(html).toStream((err, stream) => {
      if (err) return reject(err);
      return resolve(stream);
    });
  });
};
