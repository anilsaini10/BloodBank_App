import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import firebase from "../../Firebase/FirebaseConfig";
import RadioButtonRN from "radio-buttons-react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Add_Post_Screen = (props) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState(null);
  const [bloodGroup, setBloodGroup] = useState(null);
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [gender, setGender] = useState("");
  const [quary, setQuery] = useState("");
  const [image, setImage] = useState("");
  const [postUserName, setPostUserName] = useState("");
  const [postUserId, setPostUserId] = useState("");

  const [logOut, setLogOut] = useState(false);

  const Blood_group = [
    {
      label: "A+",
      // accessibilityLabel: "Your label",
    },
    {
      label: "A-",
      // accessibilityLabel: "Your label",
    },
    {
      label: "B-",
      // accessibilityLabel: "Your label",
    },
    {
      label: "B+",
      // accessibilityLabel: "Your label",
    },
    {
      label: "O-",
      // accessibilityLabel: "Your label",
    },
    {
      label: "O+",
      // accessibilityLabel: "Your label",
    },
  ];

  const Gender = [
    {
      label: "Male",
      // accessibilityLabel: "male",
    },
    {
      label: "Female",
      // accessibilityLabel: "female",
    },
    {
      label: "Transgender",
      // accessibilityLabel: "transgender",
    },
  ];

  const UID = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .storage()
          .ref(`Profile/images/${user.uid}/${user.displayName}.jpg`)
          .getDownloadURL()
          .then((url) => setImage(url));
        setPostUserName(user.displayName), setPostUserId(user.uid);
        console.log("ajjjjjjjjjjjjjjjjj;l", image, postUserName, postUserId);
      } else {
        alert(err);
      }
    });
  };

  const Add_Post_Handler = async () => {
    const a = firebase.database().ref().child("AddPost");
    await UID();
      await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      firebase
      .storage()
      .ref(`Profile/images/${user.uid}/${user.displayName}.jpg`)
      .getDownloadURL()
      .then((url) => setImage(url));
      }
    })

    const r = a.push({
      name: name,
      number: mobileNumber,
      bloodGroup: bloodGroup,
      address: address,
      gender: gender,
      reason: reason,
      imageUrl: image,
      postUserName: postUserName,
      postUserId: postUserId,
    });

  };

  // const a = () => {
  //   var ref = firebase.database().ref("AddPost/");

  //   ref.on("value", (value) => {
  //     value.forEach((each) => {
  //       console.log(each.val());
  //     });
  //   });
  // };

  return (
    <ScrollView>
      <Text style={styles.title}>Name</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.user_input}
          placeholder="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <Text style={styles.title}>Gender</Text>
      <View style={styles.input}>
        <RadioButtonRN
          data={Gender}
          selectedBtn={(e) => setGender(e)}
          style={styles.radioButtons}
          icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
        />
      </View>
      <Text style={styles.title}>Contact</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.user_input}
          placeholder="contact"
          value={mobileNumber}
          keyboardType="numeric"
          onChangeText={(text) => setMobileNumber(text)}
        />
      </View>
      <Text style={styles.title}>Blood goup</Text>
      <View style={styles.input}>
        <RadioButtonRN
          data={Blood_group}
          selectedBtn={(e) => setBloodGroup(e)}
          style={styles.radioButtons}
          // icon={<Icon name="check-circle" size={25} color="#2c9dd1" />}
        />
      </View>
      <Text style={styles.title}>Address</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.user_input}
          placeholder="address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      <Text style={styles.title}>Why you need ?</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.user_input}
          placeholder="reason"
          value={reason}
          onChangeText={(text) => setReason(text)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.user_input}
          placeholder="any quary"
          value={quary}
          onChangeText={(text) => setQuery(text)}
        />
      </View>

      <View>
        <Button
          title="submit"
          onPress={() => {
            // UID();
            Add_Post_Handler();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  radioButtons: {
    margin: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
  },
  input: {
    margin: 10,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "red",
    elevation: 10,
    opacity: 1,
    backgroundColor: "white",
  },
  user_input: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 50,
  },
  title: {
    marginLeft: 10,
    padding: 5,
  },
});

export default Add_Post_Screen;
