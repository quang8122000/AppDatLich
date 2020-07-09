import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class Usersrceen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
  // Kiểm tra tài khoản
  componentWillMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        this.setState({
          email: user.email,
        });
        //console.log("User ID :- ", user.uid);
      }
    });
  }
  // Đăng xuất tài khoản
  signOutUser = async () => {
    try {
      await auth().signOut();
      //this.props.navigation.navigate('SignIn');
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View style={styles.Container}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'blue',
          }}>
          {' '}
          Người Dùng{' '}
        </Text>
        <View style={styles.Logout}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Tài Khoản : </Text>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            {this.state.email}
          </Text>
        </View>
        <TouchableOpacity onPress={this.signOutUser} style={styles.btnLogout}>
          <Text style={{color: '#FFFFFF', fontSize: 23}}>Đăng Xuẩt</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  Logout: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnLogout: {
    backgroundColor: '#868687',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    borderRadius: 50,
  },
});
