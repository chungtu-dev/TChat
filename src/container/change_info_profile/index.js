import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Profile, Profile_Name, RoundCornerButton, InputField, Profile_Name_inSelect, Profile_Img_inSelect, Background_Img_inChange, Profile_Img_inChange } from '../../component';
import { SafeAreaView, View, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, } from 'react-native';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { uuid, keyboardVerticalOffset } from '../../utility/constants';
import { globalStyle } from '../../utility';
import ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../../firebase/config';
import { UpdateUserPhone, UpdateUser, UpdateUserName, UpdateUserBackgroundImg } from '../../network';

const ChangeInfoProfile = ({ navigation }) => {

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        email: '',
        profileImg: '',
        phone: '',
        backgroundimg: '',
    });

    const { name, profileImg, email, phone, backgroundimg } = userDetail;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome5
                    name='arrow-circle-left'
                    size={30}
                    color={'#FF9900'}
                    style={{ left: 10, }}
                    onPress={() => navigation.replace('ProfileScreen')}
                />
            ),
        });
    }, [navigation]);

    useEffect(() => {
        dispatchLoaderAction({
            type: LOADING_START,
        });
        try {
            firebase
                .database()
                .ref('users')
                .on('value', (dataSnapshot) => {
                    let users = [];
                    let currentUser = {
                        id: '',
                        name: '',
                        email: '',
                        profileImg: '',
                        phone: '',
                        backgroundimg: '',
                    }
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.email = child.val().email;
                            currentUser.profileImg = child.val().profileImg;
                            currentUser.phone = child.val().phone;
                            currentUser.backgroundimg = child.val().backgroundimg;
                        }
                        else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                email: child.val().email,
                                profileImg: child.val().profileImg,
                                phone: child.val().phone,
                                backgroundimg: child.val().backgroundimg,
                            });
                        }
                    });
                    setUserDetail(currentUser);
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                });
        } catch (error) {
            dispatchLoaderAction({
                type: LOADING_STOP,
            });
            alert(error)
        }
    }, []);

    // edit img profile
    const selectPhotoTapped = () => {
        const options = {
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancel image picker');
            }
            else if (response.error) {
                console.log('Image picker error', response.error);
                alert('Image picker cancel');
            }
            else {
                // Base 64
                let source = 'data:image/jpeg;base64,' + response.data;
                dispatchLoaderAction({
                    type: LOADING_START
                });
                UpdateUser(uuid, source)
                    .then(() => {
                        setUserDetail({
                            ...userDetail,
                            profileImg: source,
                        });
                        dispatchLoaderAction({
                            type: LOADING_STOP
                        });
                    })
                    .catch((err) => {
                        dispatchLoaderAction({
                            type: LOADING_STOP
                        });
                        alert(err);
                    })
            }
        })
    }
    // edit background img profile
    const selectPhotoTappedBG = () => {
        const options = {
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancel image picker');
            }
            else if (response.error) {
                console.log('Image picker error', response.error);
                alert('Image picker cancel');
            }
            else {
                // Base 64                    
                let source = 'data:image/jpeg;base64,' + response.data;
                dispatchLoaderAction({
                    type: LOADING_START
                });
                UpdateUserBackgroundImg(uuid, source)
                    .then(() => {
                        setUserDetail({
                            ...userDetail,
                            backgroundimg: source,
                        });
                        dispatchLoaderAction({
                            type: LOADING_STOP
                        });
                    })
                    .catch((err) => {
                        dispatchLoaderAction({
                            type: LOADING_STOP
                        });
                        alert(err);
                    })
            }
        })
    }

    //show full img profile
    const imgTap = (profileImg, name) => {
        if (!profileImg) {
            navigation.navigate('ShowFullImg', {
                name,
                imgText: name.charAt(0),
            });
        } else {
            navigation.navigate('ShowFullImg', {
                name,
                img: profileImg,
            });
        }
    };

    // * handle on change name
    const handleOnChangeName = (name, value) => {
        setUserDetail({
            ...userDetail,
            [name]: value,
        });
    };

    // * handle on change phone
    const handleOnChangePhone = (phone, value) => {
        setUserDetail({
            ...userDetail,
            [phone]: value,
        });
    };

    //change name
    const onchangeName = () => {
        Keyboard.dismiss();
        if (!name) {
            Alert.alert('Thông báo', 'Tên không được rỗng');
        }
        else {
            let namechanged = name;
            dispatchLoaderAction({
                type: LOADING_START,
            });
            UpdateUserName(uuid, namechanged)
                .then(() => {
                    setUserDetail({
                        ...userDetail,
                        name: namechanged,
                    });
                    Alert.alert('Thông báo', 'Thay đổi TÊN thành công');
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                })
                .catch(() => {
                    alert(err);
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                });
        }
    };

    //change phone
    const onchangePhone = () => {
        Keyboard.dismiss();
        if (!name) {
            Alert.alert('Thông báo', 'Sđt không được rỗng');
        }
        else {
            let phonechanged = phone;
            dispatchLoaderAction({
                type: LOADING_START,
            });
            UpdateUserPhone(uuid, phonechanged)
                .then(() => {
                    setUserDetail({
                        ...userDetail,
                        phone: phonechanged,
                    });
                    Alert.alert('Thông báo', 'Thay đổi SĐT thành công');
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                })
                .catch(() => {
                    alert(err);
                    dispatchLoaderAction({
                        type: LOADING_STOP,
                    });
                });
        }
    };

    // * ON INPUT FOCUS
    const handleFocus = () => {
        setTimeout(() => {
        }, 200);
    };
    // * ON INPUT BLUR
    const handleBlur = () => {
        setTimeout(() => {
        }, 200);
    };

    return (
        console.disableYellowBox = true,
        <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[globalStyle.flex1, { backgroundColor: '#EEEEEE' }]}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>

                    <View>
                        <Background_Img_inChange
                            backgroundimg={backgroundimg}
                            name={name}
                            onEditImgTapGB={() => selectPhotoTappedBG()}
                            onImgTapBG={() => imgTap(backgroundimg, name)}
                        />
                        <Profile_Img_inChange
                            img={profileImg}
                            name={name}
                            onEditImgTap={() => selectPhotoTapped()}
                            onImgTap={() => imgTap(profileImg, name)}
                        />
                    </View>

                    <InputField
                        placeholder="Tên..."
                        value={name}
                        onChangeText={(text) => handleOnChangeName("name", text)}
                        onFocus={() => handleFocus()}
                        onBlur={() => handleBlur()}
                    />

                    <InputField
                        placeholder='Số điện thoại...'
                        value={phone}
                        onChangeText={(text) => handleOnChangePhone("phone", text)}
                        onFocus={() => handleFocus()}
                        onBlur={() => handleBlur()}
                    />


                    <View style={{ flexDirection: 'row', left: 10 }}>
                        <RoundCornerButton
                            title='Lưu Tên'
                            onPress={() => onchangeName()} />

                        <FontAwesome5
                            style={{
                                position: 'relative', alignItems: 'center',
                                justifyContent: 'center', right: 40, alignSelf: 'center'
                            }}
                            name='user-alt'
                            color={'#009966'}
                            size={20}
                        ></FontAwesome5>
                    </View>

                    <View style={{ flexDirection: 'row', left: 10 }}>
                        <RoundCornerButton
                            title='Lưu Sđt'
                            onPress={() => onchangePhone()} />

                        <FontAwesome5
                            style={{
                                position: 'relative', alignItems: 'center',
                                justifyContent: 'center', right: 40, alignSelf: 'center'
                            }}
                            name='phone'
                            color={'#993366'}
                            size={20}
                        ></FontAwesome5>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default ChangeInfoProfile;


