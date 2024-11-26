import React, { useState } from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ username: user.displayName, email: user.email })
      );

      navigate("/add-menu");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Login to Restaurant Management</h2>
      {error && <p className="error">{error}</p>}
      <button onClick={handleGithubLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;
