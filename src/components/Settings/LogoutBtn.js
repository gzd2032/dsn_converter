// Component to create a logout button using Auth0-react in Settings.js
 
 import React from 'react'
 import { useAuth0 } from "@auth0/auth0-react";
 
 export default function LogoutBtn() {
    const { logout } = useAuth0();

     return (
        <button 
            onClick={() => logout({ returnTo: window.location.origin })}
        >
            Log Out
        </button>
     );
 }
 
