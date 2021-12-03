const AllData = ({ users }) => {
  
  const dataList = users.map(user => {
      return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.balance}</td>
      </tr>
      )
  });
  
  
  
  return (
    <div className="card">
      <div className="card-header">
        <h2>All User Data</h2>
        </div>
        { users ? 
          <div className="tableDiv">
            <table className="table table-striped table-hover ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {dataList}
              </tbody>
            </table>
          </div> 
          : 
          <h4>No user data currently available.</h4>}
    </div>
  )
}

export default AllData
