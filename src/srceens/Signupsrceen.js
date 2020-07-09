import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
export default class Signupsrceen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password1: '',
    };
  }

  SignIn = () => {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        console.log(data.user.uid);
        database()
          .ref('/Users')
          .child(data.user.uid)
          .set({email: this.state.email});
        //this.props.navigation.navigate('SignIn');
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.conatainer}>
        <View style={styles.up}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/images/signin.png')}></Image>
          <Text style={{fontSize: 23, color: '#FFFFFF'}}>ADD USER</Text>
        </View>
        <View style={styles.down}>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.TextInput}
              textContentType="emailAddress"
              placeholder="Enter your new USER"
              onChangeText={email => this.setState({email})}
              value={this.state.email}></TextInput>
          </View>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.TextInput}
              textContentType="password"
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
              value={this.state.password}></TextInput>
          </View>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.TextInput}
              textContentType="password"
              placeholder="Enter your password again"
              secureTextEntry={true}
              value={this.state.password1}
              onChangeText={password1 =>
                this.setState({password1})
              }></TextInput>
          </View>
          <TouchableOpacity style={styles.btnSignUp}>
            <Text
              onPress={this.SignIn}
              style={{color: '#FFFFFF', fontSize: 27, textAlign: 'center'}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#627587',
  },
  up: {
    marginTop: 65,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  down: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  TextInputContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  TextInput: {
    height: 55,
    width: 350,
  },
  btnSignUp: {
    height: 50,
    width: 150,
    marginTop: 30,
    backgroundColor: '#2CCE08',
    borderRadius: 10,
  },
});
