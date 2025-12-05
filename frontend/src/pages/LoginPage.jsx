import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../libs/axios";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/posts/login", { password });
      
      localStorage.setItem("token", res.data.token);
      
      toast.success("Welcome back, Admin!");
      navigate("/");
      // Optional: Force reload to update Navbar state
      window.location.reload(); 
    } catch (error) {
      toast.error("Wrong password");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Form onSubmit={handleLogin} className="w-50">
        <h2 className="text-white text-center mb-4" style={{fontFamily: "'Crimson Text', serif"}}>Admin Login</h2>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" type="submit" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;