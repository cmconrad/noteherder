import React from 'react'

import './SignIn.css'

const SignIn = ({ handleAuth }) => {
    const authenticate = ()=> {
        handleAuth()
    }

    return <div className="SignIn">
        <button onClick={authenticate}>Sign In</button>
        </div>
}

export default SignIn