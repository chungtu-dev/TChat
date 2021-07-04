import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { Profile, Profile_Name, RoundCornerButton, InputField, Profile_Name_inSelect, Profile_Img_inSelect, Background_Img_inChange, Profile_Img_inChange, Profile_Background, Profile_Img } from '../../component';
import { SafeAreaView, View, Alert} from 'react-native';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { uuid } from '../../utility/constants';
import { globalStyle } from '../../utility';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from '../../firebase/config';
import { clearAsyncStorage } from '../../asyncStorage';
import { LogOutUser, UpdateUser } from '../../network';

const ProfileScreen = ({ navigation }) => {

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
            // headerLeft: () => (
            //     <FontAwesome5
            //         name='arrow-circle-left'
            //         size={30}
            //         color={'#FF9900'}
            //         style={{ left: 10, }}
            //         onPress={() => navigation.replace('Home')}
            //     />
            // ),
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
                        backgroundimg: '',
                        phone: '',
                    }
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.email = child.val().email;
                            currentUser.profileImg = child.val().profileImg;
                            currentUser.backgroundimg = child.val().backgroundimg;
                            currentUser.phone = child.val().phone;
                        }
                        else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                email: child.val().email,
                                profileImg: child.val().profileImg,
                                backgroundimg: child.val().backgroundimg,
                                phone: child.val().phone,
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
                alert('Image picker error');
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

    // logout
    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        navigation.replace('Login');
                    })
                    .catch((err) => alert(err));
            })
            .catch((err) => alert(err));
    };
    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
                <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>

                        <Profile_Background
                            backgroundimg={backgroundimg}
                            name={name}
                            onImgTapBG={() => imgTap(backgroundimg, name)}
                        />
                        <Profile_Img
                            img={profileImg}
                            name={name}
                            onImgTap={() => imgTap(profileImg, name)}
                        />                    
                        <Profile_Name
                            name={name}
                            email={email}
                            phone={phone}
                        />
                    <View style={{ flexDirection: 'row',}}>
                        <RoundCornerButton
                            title='Đăng xuất'
                            onPress={() => Alert.alert('Thoát', 'Bạn có chắc muốn thoát', [
                                {
                                    text: 'Có',
                                    onPress: () => logout(),
                                },
                                {
                                    text: 'Không',
                                }
                            ], {
                                cancelable: false
                            })} />
                        <MaterialCommunityIcons
                            style={{
                                position: 'relative', alignItems: 'center',
                                justifyContent: 'center', right: 40, alignSelf: 'center'
                            }}
                            name='logout'
                            color='white'
                            size={22}
                        ></MaterialCommunityIcons>
                    </View>

                </View>
            </SafeAreaView>
    );
};

export default ProfileScreen;


