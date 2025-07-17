import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: LogoutConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Are you sure you want to logout?
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mb-4">
          You will need to login again to access your account.
        </p>
        <DialogFooter className="flex space-x-2 pt-2">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
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

export default LogoutConfirmDialog;
