const Note = require('../models/note')
const {successResponse, errorResponse} = require('../utils/responses')

const getAllNotes = async (request, response) => {
  const notes = await Note.find({}).sort({updatedAt: -1})
  const payload = successResponse('Notes fetched successfully', notes)
  response.json(payload)
}

const createNote = async (request, response) => {
  if (!request.body.title || !request.body.body) {
    const payload = errorResponse('Title and body are required', [])
    return response.status(400).json(payload)
  }
  const {title, body} = request.body

  const existingNote = await Note.findOne({title})
  if (existingNote) {
    const payload = errorResponse('Validation Error: Note Title Duplicated', [])
    return response.status(400).json(payload)
  }

  const note = new Note({
    title: title,
    body: body
  })

  const newNote = await note.save()
  const payload = successResponse('Note created successfully', newNote)

  response.status(201).json(payload)

}

const retrieveNote = async (request, response) => {
  const {id} = request.params
  const note = await Note.findById(id)

  if (!note) {
    const payload = errorResponse('Note not found', [])
    return response.status(404).json(payload)
  }

  const payload = successResponse('Note fetched successfully', note)
  response.json(payload)
}

const updateNote = async (request, response) => {
  if (!request.body.title && !request.body.body) {
    const payload = errorResponse("Title or body must be present", [])
    return response.status(400).json(payload)
  }

  const {id} = request.params
  const note = await Note.findById(id)
  if (!note) {
    const payload = errorResponse('Note not found', [])
    return response.status(404).json(payload)
  }

  if (request.body.title) {
    note.title = request.body.title
  }

  if (request.body.body) {
    note.body = request.body.body
  }

  const updatedNote = await note.save()
  const payload = successResponse('Note updated successfully', updatedNote)
  response.json(payload)
}

const deleteNote = async (request, response) => {
  const {id} = request.params
  const deletedNote = await Note.findByIdAndDelete(id)

  if (!deletedNote) {
    const payload = errorResponse('Note Not Found', [])
    return response.status(404).json(payload)
  }
  
  const payload = successResponse("Note Deleted successfully", [])
  response.status(200).json(payload)

}

module.exports = {getAllNotes, createNote, retrieveNote, updateNote, deleteNote}