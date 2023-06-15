import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

// Met 'rsf' kan je een functioneel component maken.
function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [isAuth, toggleIsAuth] = useState(false);

    function login() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate('/profile');
    }

    function logout() {
        toggleIsAuth(false);
        console.log("Gebruiker is uitgelogd!");
        navigate('/');
    }

    function signInPage() {
        toggleIsAuth(true);
        console.log("Gebruiker is ingelogd!");
        navigate('/signin');
    }

    const data = {
        isAuth : isAuth,
        login: login,
        logout: logout,
        signInPage : signInPage
        // Je kan deze functies ook in eenvoud schrijven (dus alleen login) omdat het toch hetzelfde is.
    }

    return (
        <div>
            <AuthContext.Provider value={data}>
            {children}
            </AuthContext.Provider>
        </div>
    );
}

export default AuthContextProvider;