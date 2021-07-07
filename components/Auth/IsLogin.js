import React, { useEffect }  from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import firebase from '../../Firebase/FirebaseConfig';


const IS_User_Login_Screen = (props) => {

    function Is_User_Login() {
        return(
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                props.navigation.navigate('Home')
            }else{
                props.navigation.navigate('Login');
            }
        })
        );
    }

    return (
        <View>
            <Text>isLoading</Text>
            <Is_User_Login/>
            {/* <Button title="Check" onPress={() => {Is_User_Login()}} /> */}
        </View>
    )
}

export default IS_User_Login_Screen;