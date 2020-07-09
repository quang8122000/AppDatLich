import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import database from '@react-native-firebase/database';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
//import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import auth from '@react-native-firebase/auth';

export default class Homesrceen extends Component {
  state = {
    isModalVisible: false,
    dataImages: null,
    name: '',
    link: '',
    Stt: '',
    currId: '',
    email: '',
    date: '',
    time: '',
    curItem: null,
    uid: '',
    dateNow: '',
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  UNSAFE_componentWillMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          uid: user.uid,
        });
        // console.log(user.uid)
        //console.log("User ID :- ", user.uid);
      }
    });
  }

  componentDidMount() {
    var today = new Date();
    var aDate =
      today.getDate() +
      '-' +
      parseInt(today.getMonth() + 1) +
      '-' +
      today.getFullYear();
    aDate = moment().format('YYYY-MM-DD');
    // this.setState({
    //   dateNow: aDate,
    // });
    if (this.state.date == '') {
      this.setState({
        date: aDate,
      });
    }
    this.ReadLink();
  }
  async ReadLink() {
    // Create a reference
    const ref = database().ref('/images');
    // Fetch the data snpashot

    ref.on('value', snapshot => {
      this.setState({dataImages: Object.entries(snapshot.val())});
    });
    const snapshot = await ref.once('value');
    console.log('Images data: ', Object.entries(snapshot.val()));
  }
  // Khi nhấn add cart thì mình sẽ đẩy dữ liệu lên firebase với dữ liệu mình đã gán trước đó
  // Gồm: curItem nó là 1 phần từ đã chọn trong cái mảng sản phẩm mình vừa bôi đen
  AddCart = () => {
    //Create a reference
    let item = this.state.curItem[1];
    //Giờ mình đẩy những thứ mình cần lên thôi.
    const ref = database()
      .ref('/Cart')
      .child(this.state.uid);
    ref.push({
      time: this.state.time,
      name: item.name,
      link: item.link,
      date: this.state.date,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            textAlign: 'auto',
            fontWeight: 'bold',
            color: '#0F55E3',
          }}>
          {' '}
          Trang Chủ{' '}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name={'star'} size={25} color={'#DEF306'}>
            {' '}
          </Icon>
          <Text style={{fontSize: 20, textAlign: 'auto', fontWeight: 'bold'}}>
            {' '}
            Top Hairstyles for men :
          </Text>
        </View>
        <FlatList
          data={this.state.dataImages}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={
                () =>
                  this.setState({
                    link: item[1].link,
                    name: item[1].name,
                    Stt: item[1],
                    currId: item[0],
                  }) //Chỗ này thật ra kh4ng cần. Cái chỗ này chỉ 0ể ngơời ta click vào nó chuyển qua trang chi tiết th4i
              }>
              <View style={styles.item}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    left: 5,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}
                  source={{uri: item[1].link}}
                />
                <View style={styles.text}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginLeft: 15,
                      color: '#03E903',
                    }}>
                    {item[1].name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: 'red',
                      marginLeft: 30,
                    }}>
                    {item[1].Stt}
                  </Text>
                  <TouchableOpacity
                    style={styles.btnAdd}
                    onPress={() => {
                      // Ở đây mình tạo 1 state tên là curItem để gán cái dữ liệu của thằng sản phẩm vừa chọn
                      // sau khi gán xong thì nó sẽ thực hiện chạy hàm toggleModal
                      this.setState({curItem: item}, () => this.toggleModal());
                    }}>
                    <Image
                      style={{width: 50, height: 50}}
                      source={require('../assets/images/add.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
        />
        {/* Sau khi chạy toggleModal thì modal này sẽ hiện lên */}
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              width: 300,
              height: 250,
              backgroundColor: '#E3DEDE',
              justifyContent: 'center',
              marginLeft: 45,
              borderRadius: 10,
            }}>
            <Text
              style={{fontSize: 23, fontWeight: 'bold', textAlign: 'center'}}>
              Đặt Lịch thôi !
            </Text>

            <View
              style={{
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 15,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginRight: 10,
                  marginLeft: 10,
                }}>
                Date :{' '}
              </Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={date => {
                  this.setState({date: date});
                }}
                // ... Sau khi chọn ngày xong thì state date là lưu ngày đã chọn sẽ có giá trị
              />
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: 5,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginRight: 10,
                  marginLeft: 5,
                }}>
                Time :{' '}
              </Text>
              <DatePicker
                style={{width: 200}}
                time={this.state.time}
                mode="time"
                format="hh:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={time => {
                  this.setState({time: time});
                }}
                // ... Sau khi chọn ngày xong thì state date là lưu ngày đã chọn sẽ có giá trị
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{marginLeft: 10}}>
                <TouchableOpacity style={styles.button} onPress={this.AddCart}>
                  <Text style={styles.text}> Đặt</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 10}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.toggleModal}>
                  <Text style={styles.text}> Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    height: 120,
    flexDirection: 'row',
    marginTop: 15,
    backgroundColor: '#E3DEDE',
    borderRadius: 20,
  },
  btnAdd: {
    flex: 1,
    marginLeft: 200,
    justifyContent: 'center',
    bottom: 35,
  },
  button: {
    marginTop: 15,
    display: 'flex',
    height: 50,
    width: 100,
    alignSelf: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: {height: 10, width: 0},
    shadowRadius: 20,
  },

  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
});
