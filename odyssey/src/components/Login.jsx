import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Login.css";

class Login extends React.Component {
  state = {
    errorMessage: "",
  };

  login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is signed in, you can navigate to the desired page or handle the user object
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  signUp = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User is signed up, you can navigate to the desired page or handle the user object
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === "auth/email-already-in-use") {
        this.setState({ errorMessage: "Email is already in use." });
      }
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login / Sign Up</h2>
          <div>
            <div>Email</div>
            <input
              id="email"
              className="login-input"
              placeholder="Enter Email.."
              type="text"
            />
          </div>
          <div>
            <div>Password</div>
            <input
              id="password"
              className="login-input"
              placeholder="Enter Password.."
              type="password"
            />
          </div>
          <button className="login-button" onClick={this.login}>
            Login
          </button>
          <button className="login-button" onClick={this.signUp}>
            Sign Up
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      </div>
    );
  }
}

export default Login;
