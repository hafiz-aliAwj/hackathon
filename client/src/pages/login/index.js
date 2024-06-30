import Popup from "@/Components/Popup";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Login() {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values.username);
  };
  const formValidation = () => {
    const { username, password } = values;
    return true;
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("Login successful!");
          router.push("/");
          const data = await response.json();
          if (data.status === true) {
            localStorage.setItem("user", JSON.stringify(data.user))
            sessionStorage.setItem("user", data.token)
          }
        } else {
          const errorResponse = await response.json();
          setMessage(errorResponse.error || "Failed to Login");
        }
      } catch (error) {
        console.error("An error occurred during login", error);
      }
    }
  };
  const handleCloseError = () => {
    setMessage("");
  };
  return (
    <>
      <div className="h-screen flex items-center justify-center font-mono max-w-full bg-[#111322]/95">
        <form
          onSubmit={(e) => formSubmitHandler(e)}
          className="w-10/12 overflow-y-auto min-[380px]:w-9/12 min-[450px]:w-8/12 min-[540px]:w-7/12 sm:w-6/12 md:w-5/12 lg:w-4/12  bg-[#000]/90 rounded-[36px] py-10 px-6 xl:px-10"
        >
          <h1 className="text-white font-extrabold text-center text-2xl mb-5">
            CHIRP
          </h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => changeHandler(e)}
            required
            className="border-[4px] rounded-xl p-2 text-lg w-full border-[#28166a] my-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => changeHandler(e)}
            required
            className="border-4 rounded-xl p-2 text-lg w-full border-[#28166a] my-2"
          />
          <button
            type="submit"
            className="bg-[#7f64c1] w-full text-xl p-3 text-white font-medium my-3"
          >
            Login
          </button>
          <p className="text-white text-lg text-center mb-2">
            Didn't have an account?{" "}
            <Link href={"/signup"} className="text-[#3d5bd1]">
              Signup
            </Link>
          </p>
        </form>
      </div>
      <Popup message={message} onClose={handleCloseError} />
    </>
  );
}

export default Login;