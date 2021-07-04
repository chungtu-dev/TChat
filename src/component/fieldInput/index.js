import React from "react";
import { StyleSheet } from "react-native";
import { Item, Input } from "native-base";

const FieldInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onFocus,
  onBlur,
  ref,
  onSubmitEditing,
  getRef,
}) => {
  return (
    <Item floatingLabel style={styles.inputContainer}>
      <Input
        placeholder={placeholder}
        placeholderTextColor='white'
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType={"next"}
        ref={ref}
        getRef={getRef}
        onSubmitEditing={onSubmitEditing}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#AAAAAA',
    borderBottomWidth: 0,
    height: 50,
  },

  input: {
    paddingLeft: 16,
    color: 'white',
    position: "absolute",
    top: 0,
    width: "100%",
  },
});

export default FieldInput;
