import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import firebase from "../../Firebase/FirebaseConfig";
import User_Login_Screen from "../Auth/Login";
import { User_Auth } from "../../Navigation/NavigationScreen";

const User_Profile_Screen = (props) => {
  const [logOut, setLogOut] = useState(false);

  const [userList1, setUserList1] = useState([]);
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserName, setcurrentUserName] = useState("");
  const [isdelete, setIsDelete] = useState(false);
  let userList = [];

  const logout = () => {
    firebase.auth().signOut().then(props.navigation.navigate("Login"));
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .storage()
          .ref(`Profile/images/${user.uid}/${user.displayName}.jpg`)
          .getDownloadURL()
          .then((url) => setImage(url));
        console.log("USER=> ", user);
      } else {
        // props.navigation.navigate("Login");
        setLogOut(true);
        console.log("Logout");
      }
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .storage()
          .ref(`Profile/images/${user.uid}/${user.displayName}.jpg`)
          .getDownloadURL()
          .then((url) => setImage(url));
        console.log("Image URL=> ", image);
        setUserId(user.uid);
        setcurrentUserName(user.displayName);
      } else {
        console.log("Logout");
        props.navigation.navigate("Login");
      }
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // setUserId(user.uid);
        // setcurrentUserName(user.displayName);
        setIsLoading(false);
        console.log("User DisplayName=> ", user.displayName);
      } else {
        setUserId("");
        setUserList1([""]);
      }
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    var ref = firebase.database().ref("AddPost/");
    setIsLoading(true);
    console.log("UserID", userId);
    ref.on("value", (value) => {
      value.forEach((each) => {
        if (userId === each.val().postUserId) {
          userList.push({
            id: each.key,
            name: each.val().name,
            address: each.val().address,
            number: each.val().number,
            gender: each.val().gender.label,
            reason: each.val().reason,
            bloodGroup: each.val().bloodGroup.label,
            imageUrl: each.val().imageUrl,
            postUserName: each.val().postUserName,
            postUserId: each.val().postUserId,
          });
        }
      });
      setIsLoading(false);
      setUserList1(userList);
    });
  }, []);

  const deleteHandler = async (id) => {
    setIsLoading(true);
    const a = userList.filter().find(id);
    const delete_post = await firebase
      .database()
      .ref()
      .child(`AddPost/${id}`)
      .remove();
    setIsLoading(false);
    console.log(userList);
    setUserList1(userList);
    Alert.alert(a, "Deleted Successfully!", [{ text: "ok", style: "cancel" }]);
  };

  const Alert_ = (id) => {
    Alert.alert("Alert!", "Are you sure ?", [
      { text: "No" },
      // { text: "Yes", onPress: () => deleteHandler(id) },
    ]);
  };

  const login = () => {
    props.navigation.navigate("Login");
  };

  return (
    <ScrollView>
      {logOut ? (
        <View>
          <Text>Your are logout</Text>
          <Button title="login" onPress={() => login()} />
        </View>
      ) : (
        <View>
          <View style={styles.topLayout}>
            <View style={styles.logoutButton}>
              <Button
                title="Logout"
                onPress={() => {
                  logout();
                }}
              />
            </View>
            <View style={styles.profile}>
              <Image source={{ uri: image }} style={styles.image} />
              <Text>You: {currentUserName}</Text>
              <Text>UserId: {userId}</Text>
            </View>
          </View>

          <FlatList
            data={userList1}
            keyExtractor={(item) => item.id}
            renderItem={(items) => {
              return (
                <View>
                  <View style={styles.post}>
                    <View style={styles.image_name}>
                      <Image
                        source={{ uri: items.item.imageUrl }}
                        style={styles.image}
                      />
                      <Text>{items.item.postUserName} </Text>
                    </View>
                    <Text>Name: {items.item.name} </Text>
                    <Text>Address: {items.item.address} </Text>
                    <Text>Contact: {items.item.number} </Text>
                    <Text>Gender: {items.item.gender} </Text>
                    <Text>BloodGroup: {items.item.bloodGroup} </Text>
                    <Text>Reason"{items.item.reason} </Text>
                    <View style={styles.delete_button}>
                      <Button
                        title="delete"
                        // onPress={(id) => deleteHandler(items.item.id)}
                        onPress={(id) => deleteHandler(items.item.id)}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: "black",
    margin:10,
  },
  image_name: {
    flexDirection: "row",
    backgroundColor: "red",
  },
  post: {
    margin: 10,
    padding: 5,
    shadowOffset: { width: 1, height: 2 },
    backgroundColor: "white",
    elevation: 15,
    shadowOpacity: 1,
    shadowColor: "black",
    shadowRadius: 10,
  },
  delete_button: {
    alignItems: "flex-end",
    margin: 2,
  },
  logoutButton: {
    padding:2,
    marginRight: 0,
    borderRadius: 100,
  },
  topLayout:{
    flexDirection:'row-reverse',
    // margin:0,
    backgroundColor:'white',
    shadowOffset:{width:1,height:3},
    shadowColor:'black',
    shadowOpacity:1,
    elevation:10,
    shadowRadius:10,

  },
  profile:{
    margin:2,
  }
});

export default User_Profile_Screen;
