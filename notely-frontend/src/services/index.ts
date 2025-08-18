import type { CreateNote, UpdateNote } from "@/interfaces"

const baseUrl = "/api/notes"

const fetchAllNotes = async () => {
  try {
    const response = await fetch(baseUrl)
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
    const response = await fetch(`${baseUrl}/${id}`)
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
    const response = await fetch(baseUrl, {
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
    const response = await fetch(`${baseUrl}/${id}`, {
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
    const successResponse = await response.json()
    return successResponse.data
  } catch(error) {
      throw(error)

  }
}

const deleteNote = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
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
