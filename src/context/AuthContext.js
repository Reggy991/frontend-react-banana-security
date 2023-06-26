import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {checkTokenValidity} from "../helpers/checkTokenValidity";

export const AuthContext = createContext(null);

// Met 'rsf' kan je een functioneel component maken.
function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkTokenValidity(storedToken)) {
            // Als de token nog niet expired is en we hebben een token dan mag de login functie uitgevoerd worden.
            void login(storedToken);
        } else {
            setAuth( {
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    }, []);

    async function login(jwt_token, redirect) {
        // console.log(jwt_token);
        const decodedToken = jwt_decode(jwt_token);
        localStorage.setItem('token', jwt_token);

        try {
            const { data: { email, username, id}} = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt_token}`
                }
            });

            // const data = response.data;
            // console.log(response.data);
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username,
                    email,
                    id
                },
                status: "done"
            });

        console.log("Gebruiker is ingelogd!");
        if (redirect) navigate(redirect);
    } catch (e) {
            console.error("Onjuiste email en wachtwoord combinatie ", e);
            // Hier je error handling in de UI.
        }
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log("Gebruiker is uitgelogd!");
        navigate('/');
    }

    const data = {
        isAuth : auth.isAuth, // auth is het object en isAuth is daar de key van.
        login: login,
        logout: logout,
        user: auth.user
        // Je kan deze functies ook in eenvoud schrijven (dus alleen login) omdat het toch hetzelfde is.
    }

    return (
        <div>
            <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
            </AuthContext.Provider>
        </div>
    );
}

export default AuthContextProvider;