import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  initialCommit?: string;
  onSave: (commit: string) => void;
}

const EditDialog = ({ open, onClose, initialCommit = "", onSave }: EditDialogProps) => {
  const [commit, setCommit] = useState(initialCommit);

  useEffect(() => {
    if (open) {
      setCommit(initialCommit);
    }
  }, [open, initialCommit]);

  const handleSave = () => {
    onSave(commit.trim());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg p-6 w-full max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800 mb-4">
            Edit Commit
          </DialogTitle>
        </DialogHeader>
        <div>
          <label className="block mb-2 font-medium text-gray-700">Commit</label>
          <input
            type="text"
            value={commit}
            onChange={(e) => setCommit(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
          />
        </div>
        <DialogFooter className="mt-6 flex space-x-3">
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#4ade80] hover:bg-[#16a34a] text-white"
            disabled={commit.trim() === ""}
          >
            Save
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
            variant="secondary"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
