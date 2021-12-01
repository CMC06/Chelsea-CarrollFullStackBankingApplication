const Logout = ({ setCurrentUser, setLoggedIn, loggedIn }) => {

  let logged = loggedIn;
  
  const handleConfirm = () =>{
    setCurrentUser(null);
    setLoggedIn(false);
    logged = false;
  } 


  return (
    <div>
      {logged ? 
        <div className="card">
        <div className="card-header">
          <h2>Confirm Logout Request</h2>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>Please click below to confirm that you want to log out of this banking session.</strong></p>
          <button onClick={handleConfirm} type="button" className="btn btn-dark">Confirm Logout</button>
        </div>
      </div>
      :
      <div className="card">
        <div className="card-header">
          <h2>Logged Out</h2>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>You have successfully logged out of Bad Bank.</strong></p>
        </div>
      </div>
      }    
    </div>
  )
}

export default Logout
