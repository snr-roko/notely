const Note = require('../models/note')
const {successResponse, errorResponse} = require('../utils/responses')

const getAllNotes = async (request, response) => {
  const notes = await Note.find({})
  const payload = successResponse('Notes fetched successfully', notes)
  response.json(payload)
}

const createNote = async (request, response) => {
  if (!request.body.title || !request.body.body) {
    const payload = errorResponse('Title and body are required', [])
    return response.status(400).json(payload)
  }
  const {title, body} = request.body

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

module.exports = {getAllNotes, createNote, retrieveNote}