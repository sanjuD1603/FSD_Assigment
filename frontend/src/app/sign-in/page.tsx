"use client";

import bcryptjs from "bcryptjs-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

interface SignIn {
  username: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState<SignIn>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const hashedPassword = await bcryptjs.hash(form.password, 10);

      const { password, ...formData } = form;
      const updatedFormData = { ...formData, password: hashedPassword };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_END_POINT}/api/users/signin`,
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
        toast.error(errorData.error || "Sign-in failed. Please try again.");
        return;
      }

      const data = await response.json();
      toast.success("Sign-in successful!");
      router.push("/");
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-white">
      <Toaster position="top-center" />
      <Card className="w-[90%] sm:w-[420px] p-4 sm:p-8 shadow-lg bg-white rounded-lg">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>
            <Image src={logo} alt="Logo" width={140} height={120} />
          </CardTitle>
          <CardDescription className="text-sm text-center mt-4"></CardDescription>
        </CardHeader>

        <CardContent className="px-2 sm:px-6">
          <form action="" className="space-y-3" onSubmit={handleSubmit}>
            <Input
              type="email"
              className="focus:ring-2 focus:ring-[#1D506A] focus:outline-none rounded-md border border-[#1D506A]"
              placeholder="Enter your UserName"
              value={form.username}
              name="username"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              className="focus:ring-2 focus:ring-[#1D506A] focus:outline-none rounded-md border border-[#1D506A]"
              name="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              className="w-full bg-[#1D506A] hover:bg-[#174054] text-white rounded-md shadow-md transition-all duration-300"
              size="lg"
              disabled={false}
              type="submit"
            >
              Submit
            </Button>
          </form>
          <Separator className="my-4" />
          <div className="text-center mt-2">
            <p className="text-sm">
              Create a New Account?
            </p>
            <Link
              href="/sign-up"
              className="text-[#1D506A] hover:underline cursor-pointer text-sm"
            >
              Sign-up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
