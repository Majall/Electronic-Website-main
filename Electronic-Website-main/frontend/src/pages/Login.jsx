import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ShopContext } from "../context/ShopContextContext";

const Login = () => {

  const [currentState,setCurrentState] =useState('Login');
  const{token,setToken,navigate,backendUrl}= useContext(ShopContext);
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const onSubmitHandler =async (e)=>{
    e.preventDefault();
    try {
      if (currentState=== 'Sign Up') {
        const response = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }else{
         const response = await axios.post(backendUrl+'/api/user/login',{email,password})
         if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
         }else{
          toast.error(response.data.message)
         }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md p-8">
        <form onSubmit={onSubmitHandler} className="space-y-4 text-foreground">
          <div className="flex items-center gap-3">
            <p className="text-2xl font-semibold">{currentState}</p>
            <span className="h-px w-10 bg-border" />
          </div>
          {currentState === "Login" ? null : (
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus-ring"
              placeholder="Name"
              required
            />
          )}
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus-ring"
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm focus-ring"
            placeholder="Password"
            required
          />
          <div className="flex items-center justify-between text-xs text-subtle">
            <p>Forgot your password</p>
            {currentState === "Login" ? (
              <button
                type="button"
                onClick={() => setCurrentState("Sign Up")}
                className="font-semibold text-foreground"
              >
                Create account
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentState("Login")}
                className="font-semibold text-foreground"
              >
                Login here
              </button>
            )}
          </div>
          <Button size="lg" className="w-full" type="submit">
            {currentState === "Login" ? "Sign in" : "Sign up"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
