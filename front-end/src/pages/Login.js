import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import logo from "./../assets/images/logo2.png";
import { login } from "./../api/authApi";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    login(values).then((data) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: "success",
          title: "You have successfully Signed In",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/home");
      }
    });
    setSubmitting(false);
  };

  return (
    <div className="bg-light p-5 rounded-3 bg-form" style={{ width: "400px" }}>
      <h2>
        <img src={logo} className="logo" alt="logo" /> Sign In
      </h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <Form className="">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className={`form-control ${
                  errors.email && touched.email && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                style={{ maxWidth: "100%" }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error text-danger"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                className={`form-control ${
                  errors.password && touched.password && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                style={{ maxWidth: "100%" }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error text-danger"
              />
            </div>
            <div className="d-flex ">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Waiting..." : "Submit"}
              </button>
              <Link to="/register" className="ms-auto">
                Register Now
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
