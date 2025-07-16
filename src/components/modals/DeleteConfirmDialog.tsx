import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  productName,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Are you sure?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mb-4">
          Do you really want to delete <span className="font-bold">{productName}</span>? This action cannot be undone.
        </p>
        <DialogFooter className="flex space-x-2 pt-2">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Yes, Delete
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
            variant="secondary"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
