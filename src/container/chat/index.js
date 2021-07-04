import React, { useLayoutEffect, useState, useEffect, Fragment } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import styles from './styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InputField, ChatBox, ShowUsers } from '../../component';
import firebase from '../../firebase/config';
import ImagePicker from 'react-native-image-picker';
import { senderMsg, recieverMsg } from '../../network/messeges';
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import { smallDeviceHeight } from '../../utility/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Chat = ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText, guestUserId, currentUserId, time, email } = params;

  //message
  const [msgValue, setMsgValue] = useState('');
  const [messeges, setMesseges] = useState([]);


  //layout header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome5
          name='arrow-circle-left'
          size={30}
          color={'#FF9900'}
          style={{ left: 10, }}
          onPress={() => navigation.replace('Home')}
        />
      ),
      headerTitle:
        <Text style={{ color: 'white' }}>{name}</Text>,
    });
  }, [navigation]);

  useEffect(() => {
    try {
      firebase
        .database()
        .ref('messeges')
        .child(currentUserId)
        .child(guestUserId)
        .on('value', (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            msgs.push({
              time: child.val().messege.time,
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              img: child.val().messege.img,
            });
          });
          setMesseges(msgs.reverse());//sắp xếp tin nhắn đúng thứ tự
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleSend = () => {
    setMsgValue('');
    if (msgValue) {
      //user send
      senderMsg(msgValue, currentUserId, guestUserId, '')
        .then(() => { })
        .catch((err) => alert(err));

      // guest user
      recieverMsg(msgValue, currentUserId, guestUserId, '')
        .then(() => { })
        .catch((err) => alert(err));
    }
  };

  const handleCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancel image picker');
        alert('Image canceled');
      }
      else if (response.error) {
        console.log('Image picker error', response.error);
        alert('Image picker error');
      }
      else {
        // Base 64
        let source = 'data:image/jpeg;base64,' + response.data;
        //user send
        senderMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => { })
          .catch((err) => alert(err));

        // guest user
        recieverMsg(msgValue, currentUserId, guestUserId, source)
          .then(() => { })
          .catch((err) => alert(err));

      }
    })
  }
  const handleOnChange = (text) => {
    setMsgValue(text);
  };

  //img tap
  const imgTap = (chatImg) => {
    navigation.navigate('ShowFullImg', { name, img: chatImg });
  };

  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.WHITE }]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[globalStyle.flex1, { backgroundColor: color.WHITE }]}
      >

        <TouchableWithoutFeedback
          style={[globalStyle.flex1]}
          onPress={Keyboard.dismiss}
        >

          <Fragment>
            <FlatList
              inverted
              data={messeges}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (

                <View>
                  <ChatBox
                    time={item.time}
                    msg={item.msg}
                    userId={item.sendBy}
                    img={item.img}
                    onImgTap={() => imgTap(item.img)}
                  />
                </View>
              )}
            />

            {/* send message views */}
            <View style={styles.sendMessageContainer}>
            <MaterialIcon
                name='camera'
                color={color.SILVER}
                size={appStyle.fieldHeight}
                onPress={() => handleCamera()}
              ></MaterialIcon>

              <InputField
                placeholder="Nhập nội dung..."
                numberOfLines={10}
                inputStyle={styles.input}
                value={msgValue}
                onChangeText={(text) => handleOnChange(text)}
              />              

              <MaterialIcon
                name='send-circle'
                color={color.GRADIENT_PRIMARY}
                size={appStyle.fieldHeight}
                onPress={() => handleSend()}
              ></MaterialIcon>
            </View>
          </Fragment>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;