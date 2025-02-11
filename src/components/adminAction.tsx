"use client";

import { toast } from "sonner";
import { useState } from "react";
import {
  Copy,
  Check,
  X,
  RefreshCw,
  Edit,
  Trash2,
  Ellipsis,
} from "lucide-react";
import { deleteEvent, setEventStatus } from "@/lib/server/actions/event";
import type { Event } from "@/types/event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationModal } from "./confirmationModal";

export const AdminAction = ({ event }: { event: Event }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "reopen" | "confirm" | "cancel" | "delete" | null;
  }>({ isOpen: false, type: null });

  const closeModal = () => setModalState({ isOpen: false, type: null });

  const handleAction = async (
    action: "reopen" | "confirm" | "cancel" | "delete"
  ) => {
    const actionConfig = {
      reopen: {
        action: () => setEventStatus({ eventId: event.id, status: "opened" }),
        loading: "Reopening event...",
        success: "Event reopened successfully",
        error: "Failed to reopen event",
      },
      confirm: {
        action: () =>
          setEventStatus({ eventId: event.id, status: "confirmed" }),
        loading: "Confirming event...",
        success: "Event confirmed successfully",
        error: "Failed to confirm event",
      },
      cancel: {
        action: () =>
          setEventStatus({ eventId: event.id, status: "cancelled" }),
        loading: "Cancelling event...",
        success: "Event cancelled successfully",
        error: "Failed to cancel event",
      },
      delete: {
        action: () => deleteEvent({ eventId: event.id }),
        loading: "Deleting event...",
        success: "Event deleted successfully",
        error: "Failed to delete event",
      },
    };

    const {
      action: performAction,
      loading,
      success,
      error,
    } = actionConfig[action];

    toast.promise(performAction().finally(closeModal), {
      loading,
      success,
      error,
    });
  };

  const modalConfig = {
    reopen: {
      title: "Reopen Event",
      message: "Are you sure you want to set the state of the event to opened?",
      confirmText: "Reopen",
    },
    confirm: {
      title: "Confirm Event",
      message:
        "Are you sure you want to set the state of the event to confirmed?",
      confirmText: "Confirm",
    },
    cancel: {
      title: "Cancel Event",
      message:
        "Are you sure you want to set the state of the event to cancelled?",
      confirmText: "Cancel",
    },
    delete: {
      title: "Delete Event",
      message: "Are you sure you want to delete this event?",
      confirmText: "Delete",
      confirmVariant: "destructive" as const,
    },
  };

  if (modalState.isOpen && modalState.type) {
    return (
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={() => handleAction(modalState.type!)}
        {...modalConfig[modalState.type]}
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Event Management</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy Invite
        </DropdownMenuItem>

        {event.status !== "opened" && (
          <DropdownMenuItem
            className="text-blue-700 hover:!text-blue-800"
            onClick={() => setModalState({ isOpen: true, type: "reopen" })}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reopen
          </DropdownMenuItem>
        )}
        {event.status !== "cancelled" && (
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {event.status !== "confirmed" && (
          <DropdownMenuItem
            className="text-green-700 hover:!text-green-800"
            onClick={() => setModalState({ isOpen: true, type: "confirm" })}
          >
            <Check className="mr-2 h-4 w-4" />
            Confirm
          </DropdownMenuItem>
        )}
        {event.status !== "cancelled" && (
          <DropdownMenuItem
            className="text-orange-700 hover:!text-orange-800"
            onClick={() => setModalState({ isOpen: true, type: "cancel" })}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="text-red-700 hover:!text-red-800"
          onClick={() => setModalState({ isOpen: true, type: "delete" })}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
