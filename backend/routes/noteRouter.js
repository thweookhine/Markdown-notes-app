
const express = require('express');
const upload = require('../config/upload.js');
const Note = require('../models/note.js');
const authenticateUser = require('../middlewares/authenticateUser.js');
const path = require('path')
const fs = require('fs').promises
const { readFile } = require('fs/promises');
const MarkdownIt = require('markdown-it');
const { error } = require('console');
const md = new MarkdownIt({ breaks: false });
const noteRouter = express.Router();

async function checkFileExists(filePath) {
  try {
      await fs.access(filePath, fs.constants.F_OK); // Checks if file is accessible
      console.log('File exists:', filePath);
      return true
  } catch (error) {
      console.log('File does not exist:', filePath);
      return false;
  }
}

getFilePath = (fileName) => {
  return path.join(__dirname, '../notes', fileName);
}

noteRouter.post('/notes/uploadNoteFile', authenticateUser, upload.single('noteFile'), async (req,res) => {
    if(!req.file){
        return res.status(400).json({error: "Please Upload One File!"})
    }

    // Access file details from req.file
    const fileName = req.file.filename
    const filePath = req.file.path;

    try {
        // Use await to wait for the creation to complete
        const note = await Note.create({
          fileName,
          userId: req.user.id
        });
    
        return res.status(200).json({
            message: "Note File Uploaded Successfully",
            note
        })
      } catch (err) {
        return res.status(500).send({error: "Error creating note"});
      }

})

noteRouter.post('/notes/saveNote', authenticateUser,async(req,res) => {
  let {fileName, content} = req.body;

  if(!content){
    return res.status(400).json({error: "Content is required"})
  }

  const timestamp = new Date().toISOString();
  if(!fileName) {
    fileName = `Note_${timestamp}.md`
  }else{
    fileName = `${fileName}_${timestamp}.md`
  }

  const filePath = getFilePath(fileName)

  try {

    // Write data to file
    fs.writeFile(filePath, content, err => {
      if (err) {
        return res.status(500).json({ error: "Failed to save note file" });
      }
    })

    // Use await to wait for the creation to complete
    const note = await Note.create({
      fileName,
      userId: req.user.id
    });

    return res.status(200).json({
        message: 'File Saved Successfully',
        note
    })
  } catch (err) {
    // Handle any errors
    return res.status(500).json({ error: "Error creating note" });
  }

})

noteRouter.get('/notes/renderHtml/:noteId', authenticateUser, async(req,res) => {
  try{
    const noteId = req.params.noteId

    const note = await Note.findOne({ where: { id: noteId } });

    if(!note) {
      return res.status(400).json({message: "Note not found"})
    }

    // Get file path 
    const filePath = getFilePath(note.fileName)

    const isFileExist = await checkFileExists(filePath);
    if(!isFileExist) {
      return res.status(400).json({error: "File doesn't exist"})
    }

    const data = await readFile(filePath, 'utf8')

    let htmlContent = md.render(data);
    htmlContent = htmlContent.replace(/\n/g, '');
    return res.status(200).json({
      htmlContent
    })
  }catch(error){
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
})

noteRouter.get('/notes/check-grammar/:noteId', authenticateUser, async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findOne({ where: { id: noteId } });

    if (!note) {
      return res.status(400).json({ message: "Note not found!" });
    }

    // Get the file path where the markdown file was saved
    const filePath = getFilePath(note.fileName)

    const isFileExist = await checkFileExists(filePath);
    if(!isFileExist) {
      return res.status(400).json({error: "File doesn't exist"})
    }

    // Read the markdown file contents using fs.promises.readFile
    const data = await readFile(filePath, 'utf8');
    
    if (!data) {
      return res.status(400).json({ error: "File Content is required!" });
    }

    // Convert data to HTML
    const content = md.render(data);

    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        language: "en-US",
        text: content,
      }),
    });

    const apiData = await response.json();

     // Check if any matches (errors) exist
     if (apiData.matches.length === 0) {
      return res.status(200).json({message: "No grammar or spelling issues found."})
    }

     // Process and display errors
     const results = apiData.matches.map((match) => ({
      message: match.message,
      suggestions: match.replacements.map((r) => r.value),
      incorrectWord: content.substring(match.offset, match.offset + match.length),
      position: match.offset,
    }));

    // Send result as response
    return res.status(200).json({
      results // Assuming result.matches contains grammar issues
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
});

noteRouter.delete('/notes/:noteId', authenticateUser, async(req,res) => {
  try{
    const noteId = req.params.noteId;
    const note = await Note.findOne({ where: { id: noteId } });

    if(!note) {
      return res.status(400).json({error: "Note not found!"})
    }

    const filePath =getFilePath(note.fileName);

    await Note.destroy({
      where: {id: noteId}
    })

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({message: 'Error deleting file:', err})
      }else{
        return res.status(200).json({message: "Note Record deleted successfully."})
      }
  })
  }catch(err){
    console.log(err)
     return res.status(500).json({error: "Error deleting record: "+err})
  }
  
})

noteRouter.get('/notes/listByUser', authenticateUser, async(req,res) => {
    const notes = await Note.findAll({
      userId: req.user.id
    })
    return res.status(200).json({
        message: 'Successfully retrieved all notes',
        notes
    })
})

module.exports = noteRouter