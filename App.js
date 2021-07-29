import * as React from 'react';
import { Image, ImagePickerIOS, StyleSheet,View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { responsiveWidth, responsiveHeight, responsiveFontSize }
  from 'react-native-responsive-dimensions';
  import {Feather } from '@expo/vector-icons';
import Login from './Screens/Auth/Login'
import ResetPassword from './Screens/Auth/ResetPassword'
import Authloadingcheck from './Screens/Authloadingcheck'
import AuthLoading from './Screens/AuthLoading'
import selectorganization from './Screens/Auth/selectorganization'
import Profile from './Screens/Profile/Profile'
import Home from './Screens/Home'
import TicketComments from './Screens/TicketsDetail/TicketComments'
import TicketDetail from './Screens/TicketsDetail/TicketDetail'
import Notification from  './Screens/Notification/Notification'
const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();
const AppTabNavigator = createBottomTabNavigator();
const OverViewStack = createStackNavigator();
const Main = () => {
  return (

    <MainStack.Navigator 
    initialRouteName="AuthNavigator" 
    screenOptions={{ headerShown: false, gestureEnabled: true }} >
      <MainStack.Screen name="Tab" component={Tab} />
      <MainStack.Screen name="selectorganization" component={selectorganization} />
      <MainStack.Screen name="AuthNavigator" component={AuthNavigator} />  
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="ConstTicketDetail" component={ConstTicketDetail} />
    </MainStack.Navigator>
  );

}


Main.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.key > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};
const AuthNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Authloadingcheck" screenOptions={{ headerShown: false, gestureEnabled: false }} >
      <MainStack.Screen name="Authloadingcheck" component={Authloadingcheck} />
      <MainStack.Screen name="AuthLoading" component={AuthLoading} />
      <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  );
}


const ConstTicketDetail = () => {
  return (
    <MainStack.Navigator initialRouteName="TicketDetail" 
    screenOptions={{ headerShown: false, gestureEnabled: false }} >
      <MainStack.Screen name="TicketDetail" component={TicketDetail} />
      <MainStack.Screen name="TicketComments" component={TicketComments} />
    </MainStack.Navigator>
  );
}
// const Search = () => {
//   return (
//     <MainStack.Navigator initialRouteName="SearchScreen" screenOptions={{ headerShown: false, gestureEnabled: false }} >
//       <MainStack.Screen name="SearchScreen" component={SearchScreen} />
//       <MainStack.Screen name="SearchResult" component={SearchResult} />
//     </MainStack.Navigator>
//   );
// }

// const ProfileView = () => {
//   return (
//     <MainStack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false, gestureEnabled: false }} >
//       <MainStack.Screen name="Profile" component={Profile} />
//       <MainStack.Screen name="Settings" component={Settings} />
//       <MainStack.Screen name="EditInfo" component={EditInfo} />
//     </MainStack.Navigator>
//   );
// }

const Tab = () => {
  return (
    <AppTabNavigator.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
        } else if (route.name === 'Profile') {
          iconName = focused ? 'bell-outline' : 'bell-outline';
        } else if (route.name === '') {
          iconName = focused ? 'plus-box-outline' : 'plus-box-outline';
          size = focused ? 40 : 40
        }
        else if (route.name === 'Home') {
          iconName = focused ? 'history' : 'history';
        }
        return <MaterialCommunityIcons name={iconName} size={size} color={color} backgroundColor={'blue'} />
      },

    })}
      tabBarOptions={{
        tabStyle: {
          //backgroundColor: 'blue',
        },
        showLabel: true,
        activeTintColor: '#2D3134',
        inactiveTintColor: '#C6CEDD',
        labelStyle: {
          fontSize: responsiveFontSize(1.5),
          //marginTop:responsiveHeight(1),
        },
        style: {
          backgroundColor: 'white',
          alignItems: 'center',
          //height: 85,
        },
      }}
    >
      <AppTabNavigator.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              focused?(
                <Image
                source={require("./assets/AppIcons/HomeGreen.png")}
                style={styles.iconHomeFoucsed}
              />
              ):(
                <Image style={styles.home} source={require('./assets/AppIcons/Home.png')} ></Image>
              )
            );
          },
        }}
      />
      <AppTabNavigator.Screen name="Tickets" component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              focused?(
                <Image
                source={require("./assets/AppIcons/TIcketGreen.png")}
                style={styles.iconHomeFoucsed}
              />
              ):(
             
                <Image
                 source={require("./assets/AppIcons/TicketLight.png")}
                 style={styles.home}
                />
              
              )
            );
          },
        }}
      />
      <AppTabNavigator.Screen name=" " component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              // focused?(
              //   <Image
              //   source={require("./assets/Close.png")}
              //   style={styles.iconHomeFoucsed}
              // />
              // ):(
                <View style={{ 
                  marginTop:responsiveHeight(1),
                  backgroundColor: '#438170', 
                  borderRadius: 25, width: 50, height: 50, justifyContent: 'center', }}>
                <Feather name="plus" size={30} color="white"  style={{alignSelf:'center'}}/>
              </View>
              //  )
            );
          },
        }}
      />
      <AppTabNavigator.Screen name="Notifications" component={Notification}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              focused?(
                <Image
                source={require("./assets/NotificationGreen.png")}
                style={styles.iconHomeFoucsed}
              />
              ):(    
                <Image
                 source={require("./assets/Notification.png")}
                  style={styles.home}
                />
             
              )
            );
          },
        }}
      />
       <AppTabNavigator.Screen name="Settings" component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              focused?(
                <Image
                source={require("./assets/AppIcons/Settingsgreen.png")}
                style={styles.iconHomeFoucsed}
              />
              ):(
                
                <Image
                 source={require("./assets/AppIcons/Settingslight.png")}
                  style={styles.home}
                />
             
              )
            );
          },
        }}
      />

    </AppTabNavigator.Navigator >


  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main"
        edgeWidth={0}
        statusBarAnimation={'slide'}
        hideStatusBar={false}
        drawerStyle={{
          backgroundColor: '#fff',
          width: responsiveWidth(70),
          borderTopRightRadius: 5,
        }}>
        <Drawer.Screen name="Main" component={Main} />
        {/* <Drawer.Screen name="TabBar" component={TabBar} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  icon: {
    aspectRatio: 1,
    height: '120%',
    marginTop: responsiveWidth(2)
  },
  iconCalender:{
    alignSelf:'center',
  },
  home:{
    width:25,
    height:25,
  },
  iconHomeFoucsed:{
    width:30,
    height:30,
  },
})