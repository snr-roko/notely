import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { DeleteDialogProps } from "@/interfaces";

const DeleteConfirmDialog: React.FC<DeleteDialogProps> = ({ isOpen, setIsOpen, onConfirm, note}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete "{note.title}".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={(event) => {
            event.stopPropagation()
            setIsOpen(false)}
          }
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={(event) => {
              event.stopPropagation()
              setIsOpen(false)
              onConfirm(note.id)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmDialog