import { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const switchPage = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? (
    <Login switchPage={switchPage} />
  ) : (
    <Signup switchPage={switchPage} />
  );
}

export default Auth;
