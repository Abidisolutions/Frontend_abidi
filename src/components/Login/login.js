import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import logo from '../../images/Login-Logo-01.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
            console.log(response.data.message);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('email', response.data.email);
            
            const name = await axios.get('http://localhost:8000/api/getName', {params:{email: email}});
            
            localStorage.setItem('name', name.data);
            let currentUser = localStorage.getItem('email');
            toast.success( `Welcome ${currentUser}` );
            
            
            // Redirect to personal page after successful login
            navigate('/HomePage');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                setError(error.response.data.error || 'Invalid login credentials');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    return (
        <div className='full_page'>
            <div className='background'>
            <div className="form-container">

<form onSubmit={handleLogin} className="form">
    <img src={logo} alt="Login Image" className="login-image" />

    <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
    />
    <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
    />
    <button type="submit">Login</button>
    {error && <div className="error-message">{error}</div>}

</form>

</div>
            </div>
           
        </div>

    );
};

export default Login;
