notesRouter = require('express').Router()
const {getAllNotes, createNote, retrieveNote} = require('../controllers/note')


notesRouter.get('', getAllNotes)
notesRouter.post('', createNote)
notesRouter.get('/:id', retrieveNote)

module.exports = notesRouter