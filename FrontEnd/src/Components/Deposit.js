import { useState, useContext } from 'react';
import { UserContext } from '../App';

const Deposit = ({ setCurrentUser }) => {

  const [ depositAmt, setDepositAmt ] = useState(0);
  const [ success, setSuccess ] = useState(false);
  const [ btnDisable, setBtnDisable ] = useState(true);
  const [ negError, setNegError ] = useState(false);

  const user = useContext(UserContext);
  const balance = user.balance;

  const handleChange = (e) => {
    setDepositAmt(e.target.value);
    console.log(e.target.value);
    if(e.target.value !== undefined || null || '') {
      setBtnDisable(false);
    } 
    if (e.target.value === '') {
      setBtnDisable(true);
    }
    if (e.target.value <= 0){
      setBtnDisable(true);
      setNegError(true);
    } else {
      setNegError(false);
    }
  }

  const updateBalance = () => {
    let newBalance = Number(balance) + Number(depositAmt);
    return newBalance
  }

  const handleSubmit = () => {
    const email = user.email;
    
    const newBalance = updateBalance();
    const url = `/account/updateBalance/${email}/${newBalance}`;
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      
      if(data.email === email){
        setCurrentUser({...data});
        setDepositAmt(0);
        setSuccess(true);
      }
    })();
    
  }

  const handleAddition = () => {
    setSuccess(false);
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Make a Deposit:</h2>
        </div>
        <div className="card-body">
          <p className="card-text">Your current account balance is: <strong>${balance}</strong></p>
          {success ? 
            <>
            <p>You have successfully made your deposit. Thank you for using Bad Bank! For any of your additional banking needs, please select the desired action above.</p> 
            <button type="button" className="btn btn-dark" onClick={handleAddition}>Make Another Deposit</button>
            </>
            : 
            <form>
              <div className="mb-3">
                <label className="form-label">Enter Your Deposit Amount:</label>
                <input type="number" min="0" placeholder="Deposit Amount" className="form-control" onChange={handleChange} />
                {negError ? <p className="negative smallP">We can only accept positive number values for a deposit. If you wish to make a withdrawal, please go to the "Withdraw" section of the Bad Bank Website.</p> : <br /> }
                {btnDisable ? <button type="button" onClick={handleSubmit} className="btn btn-dark" disabled={true} >Make Deposit</button> : <button type="button" onClick={handleSubmit} className="btn btn-dark" disabled={false} >Make Deposit</button>}
              </div>            
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Deposit
