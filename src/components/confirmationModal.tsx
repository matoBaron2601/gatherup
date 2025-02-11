import type React from "react";
import { Modal } from "./ui/modal";
import { Button } from "@/components/ui/button";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmVariant?: "default" | "destructive";
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmVariant = "default",
}: ConfirmationModalProps) => {
  return (
    <div onClick={onClose}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        footer={
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant={confirmVariant} onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        }
      >
        <p>{message}</p>
      </Modal>
    </div>
  );
};
