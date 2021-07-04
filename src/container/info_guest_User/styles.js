import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "75%",
    backgroundColor: color.GREY,
  },

  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: color.SILVER,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "29%",
  },

  logoContainerBG: {    
    height: 70,
    width: 70,
    borderColor: color.WHITE,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: color.DARK_GRAY,
    justifyContent:'center',
    alignItems:'center',
  },

  logoContainer: {    
    height: 20,
    width: 50,
    borderColor: color.WHITE,
    borderWidth: 80,
    borderRadius: 20,
    backgroundColor: color.DARK_GRAY,
    justifyContent:'center',
    alignItems:'center',
    marginTop:90,
  },

  infoImg:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:60,   
  },
  infoImgBG:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    borderColor:color.WHITE,
  },
  Thumbnail:{
    height:150,
    width: 150,
    borderRadius:80,
  },
  ThumbnailBG:{
    height:200,
    width: 400, 
    borderRadius:10,
  },
  infoViewTxt:{
    marginTop:100,
    justifyContent:'center',
    alignItems:'center',
  },
  viewTxtInfo:{
    marginTop:5,
    justifyContent:'center',
    height:50,
    borderRadius:10,
    marginLeft:10,
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0,
  },
  viewTxtInfo_Phone:{
    marginTop:10,
    justifyContent:'center',
    flexDirection:'row',
    height:50,
  },
  txt:{
    color:'white',
    fontWeight:'bold',
    fontSize:15,
  },
  txtName:{
    color:'white',
    fontWeight:'bold',
    fontSize:20,
  },
  txtEmail:{
    color:'white',
    fontWeight:'bold',
    fontSize:13,
  },
  thumbnailName: { fontSize: 30, color: color.WHITE, fontWeight: "bold" },
});
