import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
// import { globalStyle } from "../../utility";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ name, email, phone }) => (
  <View>
    <View style={{ flexDirection: 'row', }}>
      <Text>{'\t'}</Text>
      <MaterialCommunityIcons
        name='tag'
        size={22}
      ></MaterialCommunityIcons>
      <Text style={styles.Text}>Tên:</Text>
    </View>
    <Text style={styles.InfoText}>{name}</Text>
    <View style={styles.Line}></View>

    <View style={{ flexDirection: 'row', }}>
      <Text>{'\t'}</Text>
      <MaterialCommunityIcons
        name='email'
        size={22}
      ></MaterialCommunityIcons>
      <Text style={styles.Text}>Email:</Text>
    </View>
    <Text style={styles.InfoText}>{email}</Text>
    <View style={styles.Line}></View>

    <View style={{ flexDirection: 'row', }}>
      <Text>{'\t'}</Text>
      <MaterialCommunityIcons
        name='phone'
        size={22}
      ></MaterialCommunityIcons>
      <Text style={styles.Text}>Số điện thoại:</Text>
    </View>
    <Text style={styles.InfoText}>{phone}</Text>
    <View style={styles.Line}></View>
  </View>
);
