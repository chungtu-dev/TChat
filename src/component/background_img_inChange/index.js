import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from './style';
import { globalStyle, color } from "../../utility";

export default ({ name, onEditImgTapGB, backgroundimg, onImgTapBG }) => (

  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View style={{ position: 'absolute', }}>
      <TouchableOpacity onPress={onImgTapBG} activeOpacity={0.8}>
        {backgroundimg ? (
          <Image source={{ uri: backgroundimg }} style={styles.img} resizeMode="stretch" />
        ) : (
            <View
              style={[
                globalStyle.sectionCentered,
                styles.img,
                { backgroundColor: color.DARK_GRAY },
              ]}
            >
              {/* lấy kí tự đàu tiên của tên */}
              <Text style={styles.name}>{name.charAt(0)}</Text>
            </View>
          )}
      </TouchableOpacity>
      <View style={[globalStyle.sectionCentered, styles.editImgContainer,{flexDirection:'row', left:40}]}>
        <FontAwesome5
          name="image"
          size={20}
          onPress={onEditImgTapGB}
          color={color.SILVER}
        />
      </View>

    </View>
  </View>
);