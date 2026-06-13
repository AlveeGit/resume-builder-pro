// pdf.ts
export async function exportResumeToPDF(elementId: string, filename: string) {
  try {
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.getElementById(elementId);

    if (!element) {
      throw new Error("Resume element not found");
    }

    const options = {
      margin: 0,
      filename,
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    await html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error("PDF Export Error:", error);
    throw error;
  }
}
