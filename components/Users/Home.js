import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import firebase from "../../Firebase/FirebaseConfig";
import RadioButtonRN from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PostItem from "../ConstantsItems/PostItem";

const Home_Screen = (props) => {
  const [image, setImage] = useState(null);
  const [logOut, setLogOut] = useState(false);
  const [a, setA] = useState(0);
  const [currentUserName, setcurrentUserName] = useState("");
  const [userList1, setUserList1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userList = [];

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setA(user.uid);
        setLogOut(true);
        firebase
          .storage()
          .ref(`Profile/images/${user.uid}/${user.displayName}.jpg`)
          .getDownloadURL()
          .then((url) => setImage(url));
        setcurrentUserName(user.displayName);
      } else {
        setLogOut(false);
        setImage("");
        setcurrentUserName("");
      }
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut();
    setImage("");
    setcurrentUserName("");
    setUserList1([""]);
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    var ref = firebase.database().ref("AddPost/");
    setIsLoading(true);
    ref.on("value", (value) => {
      value.forEach((each) => {
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
      });
      setIsLoading(false);
      setUserList1(userList);
    });
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: "center", marginTop: "50%" }}
          size={35}
          color="orange"
        />
      ) : (
        <View>
          <View style={styles.post}>
            <Text>You: {currentUserName}</Text>
            <Image source={{ uri: image }} style={styles.image} />
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
                  </View>
                </View>
              );
            }}
          />
          <Text>ID ===== {a}</Text>

          {/* <Button
          title="Get Uid"
          onPress={() => {
            // UID();
            // x();
          }}
        /> */}
          {logOut ? (
            <Button
              title="Logout"
              onPress={() => {
                logout();
              }}
            />
          ) : (
            <Text>You are logout</Text>
          )}
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
  },
  radioButtons: {
    borderRadius: 12,
    borderWidth: 10,
    borderColor: "black",
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
});

export default Home_Screen;
