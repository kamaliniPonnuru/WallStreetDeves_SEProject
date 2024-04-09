import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // state for image
  const navigate = useNavigate();

  const onFormSubmit = async (userObj) => {
    try {
      // // create FormData object
      const formData = new FormData();
      // // append values to it
      formData.append("userObj", JSON.stringify(userObj));

      // http post req
      console.log(formData);
      const response = await axios.post("http://localhost:4000/user-api/create-user", formData, {
        headers: {
          "Content-Type": 'application/json',
        },
      });
      console.log(response);
      alert(response.data.message);

      if (response.data.message === "New User created") {
        // navigate to login
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (!error.response) {
          // Network error
          console.error("Network error:", error);
        } else {
          // Server responded with an error status
          console.error("Server error:", error.response.data);
        }
      } else {
        // Other types of errors
        console.error("Unexpected error:", error);
      }

      alert("Something went wrong in creating user");
    }
  };

  return (
    <Container>
      <div className="display-2 text-center text-primary">Signup</div>
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 mx-auto">
          <Form onSubmit={handleSubmit(onFormSubmit)}>
             {/* username */}
             <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Name"
                {...register("name", { required: true })}
              />
              {/* validation error message for username */}
              {errors.name && (
                <p className="text-danger">* Name is required</p>
              )}
            </Form.Group>
            {/* username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                {...register("username", { required: true })}
              />
              {/* validation error message for username */}
              {errors.username && (
                <p className="text-danger">* Username is required</p>
              )}
            </Form.Group>

            {/* password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              {/* validation error message for password */}
              {errors.password && (
                <p className="text-danger">* Password is required</p>
              )}
            </Form.Group>

            {/* email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@my\.unt\.edu$/,
                    message: "Please enter a valid @my.unt.edu email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>

            {/* city */}
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                {...register("city", { required: true })}
              />
              {/* validation error message for password */}
              {errors.city && (
                <p className="text-danger">* City is required</p>
              )}
            </Form.Group>

            <Button className="general_button" variant="primary" type="submit">
              Signup <MdLogin />
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
