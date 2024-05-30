import { Outlet, Navigate } from "react-router-dom";



export default function Private() {
  const authData = localStorage.getItem('auth') || sessionStorage.getItem('auth');


  return (authData )? <Outlet /> : <Navigate to={"/signin"} />;
}