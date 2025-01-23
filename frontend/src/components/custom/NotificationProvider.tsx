"use client";

import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const NotificationProvider = () => {
  return <Toaster position="top-right" richColors />;
};

export const notify = (
  message: string,
  type: "success" | "error" | "info" = "info"
) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
};
