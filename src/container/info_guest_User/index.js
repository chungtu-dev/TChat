import React, { useLayoutEffect, useState, useEffect, Fragment } from 'react';
import {
  Text,
  SafeAreaView,
  Platform,
  Linking,
  Image,
  ImageBackground
} from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import styles from './styles';
import { InputField, ChatBox, ShowUsers, } from '../../component';
import firebase from '../../firebase/config';
import ImagePicker from 'react-native-image-picker';
import { senderMsg, recieverMsg } from '../../network/messeges';
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import { smallDeviceHeight } from '../../utility/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Card, CardItem, Left, Body, Thumbnail, View, Right } from "native-base";


const InfoGuestUser = ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText, guestUserId, currentUserId, time, email, phone, backgroundimg } = params;

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
              // backgroundimg: child.val().messege.backgroundimg,
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

  const clickToCall = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:$' + phone;
    }
    else {
      number = 'tel:$' + phone;
    }
    Linking.openURL(number);
  }

  return (

    <ImageBackground source={require("../../img/background2.jpg")}
      style={[globalStyle.flex1]}>
      <SafeAreaView>
        <View style={{ justifyContent: 'center', marginTop: 100, flex: 1,}}>
          <View style={[styles.infoImgBG]}>
            <View style={[styles.logoContainerBG]}>
              {backgroundimg ? (
                <Thumbnail source={{ uri: backgroundimg }} resizeMode="stretch" style={[styles.ThumbnailBG]} />
              ) : (
                  <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
                )}
            </View>
          </View>
        </View>

        {/* Ảnh đại diện người dùng khác */}
        <View style={{ justifyContent: 'center', marginTop:-100,}}>
          <View style={[styles.infoImg]}>

            <View style={[styles.logoContainer]}>
              {img ? (
                <Thumbnail source={{ uri: img }} resizeMode="cover" style={[styles.Thumbnail]} />
              ) : (
                  <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
                )}
            </View>

          </View>
        </View>


        <View style={{marginTop:-50}}>
          <View style={[styles.infoViewTxt]}>
            <View style={[styles.viewTxtInfo]}>
              <Text style={[styles.txtName]}>{name}</Text>
            </View>

            <View style={[styles.viewTxtInfo]}>
              <Text style={[styles.txtEmail]}>{email}</Text>
            </View>

            <View style={[styles.viewTxtInfo_Phone]}>
              <FontAwesome
                name="phone"
                size={20}
                color={'white'}
              ></FontAwesome>
              <Text>{'\t'}</Text>
              <Text style={[styles.txt, { color: '#FFCC00', }]} onPress={clickToCall}>{phone}</Text>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default InfoGuestUser;