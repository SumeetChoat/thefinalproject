import React, {useState} from "react";
import {LoginForm} from "../../components";
import './styles.css';


export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    
    return (
      <div className="container">
        <h1>Welcome to Pitch Perfect - Music App!</h1>
        <div className='form-container'>
          <h1>Login</h1>     
          <LoginForm 
            email={email} 
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password} 
            setPassword={setPassword}
            message={message} 
            setMessage={setMessage}
          />
        </div>
      </div>
    );
  }
