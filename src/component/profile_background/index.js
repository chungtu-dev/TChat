import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { globalStyle, color } from "../../utility";

export default ({ name, backgroundimg, onImgTapBG }) => (
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
      </View>
    </View>
  );