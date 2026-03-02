// components/home/DeletePlanButton.tsx
"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deletePlanAction } from "@/components/home/actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeletePlanButton({
  planId,
  product,
  planName,
}: {
  planId: string;
  product: string;
  planName: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          aria-label="Delete plan"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border bg-white/80 text-zinc-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
          onClick={(e) => {
            // Do NOT preventDefault or the dialog won't open
            e.stopPropagation();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent
        onClick={(e) => {
          // Prevent Link navigation if user clicks inside dialog while Link wrapper exists
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this plan?</AlertDialogTitle>
          <AlertDialogDescription>
            You’re about to permanently delete{" "}
            <span className="font-medium text-zinc-900">
              {product} — {planName}
            </span>
            . This will remove all phases and steps and can’t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            className="bg-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              startTransition(async () => {
                await deletePlanAction(planId);
              });
            }}
          >
            {pending ? "Deleting…" : "Delete plan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
