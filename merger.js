const mergePdfs = async (files) => {
  const { default: PDFMerger } = await import('pdf-merger-js');
  const merger = new PDFMerger();
  // Iterate over the array of files and add them to the merger
  for (const file of files.slice().reverse()) {
    await merger.add(file);
  }
  let date = new Date().getTime()

  // Set metadata
  await merger.setMetadata({
    producer: "pdf-merger-js based script",
    author: "Dhananjay Kar",
    creator: "Dhananjay Kar",
    title: "Ma vie de Dhananjay Kar"
  });

  await merger.save(`public/${date}.pdf`); //save under given name and reset the internal document
  
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
  return date;
}

module.exports = {mergePdfs}