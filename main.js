const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdfs} = require('./merger')
const upload = multer({ dest: 'uploads/' })

app.use('/static', express.static('public'))

// Serve static files from the 'assets' folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve the index.html file from the 'templates' folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfiles'), async (req, res, next) => {
  try {
    console.log(req.files);
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Two or More PDF files are required.");
    }
    // Get file paths from uploaded files
    const filePaths = req.files.map(file => path.join(__dirname, file.path));

    // Call the mergePdfs function with the array of file paths
    let date = await mergePdfs(filePaths);
    
    res.redirect(`http://localhost:3000/static/${date}.pdf`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while merging PDFs.");
  }
});

app.listen(3000, ()=>{
  console.log(`The site is live on http://localhost:3000`);
})