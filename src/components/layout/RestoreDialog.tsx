"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export function RestoreDialog({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restore this version?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Your current changes will be replaced. This action cannot be undone.
        </p>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button onClick={onConfirm} variant="destructive">
            Restore
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
