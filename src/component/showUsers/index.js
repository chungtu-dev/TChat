import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, View, Right } from "native-base";
import styles from "./styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ShowUsers = ({ name, img, onImgTap, onNameTap, email, phone, onGuestTap }) => {

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
            <Text style={styles.profileName} onPress={onNameTap}>
              {name}
              {email}
              {phone}
            </Text>
          </Body>
        </Left>
        <Right>
          <MaterialCommunityIcons
            name='information-variant'
            size={30}
            color={'#CCCC00'}
            style={{ left: 10, }}
            onPress={onGuestTap}
          ></MaterialCommunityIcons>     
        </Right>
      </CardItem>
    </Card>
  );
};

export default ShowUsers;
