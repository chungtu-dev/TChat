import { StyleSheet } from "react-native";
import {appStyle} from '../../utility';

export default StyleSheet.create({
  input: {
    paddingLeft: 16,
    backgroundColor: '#AAAAAA',
    width: '90%',
    color: 'black',
    height: appStyle.fieldHeight,
    alignSelf: "center",
    marginVertical: appStyle.fieldMarginVertical,
    fontSize: 16,
    borderRadius:20,
  },
});
