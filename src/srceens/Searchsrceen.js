import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Searchsrceen extends Component {
  render() {
    return (
      <View>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'center',
            color: 'blue',
            fontWeight: 'bold',
          }}>
          {' '}
          Tìm Kiếm{' '}
        </Text>
        <View style={styles.searchSection}>
          <Icon name={'ios-search'} size={50} style={styles.Iconsearch}></Icon>
          <TextInput
            style={styles.TextInput}
            placeholder="Tìm Kiếm"></TextInput>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  TextInput: {
    height: 50,
    width: 350,
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 6,
    fontSize: 23,
  },
  searchSection: {
    flexDirection: 'row',
  },
  Iconsearch: {
    marginRight: 15,
  },
});
