const Note = require('../models/note')
const {successResponse, errorResponse} = require('../utils/responses')

const getAllNotes = async (request, response) => {
  const notes = await Note.find({})
  const payload = successResponse('Notes fetched successfully', notes)
  response.json(payload)
}

const createNote = async (request, response) => {
  const {title, body} = request.body

  const note = new Note({
    title: title,
    body: body
  })

  const newNote = await note.save()
  const payload = successResponse('Note created successfully', newNote)

  response.status(201).json(payload)

}

module.exports = {getAllNotes, createNote}