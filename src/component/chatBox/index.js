import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, CardItem } from "native-base";
import { deviceWidth } from "../../utility/styleHelper/appStyle";
import { uuid } from "../../utility/constants";
import styles from "./styles";
import { color } from "../../utility";

const ChatBox = ({ userId, msg, img, onImgTap, time }) => {
  let isCurrentUser = userId === uuid ? true : false;

  const Time = (time) => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + '' + d.getMonth() + '' + result;
    }
    return result;
  }

  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 10,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",        
      }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderRadius:20,
            backgroundColor: color.SILVER,
            borderBottomRightRadius:0,
            borderBottomLeftRadius:20,
          },
        ]}
      >
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ 
                  height: 200, 
                  width: deviceWidth / 2 ,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <Text
            style={[styles.chatTxt, isCurrentUser && { color: color.BLACK }]}
          >
            {msg}
          </Text>
        )}
      </View>
      <Text 
      //time chat
      style={{
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
        color: '#666666',
        fontSize: 13,
      }}>{Time(time)}</Text>
    </Card>
  );
};

export default ChatBox;
