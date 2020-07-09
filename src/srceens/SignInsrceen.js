import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignInsrceen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  // Nút đăng nhập fb
  async SignFb() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
      const credential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.log(error);
    }
  }
  // Nút đky
  SignIn = () => {
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Image
            style={{height: 30, width: 30, marginTop: 15}}
            source={require('../assets/images/chevron.png')}
          />
          <Text style={{fontSize: 20, color: '#FFFFFF'}}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.up}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../assets/images/user.png')}
          />
          <Text style={{fontSize: 23, color: '#FFFFFF'}}>USER</Text>
        </View>
        <View style={styles.down}>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.TextInput}
              textContentType="emailAddress"
              placeholder="Enter your Email"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
          </View>
          <View style={styles.TextInputContainer}>
            <TextInput
              style={styles.TextInput}
              textContentType="password"
              placeholder="Enter your Password"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
            />
          </View>
          <TouchableOpacity style={styles.btnSignIn} onPress={this.SignIn}>
            <Text style={{color: '#FFFFFF', fontSize: 27, textAlign: 'center'}}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue',
              height: 50,
              width: 100,
              borderRadius: 20,
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.SignFb}>
            <Icon name="facebook" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#627587',
  },
  up: {
    flex: 3,
    flexDirection: 'column',
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
  btnSignIn: {
    height: 50,
    width: 150,
    marginTop: 30,
    backgroundColor: '#2CCE08',
    borderRadius: 10,
  },
  btnSignUp: {
    alignItems: 'center',
    marginLeft: 320,
  },
});
