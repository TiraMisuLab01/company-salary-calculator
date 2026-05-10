import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportNodeAsPdf(node: HTMLElement, filename: string) {
  const canvas = await html2canvas(node);
  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imageData, "PNG", 0, 0, width, height);
  pdf.save(filename);
}
