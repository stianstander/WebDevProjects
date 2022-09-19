/* Type 'rfce' for boilerplate code */

import React, { useState } from 'react'


/* add login and error so it can be called */
function LoginForm({ Login, error }) {
    /* create variables for useState */
    const [details, setDetails] = useState({ name: "", email: "", password: "" })

    const submitHandler = e => {
        e.preventDefault();

        /* this will pass through your details */
        Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <h2>Login</h2>
                {/* Error code */}
                {(error !== "") ? (<div className='error'>{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="name" name="name">Name:</label>
                    {/* include onChange to make sure values are updated after filling in info */}
                    <input type="text" name="name" id="name" onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type='email' name='email' id='email' onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}

export default LoginForm
