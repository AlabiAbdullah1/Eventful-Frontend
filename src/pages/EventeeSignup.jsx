import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
// import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

export default function EventeeSignup() {
  const queryClient = useQueryClient();

  const signupschema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string().default("user"),
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (requestBody) => {
      const response = await fetch("http://127.0.0.1:8000/user/signup", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      return response.json();
    },
    onSuccess: (requestData) => {
      queryClient.setQueryData("creator", requestData);
      navigate("/eventee-login");
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { name, email, password, role } = values;
      await mutateAsync({ name, email, password, role });
    } catch (error) {
      console.error("Signup failed:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) return <Spinner />;
  if (isError) return <div>Error during signup...</div>;

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        role: "User",
        confirmPassword: "",
      }}
      validationSchema={signupschema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <main className={styles.login}>
          <PageNav />
          <Form className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage
                name="name"
                component="p"
                className={styles.error}
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="email">Email address</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage
                name="email"
                component="p"
                className={styles.error}
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="role">Role</label>
              <Field
                type="text"
                id="role"
                name="role"
                value="Eventee"
                readOnly
              />
              <ErrorMessage
                name="role"
                component="p"
                className={styles.error}
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage
                name="password"
                component="p"
                className={styles.error}
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="confirmpassword">confirm Password</label>
              <Field
                type="password"
                id="confirmpassword"
                name="confirmpassword"
              />
              <ErrorMessage
                name="confirmpassword"
                component="p"
                className={styles.error}
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div>
              <button
                className={styles.btnsubmit}
                type="submit"
                disabled={isSubmitting}
              >
                Signup
              </button>
            </div>
          </Form>
        </main>
      )}
    </Formik>
  );
}
