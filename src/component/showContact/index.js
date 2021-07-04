import React from "react";
import { Text, TouchableOpacity, Alert, Platform, Linking } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, View } from "native-base";
import styles from "./styles";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShowContact = ({ name, img, onImgTap, onNameTap, phone, email }) => {

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
    <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} resizeMode="cover" />
            ) : (
                <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
              )}
          </TouchableOpacity>

          <Text>{'\t'}</Text>
          <View style={{ borderLeftWidth: 1, borderBottomWidth: 50, }}></View>

          <Body>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name='user'
                color={'#009966'}
                size={15}
                style={{ top: 5 }}
              ></FontAwesome>
              <Text>{'\t'}</Text>
              <Text style={styles.profileName}>
                {name}
              </Text>
            </View>

            <View style={{ flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name='email'
                color={'#CC9966'}
                size={15}
                style={{ top: 5 }}
              ></MaterialCommunityIcons>
              <Text>{'\t'}</Text>
              <Text style={styles.profileName}>
                {email}
              </Text>
            </View>

            <View style={{ borderBottomWidth: 2, padding: 3, borderColor: '#BBBBBB' }}></View>

            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name='phone'
                color={'#993366'}
                size={15}
                style={{ top: 5 }}
              ></FontAwesome>

              <Text>{'\t'}</Text>
              <Text style={styles.numberContact} onPress={clickToCall}>
                {phone}
              </Text>
            </View>

          </Body>
        </Left>
      </CardItem>
    </Card>
  );
};

export default ShowContact;
