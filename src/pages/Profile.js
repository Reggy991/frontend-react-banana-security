import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const [privateContent, setPrivateContent] = useState("");
    const { user: { username, email }, status} = useContext(AuthContext);
    const controller = new AbortController();

    useEffect(() => {
        const fetchPrivateContent = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/660/private-content', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    signal: controller.signal,
                });
                setPrivateContent(response.data);
            } catch (e) {
                console.error("De data kon niet worden opgehaald", e);
            }
        };

        fetchPrivateContent();

        return function cleanup() {
            controller.abort();
        };
    }, []);

  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
          {privateContent && (
              <>
                  <h3>{privateContent.title}</h3>
                  <p>{privateContent.content}</p>
              </>
          )}
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;