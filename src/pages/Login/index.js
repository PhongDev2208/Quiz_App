import { authen } from "../../action/authen";
import { login } from "../../services/userService";
import { setCookie } from "../../helper/cookie";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubMit = async (e) => {
        e.preventDefault()

        let email = e.target.elements.email.value
        let password = e.target.elements.password.value

        const respond = await login(email,password)
        if(respond.length !== 0) {
            const {id, fullName, email, token} = respond[0];
    
            setCookie("id",id,1);
            setCookie("fullName",fullName,1);
            setCookie("email",email,1);
            setCookie("token",token,1);

            dispatch(authen(true))
            navigate("/")
        } else {
          alert("The email or password you entered is incorrect!")
        }
    }

  return (
    <>
      <div className="container">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubMit}>
            <div className="user-box">
              <input type="email" name="email" required />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" required />
              <label>Password</label>
            </div>
            <button>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
