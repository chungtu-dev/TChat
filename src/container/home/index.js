import React, { useLayoutEffect, useContext, useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, YellowBox, TouchableOpacity, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { uuid, smallDeviceHeight } from '../../utility/constants';
import { color, globalStyle } from '../../utility';
import { ShowUsers, StickyHeader, Profile_Img, Profile_Img_inSelect, Profile_Name_inSelect } from '../../component';
import firebase from '../../firebase/config';
import { deviceHeight } from '../../utility/styleHelper/appStyle';
import ImagePicker from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        backgroundimg:'',
    });

    const { name, profileImg, email, phone, backgroundimg } = userDetail;
    const [allUsers, setAllUsers] = useState([]);

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerLeft: () => (
    //             <FontAwesome5
    //                 name='arrow-circle-left'
    //                 size={30}
    //                 color={'#FF9900'}
    //                 style={{ left: 10, }}
    //                 onPress={() => navigation.replace('Select')}
    //             />
    //         ),
    //         headerRight: () => (
    //             <FontAwesome5
    //                 name='user-alt'
    //                 size={30}
    //                 color={'#FF9900'}
    //                 style={{ right: 10, }}
    //                 onPress={() => navigation.replace('ProfileScreen')}
    //             />
    //         ),
    //     });
    // }, [navigation]);
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
                        phone: '',
                        backgroundimg:'',
                    }
                    dataSnapshot.forEach((child) => {
                        if (uuid === child.val().uuid) {
                            currentUser.id = uuid;
                            currentUser.name = child.val().name;
                            currentUser.email = child.val().email;
                            currentUser.profileImg = child.val().profileImg;
                            currentUser.phone = child.val().phone;
                            currentUser.backgroundimg=child.val().backgroundimg;
                        }
                        else {
                            users.push({
                                id: child.val().uuid,
                                name: child.val().name,
                                email: child.val().email,
                                profileImg: child.val().profileImg,
                                phone: child.val().phone,
                                backgroundimg:child.val().backgroundimg,
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
    
    //show full img profile background
    // const imgTapBG = (backgroundimg, name) =>{
    //     if(!backgroundimg){
    //         navigation.navigate('ShowFullImg',{
    //             name,
    //             imgText:name.charAt(0),
    //         });
    //     } else {
    //         navigation.navigate('ShowFullImg',{
    //             name,
    //             img:backgroundimg,
    //             backgroundimg:backgroundimg,
    //         })
    //     }
    // };

    //name tap
    const nameTap = (profileImg, name, guestUserId) => {
        if (!profileImg) {
            navigation.navigate('Chat', {
                name,
                imgText: name.charAt(0),
                guestUserId,
                currentUserId: uuid,
            });
        } else {
            navigation.navigate('Chat', {
                name,
                img: profileImg,
                guestUserId,
                currentUserId: uuid,
            });
        }
    };

    //guest tap
    const guestTap = (profileImg, name, guestUserId, email, phone, backgroundimg) => {
        if (!profileImg) {
            navigation.navigate('InfoGuestUser', {
                name,
                imgText: name.charAt(0),
                guestUserId,
                email,
                phone,
                currentUserId: uuid,
            });
        } else {
            navigation.navigate('InfoGuestUser', {
                name,
                img: profileImg,
                backgroundimg: backgroundimg,
                guestUserId,
                email,
                phone,
                currentUserId: uuid,
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
        YellowBox.ignoreWarnings(['Warning: ...']),
        <SafeAreaView style={[globalStyle.flex1, { backgroundColor: '#CCCCCC' }]}>
            {
                getScrollPosition > getOpacity() && (
                    <StickyHeader
                        name={name}
                        img={profileImg}
                        onImgTap={() => imgTap(profileImg, name)}
                    />
                )
            }            
            <View style={{
                backgroundColor: '#006666', height: 70, borderBottomLeftRadius: 60,
                borderTopLeftRadius: 70, borderTopRightRadius: 60, borderBottomRightRadius: 60, marginLeft: 5, marginRight: 5, marginTop: 5, position:'relative',
            }}>
                {/* header */}
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Profile_Img_inSelect
                            img={profileImg}
                            name={name}
                            onImgTap={() => imgTap(profileImg, name)}
                        />
                    </View>

                    <View style={{ justifyContent: 'center' }}>
                        <View>
                            <Profile_Name_inSelect
                                name={name}
                            />
                        </View>
                    </View>
                </View>  
            </View>
            
            <View style={{marginTop:10, flex:1,  backgroundColor:color.WHITE, borderTopLeftRadius:20, borderTopRightRadius:20}}>
            <FlatList
            style={{marginTop:15}}
                alwaysBounceHorizontal={false}
                data={allUsers}
                keyExtractor={(_, index) => index.toString()}
                // keyExtractor={(index)=>index.toString()}
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
                        {/* <View style={{
                            marginTop: 5, backgroundColor:'#EEEEEE',borderRadius:20, marginLeft:10, marginRight:10,
                        }}>
                            <View>
                                <Profile_Img_inSelect
                                    img={profileImg}
                                    name={name}
                                    onImgTap={() => imgTap(profileImg, name)}
                                />
                            </View>
                        </View> */}
                    </View>
                }
                renderItem={({ item }) => (
                    <ShowUsers
                        name={item.name}
                        img={item.profileImg}
                        onImgTap={() => imgTap(item.profileImg, item.name)}
                        onNameTap={() => nameTap(item.profileImg, item.name, item.id,)}
                        onGuestTap={() => guestTap(item.profileImg, item.name, item.id, item.email, item.phone, item.backgroundimg)}
                    />
                )}
            />
            </View>
        </SafeAreaView>
    );
};

export default Home;