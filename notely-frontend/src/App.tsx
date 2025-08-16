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
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [idToDelete, setIdToDelete] = useState('')


  const fetchNotes = () => {
    setIsLoading(true)
    noteService.fetchAllNotes().then(notes => {
      console.log(notes)
      setNotes(notes)
    }).catch(error => {
      console.log(error.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleDeleteNote = (id: string) => {
    setIdToDelete(id)
    setIsLoadingDelete(true)
    noteService.deleteNote(id).then(() => {
      setIsLoadingDelete(false)
      setIdToDelete('')
      fetchNotes()
    }).catch(error => {
      console.log(error.message)
    })
  }

  useEffect( () => {
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header onNoteCreated={fetchNotes} />
  
      <div className="px-3 py-4 md:px-6 md:py-8 lg:px-8 lg:py-12">
        {isLoading ? (
          <Loading text={"Loading Notes"} />
        ) : notes.length === 0 ? (
          // Empty state 
          <div className="flex flex-col items-center justify-center py-16 md:py-24">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-medium text-slate-600 mb-2">No notes yet</h3>
            <p className="text-sm md:text-base text-slate-500 text-center max-w-sm">
              Create your first note to get started organizing your thoughts.
            </p>
        </div>
        ) : (
      // Notes grid 
      <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6">
        {notes.map((note: NoteProps) => (
          <div 
            key={note.id as React.Key} 
            className="group bg-white rounded-lg md:rounded-xl border border-slate-200/60 
                       hover:border-slate-300/80 hover:shadow-lg hover:shadow-slate-200/50
                       transition-all duration-300 ease-out
                       transform hover:-translate-y-1 md:hover:-translate-y-2
                       p-4 md:p-5 lg:p-6"
          >
            {/* Note content area */}
            <div className="flex md:flex-col gap-3 md:gap-4 items-start">
              {/* Title with proper truncation */}
              <div className="flex-1 md:flex-none min-w-0">
                <h3 className="font-medium text-slate-800 text-sm md:text-base lg:text-lg
                             line-clamp-1 md:line-clamp-2
                             group-hover:text-slate-900 transition-colors duration-200">
                  {note.title}
                </h3>
                
                {/* Body preview - hidden on mobile, visible on desktop */}
                {note.body && (
                  <p className="hidden md:block mt-2 text-xs lg:text-sm text-slate-600 
                               line-clamp-3 lg:line-clamp-4
                               group-hover:text-slate-700 transition-colors duration-200">
                    {note.body}
                  </p>
                )}
                
                {/* Timestamp */}
                <div className=" mt-3 lg:mt-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full 
                                 bg-emerald-50 text-emerald-700 text-xs font-medium">
                    {new Date(note.createdAt).toLocaleDateString()} - {new Date(note.createdAt).toLocaleTimeString()}
                  </span>
                  <span className='inline-flex items-center px-2 py-1 rounded-full 
                                 bg-red-50 text-red-600 text-xs font-medium"'>
                    {
                      isLoadingDelete && note.id.toString() === idToDelete ? (
                        <Loading text={"Deleting Note"} />
                      ) : (null)
                    }
                  </span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex md:flex-row gap-2 md:gap-3 md:mt-4 md:pt-4 md:border-t md:border-slate-100">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 md:h-9 md:w-9 p-0
                           text-slate-500 hover:text-emerald-600 hover:bg-emerald-50
                           transition-all duration-200 ease-in-out
                           group/edit relative overflow-hidden"
                >
                  <Edit className="h-3.5 w-3.5 md:h-4 md:w-4 
                                 transition-transform duration-200 
                                 group-hover/edit:scale-110" />
                  <span className="absolute inset-0 bg-emerald-100 rounded-md opacity-0 
                                 group-hover/edit:opacity-20 transition-opacity duration-200" />
                </Button>
                
                <Button 
                  onClick={() => handleDeleteNote(note.id.toString())}
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 md:h-9 md:w-9 p-0
                           text-slate-500 hover:text-red-600 hover:bg-red-50
                           transition-all duration-200 ease-in-out
                           group/delete relative overflow-hidden"
                >
                  <Trash className="h-3.5 w-3.5 md:h-4 md:w-4 
                                  transition-transform duration-200 
                                  group-hover/delete:scale-110" />
                  <span className="absolute inset-0 bg-red-100 rounded-md opacity-0 
                                 group-hover/delete:opacity-20 transition-opacity duration-200" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  )
}

export default App