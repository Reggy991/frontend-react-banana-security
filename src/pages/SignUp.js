import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function SignUp() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const controller = new AbortController();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/register', {
                email,
                password,
                username,
            }, {
                signal: controller.signal,
            });
            login(response.data.accessToken);
            navigate('/profile');
        } catch (e) {
            console.error("Registratie is helaas mislukt. ", e);
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
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Emailadres:</label>
                    <input id="email" type="email" value={email} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord:</label>
                    <input id="password" type="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <div>
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input id="username" type="text" value={username} onChange={handleUsernameChange} required />
                </div>
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;
