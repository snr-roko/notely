notesRouter = require('express').Router()
const {getAllNotes, createNote} = require('../controllers/note')


notesRouter.get('', getAllNotes)
notesRouter.post('', createNote)

module.exports = notesRouter