import Popup from "@/Components/Popup";
import Link from "next/link"; 
import { useRouter } from "next/router";
import React, { useState , useEffect } from "react";

function SignUp() {
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("user")){
      router.push("/");
    }
  }, [])

  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values.username);
  };
  const formValidation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setMessage("Password and Confirm Password must be same");
      return false;
    } else if (password.length < 8) {
      setMessage("Password must be of minimum 8 charachters");
      return false;
    } else if (username.length <= 3) {
      setMessage("Username shoud be greater than 3 charachters");
      return false;
    }
    return true;
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch("http://localhost:4000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("Signup successful!");
          router.push("/login");
        } else {
          const errorResponse = await response.json();
                setMessage(errorResponse.error || "Failed to signup");
        }
      } catch (error) {
        console.error("An error occurred during signup", error);
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
          className="w-10/12 overflow-y-auto min-[380px]:w-9/12 min-[450px]:w-8/12 min-[540px]:w-7/12 sm:w-6/12 md:w-5/12 lg:w-4/12 h-5/6 bg-[#000]/90 rounded-[36px] py-10 px-6 xl:px-10"
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
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => changeHandler(e)}
            required
            className="border-4 rounded-xl p-2 text-lg w-full border-[#28166a] my-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => changeHandler(e)}
            required
            className="border-4 rounded-xl p-2 text-lg w-full border-[#28166a] my-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => changeHandler(e)}
            required
            className="border-4 rounded-xl p-2 text-lg w-full border-[#28166a] my-2"
          />
          <button
            type="submit"
            className="bg-[#7f64c1] w-full text-xl p-3 text-white font-medium my-3"
          >
            Create User
          </button>
          <p className="text-white text-lg text-center">
            Already have an account?{" "}
            <Link href={"/login"} className="text-[#3d5bd1]">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Popup message={message} onClose={handleCloseError} />
    </>
  );
}

export default SignUp;