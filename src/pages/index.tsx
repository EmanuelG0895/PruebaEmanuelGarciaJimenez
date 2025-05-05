"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

interface FormData {
  username: string;
  password: string;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const password = data.password;
    const username = data.username;
    console.log(data);
    if (password === "password@2" && username === "Test123") {
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      router.push("/home");
    } else {
      setError("Por favor valide sus credenciales y renitente");
    }
  };

  const handleInputChange = (field: keyof FormData) => {
    setError(""); // Clear global error
    clearErrors(field); // Clear specific field error
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('/portal.png')",
      }}
    >
      <Head>
        <title>Login - Rick and Morty App</title>
        <meta
          name="description"
          content="Login to Rick and Morty character viewer"
        />
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-transparent py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Por favor agregue un nombre de usuario",
                  })}
                  onChange={() => handleInputChange("username")}
                  className={`appearance-none block w-full px-3 py-2 border text-black ${
                    errors.username
                      ? "border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-md shadow-sm placeholder-gray-400  sm:text-sm`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Por favor agregue una contraseña",
                  })}
                  onChange={() => handleInputChange("password")}
                  className={`appearance-none block w-full px-3 py-2 border text-black ${
                    errors.password
                      ? "border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  } rounded-md shadow-sm placeholder-gray-400  sm:text-sm`}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
          {error && (
            <div className="bg-red-300 font-bold text-xs text-red-900 p-2 rounded-lg mt-2.5">
              {error}
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-black font-bold">
                  <p>Use credentials</p>
                  <p>Username: Test123</p>
                  <p> Password: password@2</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
