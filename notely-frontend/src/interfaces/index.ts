export interface NoteProps {
  id: String
  title: String
  body: String
  updatedAt: Date
  createdAt: Date
}

export interface LoaderProps {
  text: String
}

export interface CreateNote {
  title: String
  body: String
}

export interface UpdateNote {
  title?: String
  body?: String
}

export interface HeaderProps {
  onNoteCreated: () => void;
}