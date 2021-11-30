import BBLogo from './Images/BBLogo.png';

const Home = () => {
  return (
    <div className="card">
      <img src={BBLogo} className="card-img-top" alt="Bad Bank Logo"/>
      <div className="card-body">
        <h2 className="card-title">Bad Bank Home</h2>
        <p className="card-text">We would like to welcome you to Bad Bank! We're not a very good bank, because we lack any security measures. You probably definitely should not trust us with your money or banking needs.</p>
      </div>
    </div>
  )
}

export default Home
