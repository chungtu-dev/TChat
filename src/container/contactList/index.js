import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, YellowBox } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { uuid, smallDeviceHeight } from '../../utility/constants';
import { globalStyle } from '../../utility';
import { ShowContact } from '../../component';
import firebase from '../../firebase/config';
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {

    //waiting for loading
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

    //make sticky header for profile img in Home
    const [getScrollPosition, setScrollPosition] = useState(0);

    const [userDetail, setUserDetail] = useState({
        id: '',
        name: '',
        email: '',
        profileImg: '',
        phone: '',
    });

    const { name, profileImg, email, phone } = userDetail;
    const [allUsers, setAllUsers] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <MaterialCommunityIcons
                    name='arrow-left-bold'
                    size={40}
                    color={'#FF9900'}
                    style={{ left: 10, }}
                    onPress={() => navigation.replace('Home')}
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
                    }
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.email = child.val().email;
                            currentUser.profileImg = child.val().profileImg;
                            currentUser.phone = child.val().phone;
                        }
                        else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                email: child.val().email,
                                profileImg: child.val().profileImg,
                                phone: child.val().phone,
                            });
                        }
                    });
                    setUserDetail(currentUser);
                    setAllUsers(users);
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
                alert('Image canceled');
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

    //Get opacity
    const getOpacity = () => {
        if (deviceHeight < smallDeviceHeight) {
            return deviceHeight / 4;
        } else {
            return deviceHeight / 6;
        }
    };

    return (
        console.disableYellowBox = true,
        YellowBox.ignoreWarnings([""]),
        <SafeAreaView style={[globalStyle.flex1, { backgroundColor: 'white' }]}>
            <FlatList
                alwaysBounceHorizontal={false}
                data={allUsers}
                onScroll={(event) =>
                    setScrollPosition(event.nativeEvent.contentOffset.y)
                }
                ListHeaderComponent={
                    <View
                        style={{
                            opacity:
                                getScrollPosition < getOpacity()
                                    ? (getOpacity() - getScrollPosition) / 100
                                    : 0,
                        }}
                    >
                    </View>
                }
                renderItem={({ item }) => (
                    <ShowContact
                        name={item.name}
                        email={item.email}
                        phone={item.phone}
                        img={item.profileImg}
                        onImgTap={() => imgTap(item.profileImg, item.name)}
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Home;