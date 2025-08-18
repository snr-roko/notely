import type { LucideIcon } from 'lucide-react';


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
  setSuccessMessage: (message: string | null) => void;
}

export interface EditNoteProps {
  note: NoteProps
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  fetchAllNotes: () => void
}

export type NotificationType = 'error' | 'success';

export interface NotificationTypeConfig {
  bgColor: string;
  icon: LucideIcon;
  shadowColor: string;
}

export interface NotificationTypeProps {
  error: NotificationTypeConfig;
  success: NotificationTypeConfig;
}

export interface NotificationProps {
  showing: boolean;
  message: string | null;
  type?: NotificationType;
  onClose?: () => void;
}

export interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void
  onConfirm: (id: string) => void
  note: NoteProps
}