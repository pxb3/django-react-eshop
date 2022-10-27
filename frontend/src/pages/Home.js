import { Link } from "react-router-dom";

const Home = () => {

  return (

    <div className ="container-fluid">

        <div className ="row mt-5">
            <h1>PRODUCT CATEGORIES</h1>
        </div>

        <div className ="row">
            <div className = "col">
                <Link to={ "/items"} className="dropdown-item" >
                    <img src="/images/cpus.jpeg" width="200" height="200" alt="cpu err"></img>
                    <h1>Cpu</h1>
                </Link>
            </div>
            <div className = "col">
                <img src="/images/gpus.jpeg" width="200" height="200" alt="gpu err"></img>
                <h1>Gpu</h1>
            </div>
            <div className = "col">
                <img src="/images/ram.jpeg" width="200" height="200" alt="ram err"></img>
                <h1>Ram</h1>
            </div>
        </div>

    </div>


  );
};

export default Home;
