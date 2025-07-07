import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { useForm, type UseFormReturn } from "react-hook-form";
import * as Select from "@/components/ui/select";
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

// AlertNoti Component
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

const AlertNoti: React.FC<AlertNotiProps> = ({
  isOpen,
  onClose,
  status,
  title,
  description,
  confirmLabel = "OK",
  cancelLabel,
  onConfirm,
}) => {
  const isSuccess = status === "success";

  const defaultTitle = isSuccess ? "ดำเนินการสำเร็จ" : "เกิดข้อผิดพลาด";
  const defaultDescription = isSuccess
    ? "การดำเนินการเสร็จสมบูรณ์"
    : "เกิดข้อผิดพลาดในการดำเนินการ กรุณาลองใหม่อีกครั้ง";

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            )}
            <AlertDialogTitle className="text-left">
              {title || defaultTitle}
            </AlertDialogTitle>
          </div>
          {(description || defaultDescription) && (
            <AlertDialogDescription className="text-left mt-2">
              {description || defaultDescription}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          {cancelLabel && (
            <AlertDialogCancel onClick={onClose}>
              {cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={handleConfirm}
            className={`${
              isSuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Simple Option type
interface Option {
  id: number;
  name: string;
}

// Simple FormSelect Props
interface FormSelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: Option[];
  form: UseFormReturn<any>;
}

// Simple FormSelect Component
const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  placeholder,
  options,
  form,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-orange-500 font-bold">{label}</Label>

      <Select.Select
        value={form.watch(name) || ""}
        onValueChange={(value) => form.setValue(name, value)}
      >
        <Select.SelectTrigger className="w-full border-2 border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
          <Select.SelectValue placeholder={placeholder} />
        </Select.SelectTrigger>
        <Select.SelectContent>
          {options.map((option) => (
            <Select.SelectItem key={option.id} value={option.id.toString()}>
              {option.name}
            </Select.SelectItem>
          ))}
        </Select.SelectContent>
      </Select.Select>

      {form.formState.errors[name] && (
        <span className="text-red-500 text-sm">กรุณาเลือก{label}</span>
      )}
    </div>
  );
};

// Simple Demo with AlertNoti
export default function Simple2 () {
  // Alert state
  const [alert, setAlert] = useState({
    isOpen: false,
    status: "success" as "success" | "error",
    title: "",
    description: "",
  });

  // Simple useForm
  const form = useForm({
    defaultValues: {
      stone_id: "",
      category_id: "",
      size_id: "",
    },
  });

  // Alert helpers
  const showAlert = (
    status: "success" | "error",
    title?: string,
    description?: string
  ) => {
    setAlert({
      isOpen: true,
      status,
      title: title || "",
      description: description || "",
    });
  };

  const closeAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = (data: any) => {
    console.log("Selected values:", data);
    
    // Check if all fields are selected
    if (!data.stone_id || !data.category_id || !data.size_id) {
      showAlert(
        "error",
        "ข้อมูลไม่ครบถ้วน",
        "กรุณาเลือกข้อมูลให้ครบทุกช่อง"
      );
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Random success/error for demo
      const isSuccess = Math.random() > 0.3; // 70% success rate
      
      if (isSuccess) {
        showAlert(
          "success",
          "บันทึกสำเร็จ!",
          `บันทึกข้อมูลแร่เรียบร้อยแล้ว`
        );
        // Reset form on success
        form.reset();
      } else {
        showAlert(
          "error",
          "เกิดข้อผิดพลาด",
          "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง"
        );
      }
    }, 1000); // Simulate loading time
  };

  const clearAll = () => {
    form.reset();
    showAlert(
      "success",
      "ล้างข้อมูลแล้ว",
      "ฟอร์มถูกล้างเรียบร้อยแล้ว"
    );
  };

  const stones = [
    { id: 1, name: "หินอ่อน" },
    { id: 2, name: "หินแกรนิต" },
    { id: 3, name: "หินทราย" },
    { id: 4, name: "หินควอตซ์" },
  ];

  const categories = [
    { id: 1, name: "หินก่อสร้าง" },
    { id: 2, name: "หินตกแต่ง" },
    { id: 3, name: "หินอุตสาหกรรม" },
  ];

  const sizes = [
    { id: 1, name: "เล็ก (0-5 ซม.)" },
    { id: 2, name: "กลาง (5-15 ซม.)" },
    { id: 3, name: "ใหญ่ (15+ ซม.)" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        FormSelect Demo with AlertNoti
      </h1>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Stone Select */}
        <FormSelect
          label="ชื่อแร่"
          name="stone_id"
          placeholder="เลือกชื่อแร่"
          options={stones}
          form={form}
        />

        {/* Category Select */}
        <FormSelect
          label="หมวดหมู่"
          name="category_id"
          placeholder="เลือกหมวดหมู่"
          options={categories}
          form={form}
        />

        {/* Size Select */}
        <FormSelect
          label="ขนาด"
          name="size_id"
          placeholder="เลือกขนาด"
          options={sizes}
          form={form}
        />

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>

      {/* Show Current Values */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">Current Values:</h3>
        <div className="space-y-1 text-sm">
          <div>
            Stone ID:{" "}
            <span className="font-mono">
              {form.watch("stone_id") || "none"}
            </span>
          </div>
          <div>
            Category ID:{" "}
            <span className="font-mono">
              {form.watch("category_id") || "none"}
            </span>
          </div>
          <div>
            Size ID:{" "}
            <span className="font-mono">{form.watch("size_id") || "none"}</span>
          </div>
        </div>
      </div>

      {/* Show Selected Names */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-2">Selected Names:</h3>
        <div className="space-y-1 text-sm">
          <div>
            Stone:{" "}
            <span className="text-blue-600">
              {stones.find((s) => s.id.toString() === form.watch("stone_id"))
                ?.name || "none"}
            </span>
          </div>
          <div>
            Category:{" "}
            <span className="text-blue-600">
              {categories.find(
                (c) => c.id.toString() === form.watch("category_id")
              )?.name || "none"}
            </span>
          </div>
          <div>
            Size:{" "}
            <span className="text-blue-600">
              {sizes.find((s) => s.id.toString() === form.watch("size_id"))
                ?.name || "none"}
            </span>
          </div>
        </div>
      </div>

      {/* 🎯 AlertNoti Component */}
      <AlertNoti
        isOpen={alert.isOpen}
        onClose={closeAlert}
        status={alert.status}
        title={alert.title}
        description={alert.description}
        confirmLabel="ตกลง"
      />
    </div>
  );
};

;