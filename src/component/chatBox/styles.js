import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  chatContainer: { 
    backgroundColor: color.GREEN_SKY, 
    borderRadius:20,
    borderBottomLeftRadius:0,
    marginLeft:5,
    marginRight:5,
  },
  chatTxt: {
    color: color.BLACK,
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "500",
    padding: 8,
  },
});
