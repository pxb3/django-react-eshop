import { Outlet, Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const Layout = () => {

    const navigate = useNavigate();

    const [searchedItem, setSearchedItem] = useState("");

    const handleSubmit = (event) => {

        navigate( `/items/${searchedItem}` )
    };

    const { user, logoutUser } = useContext(AuthContext);


  return (
    <>

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={ "/"} className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Items
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><Link to={ "/items"} className="dropdown-item" >Cpu</Link></li>
                <li><Link to={ "/"} className="dropdown-item disabled" >Gpu</Link></li>
                <li><Link to={ "/"} className="dropdown-item disabled" >Ram</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div className ="row bg-light text-dark" >

        <div className ="col-2">
            <Link to={ "/"}>
                <h1>Xr Shop</h1>
            </Link>
        </div>

        <div className ="col-5 p-2">
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className ="w-100 rounded-pill"
                        type="text"
                        value={searchedItem}
                        onChange={(e) => setSearchedItem(e.target.value)}
                    />
                </form>
            </div>
        </div>

        <div className ="col-4">
            {user==null ? (
              <div>
                <Link to={ "/logOrSign"}>
                  <h1>Login/Sign Up</h1>
                </Link>
              </div>
            ) : (
              <div>
                <p>{ user.username }</p>
                <button onClick={logoutUser}>Logout</button>
              </div>
            )}

        </div>

        <div className ="col-1">
            <Link to={ "/cart"}>
                <BsCart2 size={42}/>
            </Link>
        </div>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;
