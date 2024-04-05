import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistratinScreen";
import { useRoute } from "@react-navigation/native";

const Auth = ({ navigation }) => {
  const route = useRoute();
  const loggedOut = route.params;
  const [toggleRegister, setToggleRegister] = useState(false);
  return (
    <>
      {!toggleRegister ? (
        <LoginScreen
          navigation={navigation}
          toggleRegister={setToggleRegister}
          loggedOut={loggedOut != undefined ? loggedOut.loggedOut : false}
        />
      ) : (
        <RegistrationScreen
          navigation={navigation}
          toggleRegister={setToggleRegister}
        />
      )}
    </>
  );
};

export default Auth;
