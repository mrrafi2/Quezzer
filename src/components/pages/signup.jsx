import React, { useState } from 'react';
import classes from "../style/signup.module.css"
import {Link,useNavigate} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    // validation
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to create an account!");
    }
  }


  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  

  return (
    <div className="container-fluid p-5" id={classes.all} >
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className={classes.signupCard}>
            <h2 className="text-center mb-5 text-light fw-bold">Create an Account</h2>

            <form  onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3 mt-3 form-floating">

                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}

                />
                <label htmlFor="username" className="form-label">
                  Username
                </label>
              </div>
              {/* Email Address */}
              <div className="mb-3 mt-3 form-floating">
                 <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  required
                  value={email}
                   onChange={(e) => setEmail(e.target.value)}

                />
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>

              </div>
              {/* Password */}
              <div className="mb-3 mt-3 form-floating">
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />

              <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>
              {/* Confirm Password */}
              <div className="mb-4 mt-3 form-floating">
               
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 <label htmlFor="confirmPassword" className="form-label ">
                  Confirm Password
                </label>
              </div>
              {/* Show Password Checkbox */}
              <div className="form-check mb-2" >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showPasswordToggle"
                  onChange={handleToggleShowPassword}
                />
                <label className="form-check-label fw-semibold text-muted" htmlFor="showPasswordToggle">
                  Show Password
                </label>
              </div>
              {/* Terms & Conditions */}
              <div className={`${classes.agree} form-check mb-3`}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  name="terms"
                  required
                  value={agree}
                  onChange={(e) => setAgree(e.target.value)}
                />
                <label className="form-check-label fw-semibold" htmlFor="terms" >
                    <span> I agree to the <Link to='/terms' style={{textDecoration:'' , color:"black"}}>Terms &amp; Conditions</Link>  </span>
                 
                </label>
              </div>
              {/* Buttons */}
              <div className="mt-5 " style={{alignItems:'center',textAlign:'center'}}>
                
                <button  type="submit" className={classes.btn}   disabled={loading}>
                  Signup
                </button>

                <button type="reset" className={classes.reset}  disabled={loading} >
                  Reset
                </button>
              </div>
            
            {
                error &&
              <p className='alert alert-danger fw-semibold mt-5  text-dark' style={{textAlign:'center'}} >
                {error}
              </p>
            }
              <p className={`${classes.info} fw-semibold mt-5  text-muted`} >
                Already have an account <Link to="/login" className='text-secondary'>Log-in</Link> instead !
              </p>
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Signup;
