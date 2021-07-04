import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';

export default ({
    placeholder,
    inputStyle,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    value,
    onSubmitEditing,
    onBlur,
    onFocus,
    numberOfLines,
}) => (
    <TextInput
    style={[styles.input ,inputStyle]}
    value={value}
    numberOfLines={numberOfLines}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    placeholderTextColor={
        placeholderTextColor ? placeholderTextColor: 'white'
    }
    onSubmitEditing={onSubmitEditing}
    onBlur={onBlur}
    onFocus={onFocus}
    ></TextInput>
);