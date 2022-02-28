import { Container } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required("required"),
  email: yup.string().email().required("required"),
  password: yup.string().required("required"),
});

let initialValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  let navigate = useNavigate();
  let submit = (values) => {
    axios
      .post("http://localhost:8000/user/auth/register", values)
      .then((res) => {
        if (res.data.status === 200) {
          return navigate("/login");
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

            <div>
              <label>Email</label>
              <br />
              <Field type="text" name="email" placeholder="Enter email" />
              <ErrorMessage name="email" />
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

export default Register;
