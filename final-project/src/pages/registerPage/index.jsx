import React, {useState} from "react";
import { RegisterForm } from "../../components";
import '../LoginPage/login.css';

export default function RegisterPage() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  return (  
    <div className="container">
      <h1>Welcome to Pitch Perfect - Music App</h1>
      <h1>Please Register</h1>
      <RegisterForm 
        firstName={firstName} setFirstName={setFirstName}
        lastName={lastName} setLastName={setLastName}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        message={message} setMessage={setMessage}
      />
    </div>
  )
}
