notesRouter = require('express').Router()
const {getAllNotes, createNote, retrieveNote, updateNote, deleteNote} = require('../controllers/note')


notesRouter.get('', getAllNotes)
notesRouter.post('', createNote)
notesRouter.get('/:id', retrieveNote)
notesRouter.put('/:id', updateNote)
notesRouter.delete('/:id', deleteNote)


module.exports = notesRouter