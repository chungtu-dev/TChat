import React, { useState, useContext } from 'react';
import {
    SafeAreaView, Text, View, KeyboardAvoidingView,
    TouchableWithoutFeedback, Platform, Keyboard, TouchableOpacity, Image,
} from 'react-native';
import { Logo, InputField, RoundCornerButton } from '../../component';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { LoginRequest } from '../../network';
import { setAsyncStorage, keys } from '../../asyncStorage';
import { setUniqueValue, keyboardVerticalOffset } from '../../utility/constants';
import { globalStyle } from '../../utility';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Login = ({ navigation }) => {

    //khai báo Loading
    //chạy loading chờ phản hồi từ Server
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    //Show Logo
    const [showLogo, toggleLogo] = useState(true);

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const { email, password } = credentials;

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

    onLoginPress = () => {
        if (!email) {
            alert('Email Sai');
        }
        else if (!password) {
            alert('Password Sai');
        }
        else {
            /* chạy Loading trước để kiểm tra dữ liệu được trả về từ 
            Server khi TextInput có dữ liệu nhập vào Email & Password*/
            dispatchLoaderAction({
                type: LOADING_START,
            });

            LoginRequest(email, password)
                .then((res) => {
                    if (!res.additionalUserInfo) {
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                        alert('Tài khoản đăng nhập sai');
                        return;
                    }
                    setAsyncStorage(keys.uuid, res.user.uid);
                    setUniqueValue(res.user.uid);
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    navigation.replace('Home');
                })
                .catch((err) => {
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                    alert(err);
                });

            // setTimeout(()=>{
            //     dispatchLoaderAction({
            //         type:LOADING_STOP,
            //     });
            // },2000)
            // 2000 là khoảng tgian tính bằng giây, chờ server phản hồi
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
                <SafeAreaView
                    style={[globalStyle.flex1, { backgroundColor: '#EEEEEE', marginTop:40 }]}>
                        {/* <Image source={(require("../../img/background1.jpg"))}
                    style={{ position: "absolute", bottom: -50, right: -225 }} /> */}
                    {
                        showLogo && (
                            <View style={[globalStyle.containerCentered]}>
                                <Logo />
                            </View>
                        )
                    }
                    <View style={[globalStyle.flex2, globalStyle.sectionCentered, { marginTop:100, marginLeft:20, marginRight:20, borderRadius:40}]}>

                        <InputField
                            placeholder='Email'
                            keyboardType='email'
                            value={email}
                            onChangeText={(text) => handleOnChange('email', text)}
                            onFocus={() => handleFocus()}
                            onBlur={() => handleBlur()}
                        />

                        <View style={{ flexDirection: 'row', left: 10 }}>
                            <InputField
                                placeholder='Mật khẩu'
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
                                            color={'black'}
                                            size={20}
                                        ></FontAwesome5>
                                        :
                                        <FontAwesome5
                                            name='eye-slash'
                                            color={'black'}
                                            size={20}
                                        ></FontAwesome5>
                                }
                            </TouchableOpacity>
                        </View>

                        <RoundCornerButton
                            title='Đăng nhập'
                            onPress={() => onLoginPress()} />

                        <View style={{ flexDirection: 'row', marginTop:30, }}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#009966',
                                }}
                                onPress={() => navigation.navigate('Signup')}>
                                Đăng kí tài khoản
                        </Text>
                        </View>

                    </View>
                    <View style={{marginTop:50,}}></View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;
