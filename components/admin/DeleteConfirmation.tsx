// "use client";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// interface DeleteConfirmationProps {
//   onDelete: () => void;
//   title?: string;
//   description?: string;
//   triggerClassName?: string;
// }

// export function DeleteConfirmation({
//   onDelete,
//   title = "Are you sure?",
//   description = "This action cannot be undone. This will permanently delete this item.",
//   triggerClassName,
// }: DeleteConfirmationProps) {
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button className={triggerClassName}>
//           <Trash2 className="h-4 w-4 text-red-500" />
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{title}</AlertDialogTitle>
//           <AlertDialogDescription>{description}</AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={onDelete}
//             className="bg-red-600 hover:bg-red-700"
//           >
//             Delete
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
"use client";

import { ReactNode } from "react";
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
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
  onDelete: () => void;
  title?: string;
  description?: string;
  triggerClassName?: string;
  trigger?: ReactNode;
}

export function DeleteConfirmation({
  onDelete,
  title = "Are you sure?",
  description = "This action cannot be undone. This will permanently delete this item.",
  triggerClassName,
  trigger,
}: DeleteConfirmationProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 w-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 transition-all duration-200 ${triggerClassName}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="border-0 shadow-2xl rounded-2xl max-w-md mx-4">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <AlertDialogHeader className="text-center space-y-3">
          <AlertDialogTitle className="text-xl font-bold text-gray-900">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
          <AlertDialogCancel className="flex-1 h-12 rounded-xl border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
