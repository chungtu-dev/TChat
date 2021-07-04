import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import {
    View, Text, YellowBox, Image, TouchableOpacity,
} from 'react-native';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { Store } from '../../context/store';
import firebase from '../../firebase/config';
import { uuid } from '../../utility/constants';
import { clearAsyncStorage } from '../../asyncStorage';
import { LogOutUser, UpdateUser, UpdateUserName } from '../../network';
import { Profile, Profile_Name, Profile_Name_inSelect, Profile_Img_inSelect, RoundCornerButton } from '../../component';
import { globalStyle } from '../../utility';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Select = ({ navigation }) => {

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        email: '',
        profileImg: '',
        password: '',
    });

    const { name, profileImg, email } = userDetail;

    useLayoutEffect(() => {
        navigation.setOptions({
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
                    }
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.email = child.val().email;
                            currentUser.profileImg = child.val().profileImg;
                        }
                        else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                email: child.val().email,
                                profileImg: child.val().profileImg,
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

    return (
        console.disableYellowBox = true,
        YellowBox.ignoreWarnings([""]),

        <View>
            <View style={{
                backgroundColor: '#006666', height: 70, borderBottomLeftRadius: 60,
                borderTopLeftRadius: 70, borderTopRightRadius: 60, borderBottomRightRadius: 60, marginLeft: 5, marginRight: 5, marginTop: 5
            }}>
                {/* <Image source={(require("../../img/background2.jpg"))}
                    style={{ position: "absolute", bottom: -800, right: -225 }} /> */}
                <View style={{ flexDirection: 'row', }}>

                    <View>
                        <Profile_Img_inSelect
                            img={profileImg}
                            name={name}
                            onImgTap={() => imgTap(profileImg, name)}
                        />
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.replace('ProfileScreen')}>
                            <Profile_Name_inSelect
                                name={name}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ borderBottomWidth: 2, padding: 3, borderColor: '#BBBBBB' }}></View>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                flex: 1,
                top: 20,
            }}>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: "absolute" }}
                        onPress={() => navigation.replace('ProfileScreen')}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={(require("../../img/user.png"))}
                                style={{ width: 50, height: 50 }}
                            />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ top: 10, fontWeight: 'bold' }}>Cá Nhân</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: "absolute" }}
                        onPress={() => navigation.replace('Home')}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={(require("../../img/facebook-messenger.png"))}
                                style={{ width: 50, height: 50 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ top: 10, fontWeight: 'bold' }}>Chats</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: "absolute" }}
                        onPress={() => navigation.replace('ChangeInfoProfile')}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={(require("../../img/edit.png"))}
                                style={{ width: 50, height: 50 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ top: 10, fontWeight: 'bold' }}>Cài Đặt</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default Select;