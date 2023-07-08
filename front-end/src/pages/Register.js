import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import logo from "./../assets/images/logo2.png";
import { register } from "./../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters long"),
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .max(100, "Maximum age allowed is 100"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    register(values).then((data) => {
      if (data?.token) {
        Swal.fire({
          icon: "success",
          title: "You account has been created ",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
    });
    setSubmitting(false);
  };

  return (
    <div className="p-4 rounded-3 bg-form" style={{ width: "400px" }}>
      <h2>
        <img src={logo} className="logo" alt="logo" /> Register
      </h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          age: "",
          gender: "",
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
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                name="name"
                id="name"
                className={`form-control ${
                  errors.name && touched.name && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                style={{ maxWidth: "100%" }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error text-danger"
              />
            </div>
            <div className="form-group my-2">
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
            <div className="form-group">
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

            <div className="form-group my-2">
              <label htmlFor="age">Age</label>
              <Field
                type="number"
                name="age"
                id="age"
                className={`form-control ${
                  errors.age && touched.age && "is-invalid"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.age}
                style={{ maxWidth: "100%" }}
              />
              <ErrorMessage
                name="age"
                component="div"
                className="error text-danger"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div>
                <div className="form-check form-check-inline">
                  <Field
                    type="radio"
                    name="gender"
                    id="gender-male"
                    value="male"
                    className={`form-check-input ${
                      errors.gender && touched.gender && "is-invalid"
                    }`}
                  />
                  <label
                    htmlFor="gender-male"
                    className="form-check-label"
                    style={{ marginRight: "10px" }}
                  >
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <Field
                    type="radio"
                    name="gender"
                    id="gender-female"
                    value="female"
                    className={`form-check-input ${
                      errors.gender && touched.gender && "is-invalid"
                    }`}
                  />
                  <label htmlFor="gender-female" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                className="error text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary my-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Waiting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
