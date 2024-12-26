import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { signInSchema } from "../validator/signinSchema";

type SignInTypes = {
  email: string;
  password: string;
};

export function useSignin() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const login = async ({ email, password }: SignInTypes) => {
    const { success, error } = signInSchema.safeParse({
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
      const response = await axiosInstance.post("/signin", {
        email,
        password,
      });

      if (response.data) {
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

  return { isLoading, isError, error, success, login };
}
