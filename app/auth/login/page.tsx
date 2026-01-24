"use client";

import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoginFormValues {
    email: string;
    password: string;
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const initialValues: LoginFormValues = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const handleSubmit = async (
        values: LoginFormValues,
        { setSubmitting }: FormikHelpers<LoginFormValues>
    ) => {
        console.log("=== FORM SUBMITTED (Formik) ===");
        console.log("Form values:", values);

        try {
            // Here you would typically make an API call
            // For now, just navigate to dashboard
            console.log("Validation passed, navigating to dashboard...");
            
            // Use window.location for reliable navigation
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                    <p className="text-muted-foreground">
                        Enter your details to log in
                    </p>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="space-y-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-foreground"
                                >
                                    Email
                                </label>
                                <Field name="email">
                                    {({ field }: any) => (
                                        <div>
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                className={cn(
                                                    errors.email && touched.email && "border-destructive"
                                                )}
                                            />
                                            {errors.email && touched.email && (
                                                <p className="text-sm text-destructive mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-sm text-muted-foreground hover:text-foreground hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <Field name="password">
                                    {({ field }: any) => (
                                        <div>
                                            <PasswordInput
                                                {...field}
                                                id="password"
                                                placeholder="Enter your password"
                                                className={cn(
                                                    errors.password && touched.password && "border-destructive"
                                                )}
                                            />
                                            {errors.password && touched.password && (
                                                <p className="text-sm text-destructive mt-1">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 text-base"
                                size="lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Log in"}
                            </Button>
                        </Form>
                    )}
                </Formik>

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
