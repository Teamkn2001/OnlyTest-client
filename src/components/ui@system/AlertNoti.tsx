import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle } from "lucide-react";

interface AlertNotiProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

function AlertNoti({
  isOpen,
  onClose,
  status,
  title,
  description,
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
}: AlertNotiProps) {
  const isSuccess = status === "success";

  const defaultTitle = isSuccess ? "ดำเนินการสำเร็จ" : "เกิดข้อผิดพลาด";
  const defaultDescription = isSuccess
    ? "การดำเนินการเสร็จสมบูรณ์"
    : "เกิดข้อผิดพลาดในการดำเนินการ กรุณาลองใหม่อีกครั้ง";

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <AlertDialogTitle>{title || defaultTitle}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelLabel && <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertNoti;
