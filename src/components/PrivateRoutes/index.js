import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function PrivateRoutes() {
  const navigate = useNavigate();
  const isLogin = useSelector(state => state.authenReducer);

  useEffect(() => {
      if(!isLogin) {
          navigate('/login')
      }
    })

  return(
    isLogin && <Outlet /> 
  ) 
}

export default PrivateRoutes;
