import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const isLogin = useSelector((state) => state.authenReducer);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to="/">
            <img
              src="https://quizizz.com/wf/assets/62fa6419161d3a641f681ceb_Logo.svg"
              alt="Logo"
            />
          </Link>
        </div>

        <ul className="header__menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/topics">Topics</NavLink>
          </li>

          <li>
            <NavLink to="/answers">Answers</NavLink>
          </li>
        </ul>

        <ul className="header__auth">
          {!isLogin ? (
            <>
              <li>
                <NavLink className="header__auth-button separator" to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="header__auth-button" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="header__auth-button" to="/logout">
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer>
        <div className="container">
          <div className="footer__icons">
            <Link
              to="https://www.facebook.com/domon2208/"
              target="_blank"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/thanhphongluong/"
              target="_blank"
            >
              <i className="fa-brands fa-twitter"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/thanhphongluong/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/thanhphongluong/"
              target="_blank"
            >
              <i className="fa-solid fa-wifi"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/thanhphongluong/"
              target="_blank"
            >
              <i className="fa-solid fa-basketball"></i>
            </Link>
          </div>
          <div className="footer__copyright">
            COPYRIGHT © 2020 DOMON COMPANY - DESIGN: PHONGDEV
          </div>
        </div>
      </footer>
    </>
  );
}

export default LayoutDefault;
