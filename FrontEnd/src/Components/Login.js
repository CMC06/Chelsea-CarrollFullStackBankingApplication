import { useState } from 'react';

const Login = ({ loggedIn, setLoggedIn, setCurrentUser }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [btnDisable, setBtnDisable] = useState(true);


  const handleSubmit = () => {
    //verifies user submitted information against user information in database
    const url = `/account/login/${email.toLowerCase()}/${password}`;
    (async () => {
      const res = await fetch(url);
      if(res.status === 401 || res.status === 409){
        alert(`Either user email or user password do not match our database. If you have not yet created an account, please do so by clicking 'Create Account'`);
      } else {
        const data = await res.json();
        
        if(data){
          setLoggedIn(true);
          //updates current user with database information
          setCurrentUser({...data});
          sessionStorage.setItem('name', `${data.name}`);
          sessionStorage.setItem('email', `${data.email}`);
          sessionStorage.setItem('balance', `${data.balance}`);
      }
      }
    })();
  }

  //logic for logging in as Demo User account
  const handleDemoSubmit = () => {
    const url = '/account/login/tester@test.ing/testing123';
    (async () => {
      const res = await fetch(url);
      const data = await res.json();

      if(data){
        setLoggedIn(true);
        setCurrentUser({...data});
        sessionStorage.setItem('name', `${data.name}`);
        sessionStorage.setItem('email', `${data.email}`);
        sessionStorage.setItem('balance', `${data.balance}`);
      }
    })()
  }

  const handleChange = (e) => {
    let validated = false; 

    if(e.target.id === 'email'){
      setEmail(e.target.value);
      if(e.target.value !== '' && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value === ''){
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if(e.target.id === 'password') {
      setPassword(e.target.value);
      if(e.target.value !== '' && e.target.value.length >= 8 && password !== ''){
        validated = true;
      } else {
        validated = false;
      }
      if(e.target.value.length < 8) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
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

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-body">
          {loggedIn ? 
          <p>Congratulations, you have successfully logged in to your account.</p>
          :
          <form onsubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Email:</label> <br />
            <input className="form-control" type="text" onChange={handleChange} id="email" placeholder="Account Holder Email"></input>
            {emailError ? <p className="negative smallP">You must enter a previously registered email address to login. If you do not yet have an account, go to "Create An Account" to sign up now.</p> : null }
            <label className="form-label">Password:</label> <br />
            <input type="password" minLength="8" placeholder="Password" id="password" onChange={handleChange} className="form-control" /> 
            {passwordError ? <p className="negative smallP">Your password must be at least 8 characters long.</p> : null } <br />
            {btnDisable ? <button type="button" disabled={true} onClick={handleSubmit} className="btn btn-dark">Login</button> : <button type="button" disabled={false} onClick={handleSubmit} className="btn btn-dark">Login</button>}
            <button type="button" disabled={false} onClick={handleDemoSubmit} className="btn btn-dark" style={{'marginLeft': '10px'}}>Demo Account Login</button>
            </div>
          </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Login
