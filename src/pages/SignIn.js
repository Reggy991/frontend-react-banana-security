import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function SignIn() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const controller = new AbortController();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            }, {
                signal: controller.signal,
            });
            console.log(response.data.accessToken);
            login(response.data.accessToken, '/profile');
            navigate('/profile');
        } catch (e) {
            console.error("Onjuiste email en wachtwoord combinatie ", e);
            // Hier je error handling in de UI.
        }
    };

    useEffect(() => {
        return function cleanup() {
            controller.abort();
        };
    }, []);

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Emailadres:</label>
                    <input id="email" type="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input id="password" type="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/register">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;
