import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import firebase from "../../Firebase/FirebaseConfig";

const User_Login_Screen = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoading(true);
      if (user) {
        props.navigation.navigate("Home");
        setIsLoading(false);
      }
      setIsLoading(false);
    });
  }, []);
  const login = () => {
    if (email === "" || password === "") {
      Alert.alert("Error Occured", "enter valid email or password", [
        { text: "Got it", style: "cancel" },
      ]);
    }
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        props.navigation.navigate("Home");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err);
      });
  };


  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={20} />
      ) : (
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Signin</Text>
          </View>
          <TextInput
            style={styles.user_input}
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
          />
          <TextInput
            style={styles.user_input}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholder="password"
          />
          {isLoading ? (
            <ActivityIndicator size={15} color="red" />
          ) : (
            <View style={styles.button}>
              <Button title="Login" onPress={login} />
            </View>
          )}

          <Text style={{ color: "red" }}>Don't have account?</Text>
          <View style={styles.button}>
            <Button
              onPress={() => props.navigation.navigate("SignUp")}
              title="signup"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    padding: 50,
    marginTop: "30%",
    alignContent: "center",
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 8,
    // overflow:'hidden',
    backgroundColor: "white",
  },
  user_input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  image: {
    width: 250,
    height: 250,
  },
  button: {
    margin: 10,
    width: 100,
    alignSelf: "center",
  },
  heading: {
    fontSize: 22,
    // padding:10,
    marginTop: 0,
  },
  headingContainer: {
    alignItems: "center",
  },
});

export default User_Login_Screen;
