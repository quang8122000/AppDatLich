import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import auth from '@react-native-firebase/auth';
export default class Loading extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         email: '',
  //         uid: ''
  //     }
  // }
  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        this.props.navigation.navigate('Home', {uid: user.uid});
        //console.log("User ID :- ", user.uid);
      } else {
        this.props.navigation.navigate('SignIn');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={{color: '#e93766', fontSize: 40}}>Loading</Text>
        <ActivityIndicator color="#e93766" size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
