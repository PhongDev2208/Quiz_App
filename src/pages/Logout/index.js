import { useEffect } from "react";
import { authen } from "../../action/authen";
import { deleteCookie } from "../../helper/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(authen(false))

      deleteCookie("id");
      deleteCookie("fullName");
      deleteCookie("email");
      deleteCookie("token");

      navigate("/login")
    },[])

  return (
    <>
    </>
  );
}
