// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { useLogin } from "@/lib/queries/auth";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import Image from "next/image";

// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type LoginFormData = z.infer<typeof loginSchema>;

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const loginMutation = useLogin();
//   const [error, setError] = useState("");

//   const form = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   useEffect(() => {
//     // Check if already authenticated
//     const isAuthenticated =
//       sessionStorage.getItem("isAuthenticated") === "true";
//     if (isAuthenticated) {
//       router.push("/admin/leads");
//     }
//   }, [router]);

//   const handleSubmit = async (data: LoginFormData) => {
//     setError("");

//     try {
//       const response = await loginMutation.mutateAsync(data);
//       if (response.success) {
//         sessionStorage.setItem("isAuthenticated", "true");
//         router.push("/admin/leads");
//       }
//     } catch (error) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-md px-4"
//       >
//         <Card>
//           <CardHeader className="space-y-1 flex flex-col items-center">
//             <div className="mb-4 flex items-center justify-center">
//               <Image
//                 title="Nigaran-Logo"
//                 src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651201/logos_png-02_ykasmr.png"
//                 alt="Nigaran Solar Logo"
//                 width={240}
//                 height={240}
//               />
//             </div>
//             <CardTitle className="text-2xl">Admin Login</CardTitle>
//             <CardDescription>
//               Enter your credentials to access the admin panel
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(handleSubmit)}
//                 className="space-y-4"
//               >
//                 {error && (
//                   <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">
//                     {error}
//                   </div>
//                 )}

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="email"
//                           placeholder="admin@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="password"
//                           placeholder="••••••••"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={loginMutation.isPending}
//                 >
//                   {loginMutation.isPending ? "Logging in..." : "Login"}
//                 </Button>
//               </form>
//             </Form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/queries/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      router.push("/admin/leads");
    }
  }, [router]);

  const handleSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      const response = await loginMutation.mutateAsync(data);
      if (response.success) {
        sessionStorage.setItem("isAuthenticated", "true");
        router.push("/admin/leads");
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
          <CardHeader className="text-center space-y-4 pb-8 pt-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-2"
            >
              <div className="relative w-24 h-24">
                <Image
                  title="Nigaran-Logo"
                  src="https://res.cloudinary.com/dr9gcshs6/image/upload/v1763651201/logos_png-02_ykasmr.png"
                  alt="Nigaran Solar Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold text-gray-900">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-base">
                Secure access to your administration dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pb-10 px-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3"
                  >
                    <Shield className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-orange-500" />
                          <Input
                            type="email"
                            placeholder="admin@example.com"
                            {...field}
                            className="h-12 pl-12 pr-4 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-medium" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 transition-colors group-focus-within:text-orange-500" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="h-12 pl-12 pr-12 rounded-xl border-2 border-gray-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-medium" />
                    </FormItem>
                  )}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Access Dashboard
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center pt-6 mt-6 border-t border-gray-200"
            >
              <p className="text-xs text-gray-500">
                Protected administrative area • Authorized access only
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
