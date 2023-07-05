import { useEffect, useState } from "react";
import UseAuthentication from "../hooks/UseAuthentication";

import "../styles/login.css";
import Loading from "../components/Load/Loading";
import LogOut from "../components/login/LogOut";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, showError, setShowError } = UseAuthentication();

  const [showLoading, setShowLoading] = useState(false);

  const [userN, setUserN] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };
    loginUser(data);
    setShowLoading(true);
  };

  const handleSignUp = () => {
    navigate('/register')
  }

  useEffect(() => {
    console.log(showError);
    setShowLoading(false);

    if (showError == true) {
      setUserN(JSON.parse(localStorage.getItem("user")));
    }
  }, [showError]);

  useEffect(()=>{
    setUserN(JSON.parse(localStorage.getItem("user")));
  }, [localStorage.getItem('user')])

  return (
    <section className="login">
      {showLoading ? (
        <div className="containerLoad">
          <div className="load__container">
            <Loading />
          </div>
        </div>
      ) : (
        ""
      )}

      {userN ? (

        <LogOut setUserN={setUserN} />

      ) : (
        <article className="login__container">
          <h2 className="login__welcome">
            Welcome! Enter your email and password to continue
          </h2>
          <article className="login__test">
            <h3>Test Data</h3>

            <ul>
              <li>
                {" "}
                <i className="bx bx-envelope"></i> milt92@gmail.com
              </li>
              <li>
                <i className="bx bx-lock"></i> milt123
              </li>
            </ul>
          </article>
          <article className="login__form">
            <form className="form-container" onSubmit={handleLogin}>
              <div className="login__form-container email">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="milt92@gmail.com" />
              </div>

              <div className="login__form-container password">
                <label htmlFor="password">Passaword</label>
                <input type="password" id="password" placeholder="milt123" />
              </div>
              {showError ? (
                <p className="error__login">Invalid credentials</p>
              ) : (
                ""
              )}
              <button className="login__btn">Sing in</button>
            </form>
          </article>
          <div className="sign__up">
            <p>Don't have an account?</p>
            <button onClick={handleSignUp}>Sign up</button>
          </div>
        </article>
      )}
    </section>
  );
};

export default Login;
