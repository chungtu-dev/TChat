import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import { globalStyle, color } from "../../utility";

export default ({ img, name, onImgTap, onEditImgTap, onEditImgTapGB, backgroundimg, onImgTapBG }) => (
  <View style={[globalStyle.sectionCentered, styles.container]}>
    <View
      // style={styles.imgContainer}
      style={{ flexDirection: 'column' }}
    >

      <View style={{position:'relative'}}>
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
        <View style={[globalStyle.sectionCentered, styles.editImgContainer]}>
          <FontAwesome5
            name="user-edit"
            size={20}
            onPress={onEditImgTapGB}
            color={color.GREEN}
          />
        </View>
      </View>
{/* ---------------------------------------------------------------- */}
      <View style={{position:'relative'}}>
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
        <View style={[globalStyle.sectionCentered, styles.editImgContainer]}>
          <FontAwesome5
            name="user-edit"
            size={20}
            onPress={onEditImgTap}
            color={color.RED}
          />
        </View>
      </View>

    </View>
    {/* <Text style={styles.welcome}>Tên: {name}</Text> */}
  </View>
);
