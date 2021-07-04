import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default ({ logoStyle, logoTextStyle }) => (
  <View style={[styles.logo, logoStyle]}>
    {/* <Text style={[styles.N, logoTextStyle]}>N</Text>
    <Text style={[styles.G, logoTextStyle]}>G</Text>
    <Text style={[styles.N, logoTextStyle]}>N</Text> */}

    <Text style={[styles.T, logoTextStyle]}>T</Text>
    <Text style={[styles.C, logoTextStyle]}>Chat</Text>
  </View>
);