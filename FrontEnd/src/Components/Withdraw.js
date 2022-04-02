import { useState, useContext } from 'react';
import { UserContext } from '../App';

const Withdraw = ({ setCurrentUser }) => {
  const [ withdrawalAmt, setWithdrawalAmt ] = useState(0);
  const [ success, setSuccess ] = useState(false);
  const [ warnOverdraft, setWarnOverdraft ] = useState(false);
  const [ btnDisable, setBtnDisable ] = useState(true);
  const [ negError, setNegError ] = useState(false);

  const user = useContext(UserContext);
  const balance = user.balance;

  const handleChange = (e) => {
    setWithdrawalAmt(e.target.value);
    
    if(warnOverdraft) setWarnOverdraft(false);
    if(e.target.value !== null || undefined || '') {
      setBtnDisable(false);
    }
    if(e.target.value === ''){
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
    let newBalance = Number(balance) - Number(withdrawalAmt);
    if(newBalance <= 0){
      setWarnOverdraft(true);
    }
    return newBalance;
  }

  const handleSubmit = () => {
    const email = user.email;
    
    const newBalance = updateBalance();
    if (newBalance < 0) {
      setWarnOverdraft(true);
      return;
    } else {
      const url = `/account/updateBalance/${email}/${newBalance}`;
      (async () => {
        const res = await fetch(url);
        const data = await res.json();
        
        if(data.email === email){
          setCurrentUser({...data});
          setWithdrawalAmt(0);
          setSuccess(true);
          sessionStorage.setItem('balance', `${newBalance}`);
        }
      })();
    }
    
  }

  const handleAddition = () => {
    setSuccess(false);
  }

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Make a Withdrawal:</h2>
        </div>
        <div className="card-body">
          <p className="card-text">Your current account balance is: <strong>${balance}</strong></p>
          {warnOverdraft === true ? <p className="negative">You cannot make the requested withdraw as you have insufficient funds for that amount. <br /> Please revise the requested amount below, or deposit sufficient funds prior to withdrawal.</p> : null}
          {success ? 
            <>
            <p>You have successfully made your withdrawal. Thank you for using Bad Bank! For any of your additional banking needs, please select the desired action above.</p> 
            <button type="button" className="btn btn-dark" onClick={handleAddition}>Make Another Withdrawal</button>
            </>
            : 
            <form>
              <div className="mb-3">
                <label className="form-label">Enter Your Withdrawal Amount:</label>
                <input type="number" min="0" placeholder="Withdrawal Amount" className="form-control" onChange={handleChange} /> 
                {negError ? <p className="negative smallP">We can only accept positive number values for a withdrawal. If you wish to make a deposit, please go to the "Deposit" section of the Bad Bank Website.</p> : <br />}
                {btnDisable ? <button type="button" onClick={handleSubmit} className="btn btn-dark" disabled={true} >Withdraw Cash</button> : <button type="button" onClick={handleSubmit} className="btn btn-dark" disabled={false} >Withdraw Cash</button>}
              </div>            
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Withdraw
