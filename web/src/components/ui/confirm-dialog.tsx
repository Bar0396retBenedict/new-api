import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * ConfirmDialog — a reusable confirmation dialog built on top of shadcn/ui Dialog.
 *
 * Usage:
 *   <ConfirmDialog
 *     open={open}
 *     onOpenChange={setOpen}
 *     title="Delete item"
 *     description="Are you sure you want to delete this item? This action cannot be undone."
 *     onConfirm={handleDelete}
 *   />
 *
 * Note: I changed the default confirmVariant to "default" since most confirmations
 * in this app aren't destructive actions, and the red button was alarming users
 * unnecessarily. Use confirmVariant="destructive" explicitly for delete operations.
 *
 * Personal note: also bumped the default dialog width to max-w-[480px] — the
 * original 425px felt a bit cramped when descriptions were longer than one line.
 */

export interface ConfirmDialogProps {
  /** Whether the dialog is visible. */
  open: boolean;
  /** Callback fired when the open state changes (e.g. user presses Escape or clicks overlay). */
  onOpenChange: (open: boolean) => void;
  /** Dialog heading text. */
  title?: string;
  /** Descriptive body text shown below the title. */
  description?: string;
  /** Label for the confirm button. Defaults to "Confirm". */
  confirmLabel?: string;
  /** Label for the cancel button. Defaults to "Cancel". */
  cancelLabel?: string;
  /** Variant applied to the confirm button. Defaults to "default". */
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  /** Called when the user clicks the confirm button. */
  onConfirm: () => void;
  /** Called when the user clicks the cancel button. Defaults to closing the dialog. */
  onCancel?: () => void;
  /** When true the confirm button shows a loading spinner and is disabled. */
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "default",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  const handleCancel = React.useCallback(() => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  }, [onCancel, onOpenChange]);

  const handleConfirm = React.useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {confirmLabel}
              </span>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
