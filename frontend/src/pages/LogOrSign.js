import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const LogOrSign = () => {

  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login </h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter Username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>

      <div>
        <Link to={ "/register"}>
          <h1>Register</h1>
        </Link>
      </div>
    </div>
  );
};

export default LogOrSign;
