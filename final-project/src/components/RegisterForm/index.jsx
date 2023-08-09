import React from "react";
import { useNavigate, Link } from "react-router-dom"

export default function RegisterForm({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, message, setMessage }) {


  function handleFirstName(e) {
    setFirstName(e.target.value)
  }

  function handleLastName(e) {
    setLastName(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0) {
      fetch('http://localhost:3000/users/register', {
        method: 'POST',
        body: JSON.stringify({first_name: firstName, last_name: lastName, email: email, password: password}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.detail);
          })
        }
        return res.json();
      })
      .then((data) => {
        setMessage('User registered successfully.');
        setTimeout(() => {
          setMessage('')
          navigate('/login')
        }, 300)
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === '400') {
          setMessage('Email is already in use. Please use a different email.');
        } else {
          setMessage('There was a problem with your registration.');
        }
        setTimeout(() => {
          setMessage('');
        }, 5000);
      })
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    } else {
      setMessage('Please fill in all fields.')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div>
      <label>First Name: <input type="text" value={firstName} onChange={handleFirstName} /></label>
      </div>
      <div>
      <label>Last Name: <input type="text" value={lastName} onChange={handleLastName} /></label>
      </div>
      <div>
      <label>Email: <input type="text" value={email} onChange={handleEmail} /></label>
      </div>
      <div>
      <label>Password: <input type="password" value={password} onChange={handlePassword} /></label>
      </div>
      <input type="submit" value="Register" />
      <p>Already Registered? <Link to="/login">Login</Link></p>
      <p className='message'>{message}</p>
    </form>
  )
}
