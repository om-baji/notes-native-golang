import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { signUpSchema } from "../validator/signupSchema";

type SignUpTypes = {
  email: string;
  password: string;
  name: string;
};

export function useSignup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const register = async ({ name, email, password }: SignUpTypes) => {
    const { success, error } = signUpSchema.safeParse({
      name,
      email,
      password,
    });
    if (!success) {
      setIsError(true);
      setError(error.errors[0].message);
    }
    setIsLoading(true);
    setIsError(false);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        setIsError(true);
        setError(response.data.message || "An error occurred during signup.");
      }
    } catch (error) {
      setIsError(true);
      setError((error as any)?.message || "Network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, error, success, register };
}
