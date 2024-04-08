import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../slices/userSlice";
import { adminLogin } from "../slices/adminSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isError, isLoading, isSuccess, errMsg } = useSelector(
    (state) => state.user
  );
  const { isError: adminIsError, isLoading: adminIsLoading, isSuccess: adminIsSuccess, errMsg: adminErrMsg } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFormSubmit = (userCredentialsObject) => {
    if (userCredentialsObject.userType === "user") {
      dispatch(userLogin(userCredentialsObject));
    } else if (userCredentialsObject.userType === "admin") {
      dispatch(adminLogin(userCredentialsObject));
    }
  };


  useEffect(() => {
    if (isSuccess) {
      const userType = localStorage.getItem('userType');
      console.log(userType)
      console.log(adminIsSuccess)
      navigate("/userdashboard");
    }
    else if(adminIsSuccess){
      navigate("/admindashboard" );
    }
  }, [isSuccess, adminIsSuccess]);

  return (
    <div className="container">
      <p className="display-2 text-center text-primary">Login</p>
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 mx-auto">
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Form.Group className="mb-3 custom-form-group">
              <Form.Label>Select User Type</Form.Label> <br />
              <Form.Check inline type="radio" id="user">
                <Form.Check.Input
                  type="radio"
                  value="user"
                  {...register("userType", { required: true })}
                />
                <Form.Check.Label>User</Form.Check.Label>
              </Form.Check>
              <Form.Check inline type="radio" id="admin">
                <Form.Check.Input
                  type="radio"
                  value="admin"
                  {...register("userType", { required: true })}
                />
                <Form.Check.Label>Admin</Form.Check.Label>
              </Form.Check>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="text-danger">* Username is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-danger">* Password is required</p>
              )}
            </Form.Group>

            <Button className="general_button" type="submit" disabled={isLoading}>
              {isLoading || adminIsLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Login"
              )}
            </Button>

            {isError && <Alert variant="danger">{errMsg}</Alert>}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
