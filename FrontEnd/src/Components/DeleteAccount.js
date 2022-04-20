import { useState } from 'react';

function DeleteAccount({ currentUser, setLoggedIn, setCurrentUser }) {

  const [btnDisable, setBtnDisable] = useState(true);

  const handleClick = (e) => {
    let newVal = !(e.target.checked);
    setBtnDisable(newVal);
  }

  const handleDelete = () => {
    //prevents deletion of demo account
    if(currentUser.email === 'tester@test.ing'){
      alert('You are currently logged in under our demo account--we cannot delete this account. To use delete functionality, please create a new Bad Bank account.');
      return;
    }

    //delete call to api route to delete user from DB
    const email = currentUser.email;
    const url = `/account/deleteAccount/${email}`;

    (async () => {
      const res = await fetch(url, {
        method: 'DELETE'
      });

      if(res.status !== 200){
        alert('There was an error when deleting this account.');
        return null;
      }

      if(res.status === 200){
        alert('Your account has been deleted. We are sorry to lose you as a Bad Bank customer, but hope that you find a better bank for your future business.');

        //setTimeout runs after client dismisses alert
        setTimeout(() => {
        
          sessionStorage.clear();
          setCurrentUser(null);
          setLoggedIn(false);
    
          window.location.reload()
        }, 5)
      }
      
    })();
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Delete Your Bad Bank Account</h2>
        </div>
        <div className="card-body">
          <h4>Account Deletion Instructions</h4>
          <p className='card-text'>
            Please note, that if you click the button below your Bad Bank account will be permanently deleted and we will not be able to retrieve any of your credentials, balance, or other transaction history. If you delete your account by mistake, you will need to sign up for a new account to continuing using Bad Bank services.
          </p>
          <form>
            <div className="mb-3">
              <input type={'checkbox'} id='ackDelete' name='ackDelete' onClick={(e) => handleClick(e)} />
              <label for='ackDelete' className='form-label'>I understand that submitting this request will permanently delete my Bad Bank account.</label>
              <br />
              { btnDisable ? <button type='button' disabled={true} className="btn btn-dark">Delete My Account</button> : <button type='button' disabled={false} className="btn btn-dark" onClick={handleDelete} >Delete My Account</button> }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount