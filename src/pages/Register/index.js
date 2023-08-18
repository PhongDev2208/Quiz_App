import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helper/generateToken";
import { checkExistEmail, register } from "../../services/userService";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = e.target.elements.email.value;
    let password = e.target.elements.password.value;
    let fullName = e.target.elements.fullName.value;

    const existEmail = await checkExistEmail(email);
    if (existEmail.length === 0) {
      const options = {
        fullName,
        email,
        password,
        token: generateToken(),
      };

      const respond = await register(options);

      if (respond) {
        navigate("/login");
      } else {
      alert("Registration unsuccessful!");
      }
    } else {
      alert("The email was in existence.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="form-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input type="text" name="fullName" required />
              <label>Full Name</label>
            </div>
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
