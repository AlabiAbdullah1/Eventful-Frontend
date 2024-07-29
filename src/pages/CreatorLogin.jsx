import styles from "./Login.module.css";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import PageNav from "../components/PageNav";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const CreatorLogin = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (requestData) => {
      const response = await fetch("http://127.0.0.1:8000/creator/login", {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" },
        Credentials: true,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorText = await response.text();
        alert(errorText);
        // throw new Error(errorText);
      }

      return data;
    },
    onSuccess: (data) => {
      console.log(data.token);
      <ToastContainer />;
      toast.success("Login successful!");
      navigate("/creator-dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      alert(error.message);
      toast.error(error.message);
    },
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      await mutateAsync({ email, password });
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageNav />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <main className={styles.login}>
          <Form className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="email">Email address</label>
              <Field type="email" name="email" id="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </Form>
        </main>
      </Formik>
    </>
  );
};

export default CreatorLogin;
