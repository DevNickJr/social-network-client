import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

// import Loader from "../Loader";

export default function AuthHOC(
  ProtectedComponent: React.FC<any>,
) {
  //
  return function AuthComp(props: any) {

    const user = useAuthContext()


    if (!user?.isLoggedIn) {
      return (
        <div className='flex items-center justify-center w-screen h-screen'>
         Loading
        </div>
      );
    }

    return <ProtectedComponent user={user} {...props} />;
  };
}