import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import noteService from './services'
import type { NoteProps } from './interfaces'
import { Edit, Trash } from 'lucide-react'
import {Button} from '@/components/ui/button'
import Loading from './components/Loading'

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    setIsLoading(true)
    noteService.fetchAllNotes().then(notes => {
      setNotes(notes.data)
    }).catch(error => {
      console.log(error.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <Header />
      <div>
        {isLoading ? <Loading text={"Loading Notes"}/> :
          notes.map((note: NoteProps) => (
            <div key={note.id as React.Key} className="flex gap-3 p-5 border-2 border-emerald-50 m-2">
              <p className="flex-2/3">{note.title}</p>
              <Button variant="outline" size='icon'><Edit /></Button>
              <Button variant="outline" size='icon'><Trash /></Button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default App