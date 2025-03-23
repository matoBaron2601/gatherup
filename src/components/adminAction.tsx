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
import {
  cancelEvent,
  confirmEvent,
  copyInvite,
  deleteEvent,
  reopenEvent,
} from "@/lib/server/actions/event";
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
import { createUUIDToken } from "@/lib/helpers";
import { Card, CardContent } from "./ui/card";

type AdminActionProps = {
  event: Event;
  variant: "card" | "dots";
};

export const AdminAction = ({ event, variant }: AdminActionProps) => {
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
        action: () => reopenEvent({ eventId: event.id }),
        loading: "Reopening event...",
        success: "Event reopened successfully",
        error: "Failed to reopen event",
      },
      confirm: {
        action: () =>
          confirmEvent({
            eventId: event.id,
            startDate: event.earliestPossibleDate,
            endDate: event.latestPossibleDate,
          }),

        loading: "Confirming event...",
        success: "Event confirmed successfully",
        error: "Failed to confirm event",
      },
      cancel: {
        action: () => cancelEvent({ eventId: event.id }),
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

  const handleCopyInvite = async () => {
    const onCopy = async () => {
      const token = createUUIDToken();
      await copyInvite({ eventId: event.id, token });
      const inviteUrl = `${window.location.origin}/event/${event.id}?token=${token}`;
      navigator.clipboard.writeText(inviteUrl);
    };
    toast.promise(onCopy(), {
      loading: "Copying invite...",
      success: "Invite copied successfully",
      error: "Failed to copy invite",
    });
  };

  if (variant === "dots") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-color5 border border-color4">
          
          <DropdownMenuItem onClick={handleCopyInvite} className="hover:bg-red-500">
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
  }

  if (variant === "card") {
    return (
          <div className="grid grid-cols-2 gap-4 md:flex md:gap-16 w-full px-12 py-4">
            <button
              onClick={handleCopyInvite}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Invite
            </button>
            {event.status !== "opened" && (
              <button
                onClick={() => setModalState({ isOpen: true, type: "reopen" })}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reopen
              </button>
            )}
            {event.status !== "cancelled" && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </button>
            )}
            {event.status !== "confirmed" && (
              <button
                onClick={() => setModalState({ isOpen: true, type: "confirm" })}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <Check className="mr-2 h-4 w-4" />
                Confirm
              </button>
            )}
            {event.status !== "cancelled" && (
              <button
                onClick={() => setModalState({ isOpen: true, type: "cancel" })}
                className="flex items-center text-orange-600 hover:text-orange-800"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </button>
            )}
            <button
              onClick={() => setModalState({ isOpen: true, type: "delete" })}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>

    );
  }
};
