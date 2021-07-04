import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { globalStyle, color } from "../../utility";

export default ({ img, name, onImgTap }) => (
  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View style={{ position: 'relative' }}>
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
              <Text style={styles.name}>{name.charAt(0)}</Text>
            </View>
          )}
      </TouchableOpacity>
    </View>
  </View>
);
