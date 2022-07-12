import React, { Fragment, useContext } from "react";
import Create from "../Components/Create/Create";
import { AuthContext } from "../Contexts/AuthContext";
import Login from "../Pages/Login";

const CreatePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      {user ? (<Create />) : (<> {alert("You must login first")} <Login /> </> )}
    </Fragment>
  );
};

export default CreatePage;