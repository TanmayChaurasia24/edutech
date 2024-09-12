import React from "react";
import { useAuth } from "../lib/AuthContext";

type Props = {};

const Signout = (props: Props) => {
  const { logout } = useAuth();

  return (
    <div>
      <button className="" onClick={logout}>Signout</button>
    </div>
  );
};

export default Signout;
