// Login.jsx
import React, { useState, useContext  } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../services/userService'; // Thay đổi đường dẫn tới file userService

import { UserContext } from '../../context/UserContext';

import './Login.scss';

const Login = () => {
    const {loginContext} = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
      const [error, setError] = useState(null);
      const history = useHistory();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleLoginSuccess = (userData) => {
        
        let user = {
            account: userData,
            isAuthenticated: true,
            permission: userData.isAdmin ? 'admin' : 'guest'
        }
        // Save complete user data to local storage
        localStorage.setItem('user', JSON.stringify(user));
        console.log("check quyền: ", user.permission)

        loginContext(user);

    
        // Chuyển hướng đến trang chủ hoặc trang nào đó sau khi đăng nhập thành công
        if(userData.isAdmin) {
            history.push("/admin");
        }
        else {
            history.push("/");
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await loginUser(formData.username, formData.password);
    
          const { EC, EM, DT } = response.data;
    
          if (EC === 0) {
            // Đăng nhập thành công
            setError(null);
            handleLoginSuccess(DT); // Pass complete user data to handleLoginSuccess
            console.log("check user data: ", DT)
          } else {
            // Đăng nhập thất bại, hiển thị thông báo lỗi
            setError(EM);
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          console.error('Error during login:', error);
          setError('An error occurred during login.');
        }
      };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/register" className="register-link">
        Don't have an account? Register here.
      </Link>
    </div>
  );
};

export default Login;
