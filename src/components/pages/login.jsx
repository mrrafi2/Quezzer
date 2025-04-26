import React, { useState } from 'react';
import classes from "../style/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }

  const handleToggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className={classes.all}>
      <div className={classes.centerContainer}>
        <div className={classes.cardContainer}>
          <div className={classes.loginCardWrapper}>
            <h2 className={classes.title}>Login</h2>
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.formGroup}>
          
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.inputField}
                />
              </div>

              <div className={classes.formGroup}>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.inputField}
                />
              </div>

              <div className={classes.toggleContainer}>
                <input
                  type="checkbox"
                  id="showPasswordToggle"
                  onChange={handleToggleShowPassword}
                  className={classes.checkbox}
                />
                <label htmlFor="showPasswordToggle" className={classes.toggleLabel}>
                  Show Password
                </label>
              </div>

              <div className={classes.buttonContainer}>
                <button type="submit" className={classes.btnGradient} disabled={loading}>
                  Login
                </button>
                <button type="reset" className={classes.reset} disabled={loading}>
                  Reset
                </button>
              </div>

              {error && (
                <p className={classes.errorMsg}>
                  {error}
                </p>
              )}

              <p className={classes.bottomText}>
                Don't have an account?{" "}
                <Link to="/signup" className={classes.link}>
                  Sign-up
                </Link>{" "}
                instead!
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
