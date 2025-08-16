import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogTitle, DialogTrigger , DialogHeader, DialogFooter } from '@/components/ui/dialog'
import noteService from '@/services/index'
import type { NoteProps, HeaderProps } from '@/interfaces'
import { Loader2Icon } from 'lucide-react'

const Header: React.FC<HeaderProps> = ({ onNoteCreated }) => {

  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    noteService.createNote({title, body}).then(() => {
      setTitle('')
      setBody('')
      setOpen(false)
      onNoteCreated()
    }).catch(error => {
      console.log(error.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }


  return (
    <header className='p-5 flex justify-between items-center bg-emerald-50'>
      <h1 className='text-3xl md:text-4xl font-semi-bold text-primary md:flex-2/3 md:text-center'>Notely</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className='bg-emerald-400 hover:bg-emerald-500 text-white hover:cursor-pointer'>
            New
          </Button>
        </DialogTrigger>
          <DialogContent className='w-[90vw] max-w-md md:max-w-2xl p-4 md:p-8 lg:p-10'>
            <form onSubmit={handleSubmit}>
              <DialogHeader className="space-y-3 md:space-y-4">
                <DialogTitle className="text-lg md:text-xl lg:text-2xl font-semibold">
                  New Note
                </DialogTitle>
                <DialogDescription className="text-sm md:text-base text-slate-600">
                  Add a new note. Click Add Note when you're done.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-6 md:mt-8 lg:mt-10 space-y-4 md:space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm md:text-base font-medium text-slate-700">
                    Title
                  </label>
                  <input 
                    required 
                    id="title" 
                    value={title} 
                    onChange={handleTitleChange} 
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base
                              border border-slate-200 rounded-lg
                              bg-slate-50 
                              focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 
                              placeholder:text-slate-400
                              transition-all duration-200 ease-in-out
                              outline-none"
                    placeholder="Enter note title..."
                  />
                </div>
                
                {/* Body Field */}
                <div className="space-y-2">
                  <label htmlFor="body" className="block text-sm md:text-base font-medium text-slate-700">
                    Body
                  </label>
                  <textarea 
                    required 
                    id="body" 
                    value={body} 
                    onChange={handleBodyChange} 
                    className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base
                              border border-slate-200 rounded-lg
                              bg-slate-50 
                              focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 
                              placeholder:text-slate-400
                              transition-all duration-200 ease-in-out
                              outline-none resize-none"
                    rows={4}
                    placeholder="Write your note here..."
                  />
                </div>
              </div>
              
              {/* Buttons */}
              <DialogFooter className='mt-6 md:mt-8 lg:mt-10 flex flex-col-reverse sm:flex-row justify-center sm:justify-end gap-2 sm:gap-3'>
                <DialogClose asChild>
                  <Button 
                    type="button"
                    variant={'outline'} 
                    className='px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base
                              border-slate-200 hover:bg-slate-50 hover:border-slate-300
                              transition-colors duration-200'>
                    Cancel
                  </Button>
                </DialogClose>
                
                <Button 
                  type='submit' 
                  className='px-4 py-2 md:px-6 md:py-2.5 text-sm md:text-base
                            bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
                            text-white font-medium
                            shadow-sm hover:shadow-md
                            transition-all duration-200 ease-in-out
                            disabled:opacity-50 disabled:cursor-not-allowed' 
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    'Add Note'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
