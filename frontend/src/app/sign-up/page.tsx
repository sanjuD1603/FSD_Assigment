"use client";
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
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <Card className="w-[90%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Signup</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or services to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <form action="" className="space-y-3">
            <Input
              type="text"
              disabled={false}
              placeholder="Enter your Full Name"
              value={""}
              onChange={() => {}}
              required
            />
            <Input
              type="email"
              disabled={false}
              placeholder="Enter your Email"
              value={""}
              onChange={() => {}}
              required
            />
            <Input
              type="password"
              disabled={false}
              placeholder="Enter your Password"
              value={""}
              onChange={() => {}}
              required
            />
            <Input
              type="password"
              disabled={false}
              placeholder="Re-enter your Password"
              value={""}
              onChange={() => {}}
              required
            />
            <Button className="w-full" size="lg" disabled={false}>
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
                href="/sign-in"
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
