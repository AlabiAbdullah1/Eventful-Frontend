import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventeeLogin() {
  const queryClient = useQueryClient();

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (requestData) => {
      const response = await fetch("http://127.0.0.1:8000/user/login", {
        method: "POST",
        body: JSON.stringify(requestData),
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
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      toast.error(error.message);
    },
  });

  const handleSubmit = async (values, { setErrors, setSubmitting }) => {
    try {
      const { email, password } = values;
      await mutateAsync({ email, password });
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed: " + error.message);
      setErrors({ server: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) return <Spinner />;
  // if (isError) return <h1>Error during login...</h1>;

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <main className={styles.login}>
            <PageNav />
            <Form className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div>
                <button
                  className={styles.btnsubmit}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
                <ErrorMessage
                  name="server"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.row}>
                <p>
                  Don't have an account?
                  <Link to="/creator-signup">Create Account</Link>
                </p>
              </div>
            </Form>
          </main>
        )}
      </Formik>
    </>
  );
}
