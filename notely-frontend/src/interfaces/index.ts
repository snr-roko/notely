export interface NoteProps {
  id: string
  title: string
  body: string
  updatedAt: Date
  createdAt: Date
}

export interface LoaderProps {
  text: string
}

export interface CreateNote {
  title: string
  body: string
}

export interface UpdateNote {
  title?: string
  body?: string
}

export interface HeaderProps {
  onNoteCreated: () => void;
  setErrorMessage: (message: string | null) => void;
}

export interface EditNoteProps {
  note: NoteProps
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  fetchAllNotes: () => void
}

export interface ErrorProps {
  showing: boolean
  message: string | null
  onClose: () => void
}