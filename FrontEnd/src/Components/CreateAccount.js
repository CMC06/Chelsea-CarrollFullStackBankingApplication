import { useState } from 'react';

const CreateAccount = ({ setLoggedIn, setCurrentUser }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  

  const handleSubmit = () => {
    const lowerEmail = email.toLowerCase();
    const url = `/account/create/${name}/${lowerEmail}/${password}`;
    (async () => {
      const res = await fetch(url);
      if(res.status === 409){
        console.log('Email already attached to existing account. Please log in.');
        alert('Error: this email address is already attached to an account. Please log in to your existing account.');
        return null;
      }
      const data = await res.json();
      // console.log(data);
      setSuccess(true);
      setLoggedIn(true);
      setCurrentUser({...data});
    })();
    
  };

  const handleChange = (e) => {
    let validated = false; 

    if(e.target.id === 'name'){
      setName(e.target.value);
      if(e.target.value !== '' && email !== '' && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value === ''){
        setNameError(true);
      } else {
        setNameError(false);
      }
    }

    if(e.target.id === 'email'){
      setEmail(e.target.value);
      if(e.target.value !== '' && name !== '' && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value === ''){
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      if(name === ''){
        setNameError(true);
      }
    }

    if(e.target.id === 'password') {
      setPassword(e.target.value);
      if(e.target.value !== '' && e.target.value.length >= 8 && name !== '' && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if(name === ''){
        setNameError(true);
      }
      if(email === ''){
        setEmailError(true);
      }
    }
    
    if(e.target.value === ''){
      setBtnDisable(true);
    } 
    if(e.target.value !== '' && validated) {
      setBtnDisable(false);
    }

  }

  const handleNewCreateUser = () => {
    setSuccess(false);
    setCurrentUser(null);
    setLoggedIn(false);
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Create Account</h2>
        </div>
        <div className="card-body">
        {success === true ? 
          <>
          <p className="card-text">Congratulations, you have successfully created an account with Bad Bank! If you would like to create another account, please click below.</p>
          <button type="button" onClick={handleNewCreateUser} className="btn btn-dark">Create Another Account</button>
          </>
          : 
          <>
            <h4>Please fill out this form to create your new Bad Bank account.</h4> 
            <p className="card-text">Please note, you will not be able to submit the form without first providing a name, email address, and password of at least 8 characters length.</p>
            <form>
              <div className="mb-3">
                <label className="form-label">Name: </label><br />
                <input type="text" placeholder="Your Name" id="name" onChange={handleChange} className="form-control" />
                {nameError ? <p className="negative smallP">You must enter a name to submit the form.</p> : null }
                <label className="form-label">Email: </label> <br />
                <input type="email" placeholder="Your Email Address" id="email" onChange={handleChange} className="form-control" />
                {emailError ? <p className="negative smallP">You must enter an email address to submit the form.</p> : null }
                <label className="form-label">Password:</label> <br />
                <input type="password" minLength="8" placeholder="Password" id="password" onChange={handleChange} className="form-control" /> 
                {passwordError ? <p className="negative smallP">Your password must be at least 8 characters long.</p> : null }
                <br />
                {btnDisable ? <button type="button" disabled={true} onClick={handleSubmit} className="btn btn-dark">Create an Account</button> : <button type="button" disabled={false} onClick={handleSubmit} className="btn btn-dark">Create an Account</button>}
                
              </div>
            </form>
          </>
        }
        </div>           
      </div>
    </div>
  )
}

export default CreateAccount
