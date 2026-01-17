"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgetPasswordPage() {
    const [formData, setFormData] = useState({
        email: "",

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <AuthLayout>
            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Forgot Password</h1>
                    <p className="text-muted-foreground">
                        Don’t worry, just give us your email. The one you registered with.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-foreground"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>



                    <Button type="submit" className="w-full h-11 text-base" size="lg">
                        Proceed
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/signup"
                        className="font-semibold text-foreground hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
