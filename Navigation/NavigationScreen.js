import React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IS_User_Login_Screen from '../components/Auth/IsLogin';
import User_Login_Screen from '../components/Auth/Login';
import User_SignUp_Screen from '../components/Auth/signUp';
import Home_Screen from '../components/Users/Home';
import { HeaderButton, Item, Header } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Add_Post_Screen from '../components/Users/AddPostScreen';
import User_Profile_Screen from '../components/Users/UserProfile';  




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Bottom_Tab = createBottomTabNavigator();




export const User_Auth = (props) => {
    return(
    <Stack.Navigator>
        {/* <Stack.Screen name = "isuserlogin" component ={IS_User_Login_Screen}/> */}
        <Stack.Screen name = "Login" component ={User_Login_Screen}/>
        <Stack.Screen name = "SignUp" component ={User_SignUp_Screen}/>
    </Stack.Navigator>
    )
};


const User_SignUP = (props) => {
    return (
    <Stack.Navigator>
        <Stack.Screen name = "SignUp" component ={User_SignUp_Screen}/>
    </Stack.Navigator>
    )
};

const Add_Post = (props) => {
    return (
    <Stack.Navigator>
        <Stack.Screen name = "AddPost" component ={Add_Post_Screen}/>
    </Stack.Navigator>
    )
};

const User_Profile = (props) => {
    return (
    <Stack.Navigator>
        <Stack.Screen name = "UserProfile" component ={User_Profile_Screen}/>
    </Stack.Navigator>
    )
};

const Home = (props) => {
    return (
    <Stack.Navigator>
        <Stack.Screen name = "Home" component ={Home_Screen} options={{
          headerLeft: () => (
              <View>
                  <Ionicons
                    onPress={() => alert("Menu pressed")}
                  name='md-menu'
                    title="Info"
                    color="black"
                    size={35}
                  />
              </View>
          ),
        }}/>
    </Stack.Navigator>
    )
};

const Main_Bottom_Navigator = ({navigation}) => {
    return(
    // <NavigationContainer>
    // </NavigationContainer>
        <Bottom_Tab.Navigator>
            <Bottom_Tab.Screen  name="List" component={Main_Drawer_Navigator}/>
            <Bottom_Tab.Screen  name="AddPost" component={Add_Post}/>
            <Bottom_Tab.Screen name="profile" component={User_Profile}/>

        </Bottom_Tab.Navigator>
    )
};

const Main_Drawer_Navigator = ()  => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}/> 
            <Drawer.Screen  name="Login" component={User_Auth}/>
        </Drawer.Navigator>
    )
}

export default Main_Bottom_Navigator;




