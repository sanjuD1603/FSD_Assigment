"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import bcryptjs from "bcryptjs-react";
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
import { FcGoogle } from "react-icons/fc";

import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface SignUp {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [form, setForm] = useState<SignUp>({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
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
      const hashedPassword = await bcryptjs.hash(form.password, 10);
      const { confirmPassword, ...formData } = form;
      const updatedFormData = { ...formData, password: hashedPassword };

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

      const data = await response.json();
      toast.success("Signup successful!");

      setForm({ name: "", username: "", password: "", confirmPassword: "" });

      setTimeout(() => {
        router.push("/signin", data);
      }, 4000);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-white">
      <Toaster position="top-center" /> 
      <Card className="w-[90%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or services to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <form action="" className="space-y-3" onSubmit={handleSubmit}>
            <Input
              type="text"
              disabled={false}
              placeholder="Enter your Full Name"
              value={form.name}
              name="name"
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              disabled={false}
              placeholder="Enter your UserName"
              value={form.username}
              name="username"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              disabled={false}
              value={form.password}
              placeholder="Enter your Password"
              name="password"
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              disabled={false}
              value={form.confirmPassword}
              placeholder="Re-enter your Password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
            <Button className="w-full" size="lg" disabled={false} type="submit">
              Submit
            </Button>
          </form>
          <Separator className="my-4" />
          <div className="flex flex-col items-center space-y-2">
            <Button
              disabled={false}
              onClick={() => {}}
              variant="outline"
              size="lg"
              className="bg-slate-300 hover:bg-slate-400 hover:scale-110 flex items-center"
            >
              <FcGoogle className="mr-2" />
              Sign up with Google
            </Button>
            <div className="text-center mt-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?
              </p>
              <Link
                href="/signin"
                className="text-sky-700 hover:underline cursor-pointer text-sm"
              >
                Sign-in
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
