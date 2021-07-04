import React from "react";
import { Image, View, Text,TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import { globalStyle, color } from "../../utility";

export default ({ img, name, onImgTap }) => (
  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={onImgTap} activeOpacity={0.8}>
        {img ? (
          <Image source={{ uri: img }} style={styles.img} resizeMode="cover" />
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
    </View>
  </View>
);
