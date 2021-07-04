import React, { useState, useContext, useLayoutEffect } from 'react';
import {
    SafeAreaView, Text, View, TouchableWithoutFeedback,
    KeyboardAvoidingView, Platform, Keyboard, Alert, TouchableOpacity, Image
} from 'react-native';
import { Logo, InputField, RoundCornerButton } from '../../component';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { SignUpRequest, AddUser } from '../../network';
import { setAsyncStorage, keys } from '../../asyncStorage';
import { setUniqueValue, keyboardVerticalOffset } from '../../utility/constants';
import firebase from '../../firebase/config';
import { globalStyle } from '../../utility';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Signup = ({ navigation }) => {

    //khai báo Loading
    //chạy loading chờ phản hồi từ Server
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    //Show Logo
    const [showLogo, toggleLogo] = useState(true);

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    const { name, email, password, confirmPassword, phone } = credentials;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MaterialCommunityIcons
                    name='arrow-left-bold'
                    size={40}
                    color={'#FF9900'}
                    style={{ left: 10, }}
                    onPress={() => navigation.goBack()}
                />
            ),
        });
    }, [navigation]);

    //show-hide password state
    const [data, setData] = useState({
        secureTextEntry: true,
    });

    const showPassword = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    onSignupPress = () => {
        if (!name) {
            alert('Tên Không Được Trống');
        }
        else if (!email) {
            alert('Email Sai');
        }
        else if (!password) {
            alert('Mật khẩu Sai');
        }
        else if (password !== confirmPassword) {
            alert('Mật Khẩu Nhập Lại Không Trùng Khớp');
        }
        else if (phone.length !== 3) {
            alert('Số Điện Thoại Không Hợp Lệ');
        }
        else {
            /* chạy Loading trước để kiểm tra dữ liệu được trả về từ 
            Server khi TextInput có dữ liệu nhập vào Email & Password*/
            dispatchLoaderAction({
                type: LOADING_START,
            });
            SignUpRequest(email, password)
                .then((res) => {
                    //kiểm tra user đăng kí đã có hay chưa
                    if (!res.additionalUserInfo) {
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                        Alert.alert('Thông Báo', 'Mật Khẩu Từ 6 Kí Tự', [
                            {
                                text: 'OK',
                            }
                        ], {
                            cancelable: false
                        })
                        return;
                    }
                    let uid = firebase.auth().currentUser.uid;
                    let profileImg = '';
                    let backgroundimg = '';
                    AddUser(name, email, uid, profileImg, phone, backgroundimg)
                        .then(() => {
                            setAsyncStorage(keys.uuid.uid);
                            setUniqueValue(uid);
                            dispatchLoaderAction({
                                type: LOADING_STOP,
                            });
                            Alert.alert('Thông báo', 'Đăng kí thành công');
                            navigation.replace('Login');
                        })
                        .catch((err) => {
                            dispatchLoaderAction({
                                type: LOADING_STOP,
                            });
                            alert(err);
                        })
                })

                .catch((err) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    alert(err);
                })
        }
    };

    const handleOnChange = (name, value) => {
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    //on focus
    const handleFocus = () => {
        setTimeout(() => {
            toggleLogo(false);
        }, 200);
    };

    //on blur
    const handleBlur = () => {
        setTimeout(() => {
            toggleLogo(true);
        }, 200);
    };

    return (
        console.disableYellowBox = true,
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[globalStyle.flex1, { backgroundColor: '#EEEEEE' }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                    {/* {
                        showLogo && (
                            <View style={[globalStyle.containerCentered]}>
                                <Logo />
                            </View>
                        )
                    } */}
                    {/* <Image source={(require("../../img/background1.jpg"))}
                    style={{ position: "absolute", bottom: -50, right: -225 }} /> */}
                    <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
                        <InputField
                            placeholder='Tên...'
                            value={name}
                            onChangeText={(text) => handleOnChange('name', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <InputField
                            placeholder='Email...'
                            keyboardType='email'
                            value={email}
                            onChangeText={(text) => handleOnChange('email', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <View style={{ flexDirection: 'row', left: 10 }}>
                            <InputField
                                placeholder='Mật khẩu...'
                                secureTextEntry={data.secureTextEntry ? true : false}
                                value={password}
                                onChangeText={(text) => handleOnChange('password', text)}
                                onFocus={() => handleFocus()}
                                onBlur={() => handleBlur()}
                            />
                            <TouchableOpacity
                                style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', right: 40, }}
                                onPress={showPassword}>
                                {
                                    data.secureTextEntry ?
                                        <FontAwesome5
                                            name='eye'
                                            color='black'
                                            size={20}
                                        ></FontAwesome5>
                                        :
                                        <FontAwesome5
                                            name='eye-slash'
                                            color='black'
                                            size={20}
                                        ></FontAwesome5>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', left: 10 }}>
                            <InputField
                                placeholder='Nhập lại mật khẩu...'
                                secureTextEntry={data.secureTextEntry ? true : false}
                                value={confirmPassword}
                                onChangeText={(text) => handleOnChange('confirmPassword', text)}
                                onFocus={() => handleFocus()}
                                onBlur={() => handleBlur()}
                            />
                            <TouchableOpacity
                                style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', right: 40, }}
                                onPress={showPassword}>
                                {
                                    data.secureTextEntry ?
                                        <FontAwesome5
                                            name='eye'
                                            color='black'
                                            size={20}
                                        ></FontAwesome5>
                                        :
                                        <FontAwesome5
                                            name='eye-slash'
                                            color='black'
                                            size={20}
                                        ></FontAwesome5>
                                }
                            </TouchableOpacity>
                        </View>

                        <InputField
                            placeholder='Số điện thoại...'
                            secureTextEntry={false}
                            value={phone}
                            onChangeText={(text) => handleOnChange('phone', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <RoundCornerButton
                            title='Đăng kí'
                            onPress={() => onSignupPress()} />

                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#009966',
                                }}
                                onPress={() => navigation.navigate('Login')}>
                                Đăng nhập
                        </Text>
                        </View>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Signup;