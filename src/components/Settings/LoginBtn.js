// Component to create a login button using Auth0-react in Settings.js

import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginBtn() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button 
            onClick={() => loginWithRedirect()}
        >
            Log In
        </button>
    );
}
