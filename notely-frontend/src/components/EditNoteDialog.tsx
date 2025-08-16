import React, { useState, useEffect, useRef } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogClose 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import noteService from '@/services/index'
import Loading from './Loading'
import type { EditNoteProps } from '@/interfaces'

// Simple edit dialog component - gets note data from parent and updates on change
const EditNoteDialog: React.FC<EditNoteProps> = ({ note, isOpen, setIsOpen, fetchAllNotes }) => {
  // Form state - just title and body
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false)
  const titleEditingTimeout = useRef<NodeJS.Timeout | null>(null)
  const bodyEditingTimeout = useRef<NodeJS.Timeout | null>(null)


  // When dialog opens, populate form with note data
  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setBody(note.body || '')
    }
  }, [])


  // Handle title input change  
  const handleTitleChange = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newTitle = event.target.value;
    setTitle(newTitle)

    if (titleEditingTimeout.current) {
      clearTimeout(titleEditingTimeout.current)
    }

    titleEditingTimeout.current = setTimeout( async () => {
      // Call update service with new title in 5 seconds
      setIsSaved(false)
      setIsSaving(true)
      await noteService.updateNote(id, { ...note, title: newTitle, body }).then(() => {
        setIsSaving(false)
        setIsSaved(true)
      }
    ).catch((error) => {
      console.log(error)
    })
    }, 5000)
  };

  // Handle body input change - call service immediately  
  const handleBodyChange = async (event: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
    const newBody = event.target.value;
    setBody(newBody)
    
    if (bodyEditingTimeout.current) {
      clearTimeout(bodyEditingTimeout.current)
    }

    bodyEditingTimeout.current = setTimeout(async () => {
      // Call update service with new body in 5 seconds
      setIsSaved(false)
      setIsSaving(true)
      
      await noteService.updateNote(id, { ...note, title, body: newBody }).then(
      () => {
        setIsSaving(false)
        setIsSaved(true)
      }
    ).catch((error) => {
      console.log(error)
    })
    }, 5000)
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='w-[90vw] max-w-md md:max-w-2xl p-4 md:p-8'>
        <DialogHeader className="space-y-3 md:space-y-4">
          <DialogTitle className="text-lg md:text-xl font-semibold">
            Edit Note
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base text-slate-600">
            Make changes to your note.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-4 md:space-y-6">
          {/* Title input */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm md:text-base font-medium text-slate-700">
              Title
            </label>
            <input 
              id="title" 
              value={title} 
              onChange={(event) => {
                handleTitleChange(event, note.id)
              }}
              className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base
                       border border-slate-200 rounded-lg
                       bg-slate-50 
                       focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 
                       placeholder:text-slate-400
                       transition-all duration-200 ease-in-out
                       outline-none"
              placeholder="Enter note title..."
              disabled={isSaving}
            />
          </div>
          
          {/* Body textarea */}
          <div className="space-y-2">
            <label htmlFor="body" className="block text-sm md:text-base font-medium text-slate-700">
              Body
            </label>
            <textarea 
              id="body" 
              value={body} 
              onChange={(event) => {
                handleBodyChange(event, note.id)
              }}
              className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base
                       border border-slate-200 rounded-lg
                       bg-slate-50 
                       focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 
                       placeholder:text-slate-400
                       transition-all duration-200 ease-in-out
                       outline-none resize-none"
              rows={6}
              placeholder="Write your note here..."
              disabled={isSaving}
            />
          </div>
        </div>
        
        {/* Simple close button */}
        <DialogFooter className='mt-6 flex justify-end'>
          <div className="flex items-center gap-2 text-sm text-slate-600 mr-4">
            {isSaved ? <p className='bg-emerald-300'>Saved</p> : <Loading text={"Saving..."}/>}
          </div>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setIsOpen(false)
                fetchAllNotes()
              }}
              variant={'outline'} 
              className='px-4 py-2 text-sm border-slate-200 hover:bg-slate-50'
            >
              Done
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteDialog;