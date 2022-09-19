import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123"
  }

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("")

  const Login = details => {
    console.log(details);

    /* we pass the data but now we must also handle the form */
    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log("Logged in!");
      /* to actually log in we setuser */
      setUser({
        name: details.name,
        email: details.email
      })
    } else {
      console.log("Details do not match!")
      setError("Details do not match!")
    }

  }

  const Logout = () => {
    /* to actually logout we setuser */
    setUser({ name: "", email: "" });
  }

  return (
    <div className="App">
      {(user.email !== "") ? (
        <div className='welcome'>
          <h2>Welcome, <span>{user.name}</span></h2>
          {/* add in onclick to  add in logout function*/}
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        /* put Login variable in loginform in order to call it */
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
