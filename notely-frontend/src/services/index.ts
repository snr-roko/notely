import type { CreateNote, UpdateNote } from "@/interfaces"

const baseUrl = "http://localhost:8080"

const controller = new AbortController()
setTimeout(() => controller.abort(), 20000)

const fetchAllNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/notes`, {signal: controller.signal})
    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.message)
    }
    const sucessResponse = await response.json()
    return sucessResponse.data
  } catch(error) {
      throw(error)
  }
}

const fetchNoteById = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/notes/${id}`)
    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.message)
    }
    const sucessResponse = await response.json()
    return sucessResponse.data
  } catch(error) {
      throw(error)
  }
}

const createNote = async (note: CreateNote) => {
  try {
    const response = await fetch(`${baseUrl}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.message)
    }
    const sucessResponse = await response.json()
    return sucessResponse
  } catch(error) {
      throw(error)

  }
}

const updateNote = async (id: string, note: UpdateNote) => {
  try {
    const response = await fetch(`${baseUrl}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.message)
    }
  } catch(error) {
      throw(error)

  }
}

const deleteNote = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/notes/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.message)
    }

    return response.json()
  } catch(error) {
      throw(error)
  }
}



export default {fetchAllNotes, fetchNoteById, createNote, updateNote, deleteNote}
