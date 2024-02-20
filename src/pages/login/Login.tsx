import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { User } from "../../model/User"
import data from "../../jsons/user.json"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const username = useRef<HTMLInputElement>();
  const pwd = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")!=undefined) {
      navigate("/home")
    }
  },);
  return (
    <>
      <div className="flex justify-center items-center bg-primary w-screen h-screen">
        <div className="px-6 py-10 bg-white rounded-2xl w-1/3">
          <h1 className="text-4xl font-medium text-center">Sign in</h1>
          <div className="flex justify-center">
            <img
              className="size-16 m-6"
              src="https://cdn-icons-png.flaticon.com/512/2518/2518026.png"
            />
          </div>
          Username
          <TextField inputRef={username} sx={{ mb: 2 }} size="small" fullWidth />
          Password
          <TextField inputRef={pwd} type="password" sx={{ mb: 2 }} size="small" fullWidth />
          <h3 className="text-base font-medium text-center text-red-600">{msg}</h3>
          <button onClick={login} className="mt-3 mb-4 w-full rounded-xl text-white bg-primary hover:bg-violet-700 active:bg-violet-900 py-2 transition duration-200">
            Sign in
          </button>
        </div>
      </div>
    </>
  );
  function login() {
    const users: User[] = data;
    const user = users.find((u => u.username === username.current?.value && u.password === pwd.current?.value))
    if (user != undefined) {
      localStorage.setItem('user',JSON.stringify(user));
      navigate("/home");
    }else{
      setMsg("Invalid username or password");
      console.log("Invalid username or password");
    }
    
  }
}
export default LoginPage;
