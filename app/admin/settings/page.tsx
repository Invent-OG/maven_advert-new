// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { useChangePassword, useCurrentUser } from "@/lib/queries/auth";
// import AdminHeader from "@/components/admin/AdminHeader";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const passwordSchema = z
//   .object({
//     currentPassword: z
//       .string()
//       .min(6, "Password must be at least 6 characters"),
//     newPassword: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z
//       .string()
//       .min(6, "Password must be at least 6 characters"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type PasswordFormData = z.infer<typeof passwordSchema>;

// export default function SettingsPage() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { data: currentUser } = useCurrentUser();
//   const changePasswordMutation = useChangePassword(currentUser?.id || "");

//   const form = useForm<PasswordFormData>({
//     resolver: zodResolver(passwordSchema),
//     defaultValues: {
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   const onSubmit = async (data: PasswordFormData) => {
//     if (!currentUser?.id) {
//       toast.error("User information not found");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await changePasswordMutation.mutateAsync({
//         currentPassword: data.currentPassword,
//         newPassword: data.newPassword,
//       });

//       toast.success("Password updated successfully");
//       form.reset();
//     } catch (error: unknown) {
//       toast.error("Failed to update password");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <AdminHeader title="Settings" />

//       <Tabs defaultValue="password" className="w-full">
//         <TabsList className="mb-6">
//           <TabsTrigger value="password">Change Password</TabsTrigger>
//           <TabsTrigger value="profile">Profile</TabsTrigger>
//         </TabsList>

//         <TabsContent value="password">
//           <div className="max-w-md mx-auto">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Change Password</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Form {...form}>
//                   <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-6"
//                   >
//                     <FormField
//                       control={form.control}
//                       name="currentPassword"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Current Password</FormLabel>
//                           <FormControl>
//                             <Input type="password" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="newPassword"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>New Password</FormLabel>
//                           <FormControl>
//                             <Input type="password" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="confirmPassword"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Confirm New Password</FormLabel>
//                           <FormControl>
//                             <Input type="password" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <Button
//                       type="submit"
//                       className="w-full"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Updating..." : "Update Password"}
//                     </Button>
//                   </form>
//                 </Form>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="profile">
//           <div className="max-w-md mx-auto">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Profile Information</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm font-medium mb-1">Name</p>
//                     <p className="text-lg">{currentUser?.name || "Admin"}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium mb-1">Email</p>
//                     <p className="text-lg">
//                       {currentUser?.email || "admin@example.com"}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium mb-1">Role</p>
//                     <p className="text-lg capitalize">
//                       {currentUser?.role || "admin"}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useChangePassword, useCurrentUser } from "@/lib/queries/auth";
import AdminHeader from "@/components/admin/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, Key, Mail, Badge } from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: currentUser } = useCurrentUser();
  const changePasswordMutation = useChangePassword(currentUser?.id || "");

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    if (!currentUser?.id) {
      toast.error("User information not found");
      return;
    }

    setIsSubmitting(true);
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully");
      form.reset();
    } catch (error: unknown) {
      toast.error("Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader title="Settings" />

      <Tabs defaultValue="password" className="w-full">
        <TabsList className="mb-6 bg-gray-100/80 p-1 rounded-2xl w-full max-w-md mx-auto">
          <TabsTrigger
            value="password"
            className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 flex-1"
          >
            <Key className="h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-gray-200 flex-1"
          >
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Change Password
                    </CardTitle>
                    <p className="text-gray-600 mt-1">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-900">
                              Current Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="h-12 rounded-xl border-gray-300 bg-gray-50/50 focus:bg-white transition-colors duration-200"
                                placeholder="Enter your current password"
                              />
                            </FormControl>
                            <FormMessage className="text-red-600 text-sm" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-900">
                              New Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="h-12 rounded-xl border-gray-300 bg-gray-50/50 focus:bg-white transition-colors duration-200"
                                placeholder="Enter your new password"
                              />
                            </FormControl>
                            <FormMessage className="text-red-600 text-sm" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-gray-900">
                              Confirm New Password
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                {...field}
                                className="h-12 rounded-xl border-gray-300 bg-gray-50/50 focus:bg-white transition-colors duration-200"
                                placeholder="Confirm your new password"
                              />
                            </FormControl>
                            <FormMessage className="text-red-600 text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating Password...
                        </div>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="max-w-4xl mx-auto space-y-8">
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                          Settings
                        </h1>
                        <p className="text-gray-500 mt-1">
                          Manage your account settings and preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {currentUser?.name?.charAt(0).toUpperCase() || "A"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Welcome back
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {currentUser?.name || "Admin"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Full Name
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {currentUser?.name || "Admin"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Email Address
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {currentUser?.email || "admin@example.com"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Badge className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          Role
                        </p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">
                          {currentUser?.role || "admin"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
