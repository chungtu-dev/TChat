import { StyleSheet,Dimensions } from "react-native";
import { smallDeviceHeight } from "../../utility/constants";


const { height: deviceHeight} = Dimensions.get(
  "window"
);

const getDimensions = () =>{
  if(deviceHeight>smallDeviceHeight){
    return {
      height: 150,
      width: 180,
      borderRadius: 30,
      logoFontSize: 90,
    };
  }
  else {
    return {
      height: 120,
      width: 160,
      borderRadius: 20,
      logoFontSize: 70,
    };
  }
};

export default StyleSheet.create({
  logo: {
    height: getDimensions().height,
    width: getDimensions().width,
    borderRadius: getDimensions().borderRadius,
    backgroundColor: '#DDDDDD',
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'row',
  },
  T: {
    fontSize: 50,
    fontWeight: "bold",
    color: '#00CC33',
  },
  C: {
    fontSize: 50,
    fontWeight: "bold",
    color: '#FF9933',
  },
});

