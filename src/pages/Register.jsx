import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import UseAuthentication from '../hooks/UseAuthentication'
import defaultRegisterValues from "../utils/defaultRegisterValues";
import alertify from "alertifyjs";
import "../styles/register.css";
import Loading from "../components/Load/Loading";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();

  const { createNewUser, showError, setShowError, userExit, setUserExit } =
    UseAuthentication();

  const [showLoading, setShowLoading] = useState();

  const navigate = useNavigate()

  const submit = (data) => {
    createNewUser(data);
    reset(defaultRegisterValues);
    setShowLoading(true);
  };


  useEffect(() => {
    if (showError) {
      if (userExit == "User already exists") {
        setShowLoading();
        alertify.alert("Error!", "User already exists");
        setUserExit();
        setShowError();
      } else {
        setShowLoading();
        alertify.alert("Error!", "ocurrio un error");
        setShowError();
      }
    } else {
      if (userExit) {
        setShowLoading()
      alertify.alert("Successful!", "User created");
      setShowError();
      navigate('/login');
      }
    }
  }, [showError]);

  return (
    <section className="register">
      {showLoading ? (
        <div className="containerLoad">
          <div className="load__container">
            <Loading />
          </div>
        </div>
      ) : (
        ""
      )}
      <article className="register__container">
        <h2>Sign Up</h2>

        <form className="register__form" onSubmit={handleSubmit(submit)}>
          <h2>Create a New User</h2>

          <div className="form__container-register">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              {...register("firstName")}
              type="text"
              id="firstName"
            />
          </div>

          <div className="form__container-register">
            <label htmlFor="lastName">Last Name</label>
            <input {...register("lastName")} type="text" id="lastName" />
          </div>

          <div className="form__container-register">
            <label htmlFor="email">Email</label>
            <input required {...register("email")} type="text" id="email" />
          </div>

          <div className="form__container-register">
            <label htmlFor="password">Password</label>
            <input
              required
              {...register("password")}
              type="password"
              id="password"
            />
          </div>

          <div className="form__container-register">
            <label htmlFor="phone">Phone</label>
            <input {...register("phone")} type="tel" id="phone" />
          </div>

          <button className="login__btn">Register</button>
        </form>

        <div className="sign__up">
          <p>Already have an account?</p>
          <button>Sign in</button>
        </div>
      </article>
    </section>
  );
};

export default Register;
