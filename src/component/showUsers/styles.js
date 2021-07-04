import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: color.WHITE,
    borderColor: color.WHITE,
    borderRadius:25,
  },
  cardItemStyle: {
    backgroundColor: color.WHITE,    
    borderRadius:50,
    height:65,    
  },

  logoContainer: {    
    height: 50,
    width: 50,
    borderColor: color.WHITE,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.DARK_GRAY,
  },
  thumbnailName: { fontSize: 30, color: color.WHITE, fontWeight: "bold" },
  profileName: { fontSize: 20, color: color.DARK_GRAY, fontWeight: "bold" },
});
