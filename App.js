import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Main_Bottom_Navigator from "./Navigation/NavigationScreen";
import firebase from "./Firebase/FirebaseConfig";
import { User_Auth } from "./Navigation/NavigationScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function App(props) {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
     firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } 

    });
  }, []);

  return ( 
    // <Main_Bottom_Navigator/>
    <NavigationContainer>
    { isLogin ? <Main_Bottom_Navigator/> : 
        <User_Auth />
    }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
