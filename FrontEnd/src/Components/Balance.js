import { useContext } from "react";
import { UserContext } from "../App";

const Balance = () => {

  const user = useContext(UserContext);
  const balance = user.balance;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>Your Current Balance</h2>
        </div>
        <div className="card-body">
          <p className="card-text"><strong>${balance}</strong></p>
          {balance <= 0 ? <p className="negative">You need to deposit funds before making any withdrawals.</p>: <p>Welcome, {user.name}! Do you want to make a deposit or withdrawal today? If so--just select the correct action above.</p>}
        </div>
      </div>
    </div>
  )
}

export default Balance
