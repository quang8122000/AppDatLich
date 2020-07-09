import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default class Datesrceen extends Component {
  state = {
    name: '',
    date: '',
    time: '',
    link: '',
    dataCart: null,
    uid: '',
    currId: '',
  };
  componentDidMount() {
    this.ReadData();
  }
  // delete card from firebase
  async deleteCard(id) {
    let user = auth().currentUser;
    console.log('currId: ' + id);
    const ref = database().ref('/Cart/' + user.uid + '/' + id);
    await ref.remove();
  }
// read data form firebase
  async ReadData() {
    let user = auth().currentUser;
    this.unsubscribe = database()
      .ref(`/Cart/${user.uid}`) // <=> 'Cart' + user.uid
      .on('value', snapshot => {
        let items = [];
        console.log(snapshot.val());

        if (snapshot) {
          snapshot.forEach(element => {
            let item = {
              _key: element.key,
              name: element.val().name,
              date: element.val().date,
              time: element.val().time,
              link: element.val().link,
            };
            items.push(item);
          });
        }
        this.setState({dataCart: items});
      });
    console.log(user.uid);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.up}>
          <Text style={{fontSize: 30, color: 'blue', fontWeight: 'bold'}}>
            {' '}
            Lịch Cắt{' '}
          </Text>
        </View>
        <View style={styles.down}>
          <FlatList
            data={this.state.dataCart}
            renderItem={({item}) => {
              console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => this.deleteCard(item._key)}

                  // onPress={() =>
                  //   this.setState({
                  //     date: item.date,
                  //     name: item.name,
                  //     time: item.time,
                  //     currId: item._key,
                  //     link: item.link,
                  //   })
                  // }
                >
                  <View style={styles.item}>
                    <View style={styles.text}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 25,
                          color: 'black',
                        }}>
                        Name :
                      </Text>

                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 25,
                          color: '#03E903',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={styles.text}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 25,
                          color: 'black',
                        }}>
                        Date :
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 25,
                          color: 'red',
                        }}>
                        {item.date}
                      </Text>
                    </View>
                    <View style={styles.text}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 25,
                          color: 'black',
                        }}>
                        Time :
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 25,
                          color: 'red',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.key}></FlatList>
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
    alignItems: 'center',
  },
  up: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  down: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'column',
    marginTop: 10,
    flex: 1,
    height: 120,
    width: 300,
    justifyContent: 'center',
    backgroundColor: '#E3DEDE',
    borderRadius: 20,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
