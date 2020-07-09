import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Group} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Welcomesrceen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.up}>
            <FontAwesome></FontAwesome>
            <TouchableOpacity>
              <Image
                style={{width: 50, height: 50, marginRight: 20}}
                source={require('../assets/images/facebook.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{width: 50, height: 50, marginLeft: 20}}
                source={require('../assets/images/google.png')}></Image>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.CoTK}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text> Đã có tài khoản? Đăng Nhập </Text>
            </TouchableOpacity>
          </View>
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
  },
  CoTK: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  up: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
