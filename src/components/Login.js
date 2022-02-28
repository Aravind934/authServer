import { Container } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const validationSchema = yup.object({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

let initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  let navigate = useNavigate();
  let submit = (values) => {
    axios
      .post("http://localhost:8000/user/auth/login", values, {
        withCredentials: "include",
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          return navigate("/");
        }
        alert(res.data.message);
      });
  };
  return (
    <Container>
      <Formik
        onSubmit={submit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => (
          <Form>
            <div>
              <label>User name</label>
              <br />
              <Field type="text" name="username" placeholder="Enter username" />
              <ErrorMessage name="username" />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <br />
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" />
            </div>
            <button type="submit">Submit </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
