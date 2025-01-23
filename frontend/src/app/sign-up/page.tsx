"use client";

import { useState, ChangeEvent, FormEvent } from "react";
// import bcryptjs from "bcryptjs-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

interface SignUp {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  isAdminUser: boolean;
}

const SignUp = () => {
  const [form, setForm] = useState<SignUp>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    isAdminUser: false,
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.confirmPassword !== form.password) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      // const hashedPassword = await bcryptjs.hash(form.password, 10);
      // const { confirmPassword, ...formData } = form;
      // const updatedFormData = { ...formData, password: hashedPassword };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/api/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "An unknown error occurred");
        return;
      }

      toast.success("Signup successful!");

      setForm({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        isAdminUser: false,
      });

      setTimeout(() => {
        router.push("/sign-in");
      }, 4000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-white">
      <Toaster position="top-center" />
      <Card className="w-[90%] sm:w-[420px] p-4 sm:p-8 shadow-lg bg-white rounded-lg">
        <CardHeader className="flex flex-col items-center">
          <Image src={logo} alt="Logo" width={140} height={120} />
          <CardTitle className="text-center text-[#1D506A] mt-4">
            Sign Up
          </CardTitle>
          <CardDescription className="text-sm text-center text-gray-600 mt-2"></CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter your Full Name"
              value={form.name}
              name="name"
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-[#1D506A] focus:outline-none rounded-md border border-[#1D506A]"
            />
            <Input
              type="email"
              placeholder="Enter your UserName"
              value={form.username}
              name="username"
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-[#1D506A] focus:outline-none rounded-md border border-[#1D506A]"
            />
            <Input
              type="password"
              placeholder="Enter your Password"
              value={form.password}
              name="password"
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-[#1D506A] focus:outline-none rounded-md border border-[#1D506A]"
            />
            <Input
              type="password"
              placeholder="Re-enter your Password"
              value={form.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              required
              className="focus:ring-2 focus:ring-[#1D506A] focus:outline-none rounded-md border border-[#1D506A]"
            />
            <Button
              className="w-full bg-[#1D506A] hover:bg-[#174054] text-white rounded-md shadow-md transition-all duration-300"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </form>
          <Separator className="my-4" />
          <div className="text-center">
            <p className="text-sm">Already have an account?</p>
            <Link
              href="/sign-in"
              className="text-[#1D506A] hover:underline text-sm"
            >
              Sign-in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
