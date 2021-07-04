import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default ({ name }) => (
  <View style={{flexDirection:'row'}}>
    <FontAwesome5
    name='user-tag'
    size={30}
    color={'#FF9900'}
    style={{marginLeft:10}}
    ></FontAwesome5>
    <Text style={styles.NameText}>{name}</Text>
  </View>
);
