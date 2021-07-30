import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import firebase from "../../Firebase/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";

const User_SignUp_Screen = (props) => {
  const [image, setImage] = useState(null);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const User_Signup = async () => {
    if (email === "" || password === "" || username === "") {
      Alert.alert("Error", "Enter valid input", [
        { text: "okay", style: "cancel" },
      ]);
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Error",
        "password lenght is too short, minimum 6 char required",
        [{ text: "Got it", style: "cancel" }]
      );
      return;
    }
    if (image === null) {
      Alert.alert("Error", "Please select profile photo!", [
        { text: "Okay", style: "cancel" },
      ]);
      return;
    }
    setIsLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().onAuthStateChanged((user) => {
          setIsLoading(false);
          const Uid = user.uid;
          user
            .updateProfile({
              displayName: username,
            })
            .then((user) => {
              UploadImage(image, Uid);
            });

          // const response = fetch(image);
          // const bloba = response.blob();
          // var ref = firebase.storage().ref().child(`Profile/images/${Uid}/`);
          // ref.put(bloba).catch((err) => alert(err));
          // if (ref) {
          // } else {
          //   alert("Something went wrong");
          // }
        });
        setIsLoading(false);
        props.navigation.navigate("Home");
      })
      .catch((err) => {
        setIsLoading(false);
        alert(err);
      });
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const UploadImage = async (uri, uid) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = await firebase
      .storage()
      .ref()
      .child(`Profile/images/${uid}/${username}.jpg`);
    ref.put(blob).catch((err) => alert(err));
    if (ref) {
      console.log(uid);
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <ScrollView>
      <View>
        {isLoading ? (
          <ActivityIndicator size={23} color="blue" />
        ) : (
          <View>
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Create new account here !</Text>
              </View>
              <View style={styles.imageContainer}>
                <Text>profile image</Text>
                <Image source={{ uri: image }} style={styles.image} />
              </View>

              <TextInput
                style={styles.user_input}
                value={username}
                onChangeText={(text) => setUserName(text)}
                placeholder="username"
              />
              <TextInput
                style={styles.user_input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="email"
              />
              <TextInput
                style={styles.user_input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="password"
              />
              <View style={styles.button}>
                <Button
                  title="choose image"
                  onPress={() => {
                    pickImage();
                  }}
                />
              </View>
              {isLoading ? (
                <ActivityIndicator size={15} color="red" />
              ) : (
                <View style={styles.button}>
                  <Button
                    title="Signup"
                    onPress={() => {
                      User_Signup();
                    }}
                  />
                </View>
              )}

              <View style={styles.button}>
                <Text style={{ color: "red" }}>Have account?</Text>
                <Button
                  title="Login here"
                  onPress={() => props.navigation.navigate("Login")}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    padding: 3,
    marginTop: "15%",
    alignContent: "center",
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 20,
    // overflow:'hidden',
    backgroundColor: "white",
  },
  user_input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    margin: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "black",
  },
  imageContainer: {
    alignItems: "center",
  },
  button: {
    margin: 10,
    width: 100,
    alignSelf: "center",
  },
  heading: {
    fontSize: 22,
    // padding:10,
    marginBottom: 10,
  },
  headingContainer: {
    alignItems: "center",
  },
});

export default User_SignUp_Screen;
