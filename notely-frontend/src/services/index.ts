const baseUrl = "http://localhost:8080"

const fetchAllNotes = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/notes`)
    console.log(response.status)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message)
    }
    const data = await response.json()
    console.log(data)
    return data
  } catch(error) {
      throw(error)
  }
}

export default {fetchAllNotes}
