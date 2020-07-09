import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Searchsrceen from './src/srceens/Searchsrceen';
import Homesrceen from './src/srceens/Homesrceen';
import Welcomesrceen from './src/srceens/Welcomesrceen';
import SignInsrceen from './src/srceens/SignInsrceen';
import Signupsrceen from './src/srceens/Signupsrceen';
import Usersrceen from './src/srceens/Usersrceen';
import Loading from './src/srceens/Loading';
import Datesrceen from './src/srceens/Datesrceen';

const Tack = createMaterialBottomTabNavigator(
  {
    HomeSrceen: {
      screen: Homesrceen,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              color: '#FFFDFD',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            Home
          </Text>
        ),
        tabBarIcon: ({tintColor, focused}) => {
          if (focused) {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/home1.png')}></Image>
            );
          } else {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/home.png')}></Image>
            );
          }
        },
      },
    },
    SearchSrceen: {
      screen: Searchsrceen,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              color: '#FFFDFD',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            Search
          </Text>
        ),
        tabBarIcon: ({tintColor, focused}) => {
          if (focused) {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/noti1.png')}></Image>
            );
          } else {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/noti.png')}></Image>
            );
          }
        },
      },
    },
    DateScreen: {
      screen: Datesrceen,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              color: '#FFFDFD',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            Date
          </Text>
        ),
        tabBarIcon: ({tintColor, focused}) => {
          if (focused) {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/calendar1.png')}></Image>
            );
          } else {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/calendar.png')}></Image>
            );
          }
        },
      },
    },
    Usersrceen: {
      screen: Usersrceen,
      navigationOptions: {
        tabBarLabel: (
          <Text
            style={{
              color: '#FFFDFD',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            Me
          </Text>
        ),
        tabBarIcon: ({tintColor, focused}) => {
          if (focused) {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/user1.png')}></Image>
            );
          } else {
            return (
              <Image
                style={{width: 20, height: 20}}
                source={require('./src/assets/images/user.png')}></Image>
            );
          }
        },
      },
    },
  },

  {
    initialRouteName: 'HomeSrceen',
    barStyle: {
      backgroundColor: '#7CC50B',
      height: 60,
    },
  },
);
const AuthStack = createStackNavigator({
  Welcomesrceen: {
    screen: Welcomesrceen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignIn: {
    screen: SignInsrceen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp: {
    screen: Signupsrceen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Tack,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const stackNavigator = createSwitchNavigator({
  Load: {
    screen: Loading,
    navigationOptions: {
      headerShown: false,
    },
  },
  Welcome: {
    screen: AuthStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Tack,
    navigationOptions: {
      headerShown: false,
    },
  },
});
export default createAppContainer(stackNavigator);
