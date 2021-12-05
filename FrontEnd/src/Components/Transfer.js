import { useState } from 'react';

const Transfer = ({ currentUser, setCurrentUser }) => {

  const [ transferAmt, setTransferAmt ] = useState(0);
  const [ transferEmail, setTransferEmail ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ warnOverdraft, setWarnOverdraft ] = useState(false);
  const [ btnDisable, setBtnDisable ] = useState(true);
  const [ negError, setNegError ] = useState(false);
  const [ transError, setTransError ] = useState(false);
  
  const handleNewTransfer = () => {
    setTransferAmt(0);
    setTransferEmail('');
    setEmailError(false);
    setSuccess(false);
    setWarnOverdraft(false);
    setBtnDisable(true);
    setNegError(false);
    setTransError(false);
  }

  const updateTransferBalance = (transBalance) => {
    let newBalance = Number(transBalance) + Number(transferAmt);
    return newBalance
  }

  const updateBalance = () => {
    let newBalance = Number(currentUser.balance) - Number(transferAmt);
    if(newBalance <= 0){
      setWarnOverdraft(true);
    }
    return newBalance;
  }

  const handleChange = (e) => {
    let validated = false;

    if(e.target.id === 'amount'){
      setTransferAmt(e.target.value);
      
      if(warnOverdraft) setWarnOverdraft(false);
      if(e.target.value > 0 && transferEmail !== '') {
          setBtnDisable(false);
      }

      if (e.target.value <= 0){
        setBtnDisable(true);
        setNegError(true);
      } else {
        setNegError(false);
      }
    } 
    
    if (e.target.id === 'transferEmail'){
      setTransferEmail(e.target.value);
      if(e.target.value !== '' && negError === false && transferAmt > 0){
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
    
  }

  const handleSubmit = () => {
    const email = currentUser.email;
    const newBalance = updateBalance();
    if (newBalance < 0) {
      setWarnOverdraft(true);
      alert('You are attempting to transfer more money than is available in your account. We cannot perform your transfer request at this time. Please adjust the amount you wish to transfer to a number that is less than or equal to your current balance.');
      return;
    } else {
      const transEmail = transferEmail.toLowerCase();
      const userUrl  = `/account/checkUser/${transEmail}`
      const balanceUrl = `/account/updateBalance/${email}/${newBalance}`;
      
      (async () => {
        
        //check for transfer email in users
        const res = await fetch(userUrl);
        const transUser = await res.json();

        //if transfer recipient does not have bad bank account or wrong e-mail address
        if(transUser === null){
          alert('The user you are attempting to send money to does not have a Bad Bank account. At this time our bank cannot transfer money to those who bank elsewhere. We apologize for any inconvenience.');
        }
        
        if(transUser && newBalance >= 0){
          //debit transfer amount from currentUser account
          const res = await fetch(balanceUrl);
          const updatedCurrentUser = await res.json();
    
          if(updatedCurrentUser){
            setCurrentUser({...currentUser, balance: newBalance });  
            //deposit transfer amount to transfer account
            const newTransBalance = updateTransferBalance(transUser.balance);
            const transBalanceUrl = `/account/updateBalance/${transUser.email}/${newTransBalance}`;
            (async () => {
              const res = await fetch(transBalanceUrl);
              const data = await res.json();
      
              if(data.email === transUser.email){
                setTransferAmt(0);
                setSuccess(true);
              }
            })();
          }
        } else {
          //will update page to note there was an error and no funds transfer occurred
          setTransError(true);
        }
        
      })();
      
    }
    
  }

  

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Transfer Money to Another Bad Bank Customer</h2>
        </div>
        <div className="card-body">
        {transError ? 
          <>
            <p><strong>An error has occurred during the transfer process. Typical errors could include attempting to send money to an e-mail address that is not connected to a current Bad Bank account holder, or attempting to transfer a higher amount of money than currently exists in your Bad Bank account. Please check your balance information or note any alert messages you have received during your transfer request process to best determine the issue you are experiencing. If you would like to attempt the transfer again, click the button below.</strong></p>
            <button type="button" onClick={handleNewTransfer} className="btn btn-dark">New Transfer Request</button>
          </>
        : 
          <>
          <p className="card-text">Your current account balance is: <strong>${currentUser.balance}</strong></p>
          {(success === true) ? 
            <>
            <p className="card-text">Congratulations, you have successfully transferred funds to another Bad Bank account holder. If you would like to make additional transfers of funds, please click the button below.</p>
            <button type="button" onClick={handleNewTransfer} className="btn btn-dark">New Transfer Request</button>
            </>
            : 
            <>
              <h4>Please fill out this form to transfer money to another Bad Bank account holder.</h4> 
              <p className="card-text">Please note, you will not be able to submit the form without first providing the e-mail address of the account holder and the amount you wish to transfer to their account. You will need to use the official e-mail address associated with the individual's account to be able to transfer funds.</p>
              <form>
                <div className="mb-3">
                  <label className="form-label">Transfer Recipient Account Holder's E-mail Address: </label><br />
                  <input type="text" placeholder="Recipient Email Address" id="transferEmail" onChange={handleChange} className="form-control" />
                  {emailError ? <p className="negative smallP">You must enter an email address to submit the form.</p> : null }
                  <label className="form-label">Enter Your Transfer Amount:</label>
                  <input type="number" min="0" placeholder="Transfer Amount" className="form-control" onChange={handleChange} id="amount" /> 
                  {negError ? <p className="negative smallP">We can only accept positive number values for a transfer. If you wish to receive money from another Bad Bank account holder, they will need to initiate the transfer of funds to your account.</p> : <br />}
                  {btnDisable ? <button type="button" disabled={true} onClick={handleSubmit} className="btn btn-dark">Transfer Money</button> : <button type="button" disabled={false} onClick={handleSubmit} className="btn btn-dark">Transfer Money</button>}
                  
                </div>
              </form>
            </>
          }
          </>
        }
        </div>           
      </div>
    </div>
  )
}

export default Transfer
