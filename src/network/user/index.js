import firebase from '../../firebase/config';

export const AddUser = async (name, email, uid, profileImg, phone, backgroundimg) => {
    try {
        return await firebase
            .database()
            .ref('users/' + uid)
            .set({
                name: name,
                email: email,
                uuid: uid,
                profileImg: profileImg,
                phone: phone,
                backgroundimg: backgroundimg,
            })
    } catch (error) {
        return error;
    }
};

export const UpdateUser = async (uuid, imgSource) => {
    try {
        return await firebase
            .database()
            .ref('users/' + uuid)
            .update({
                profileImg: imgSource,
            });
    } catch (error) {
        return error;
    }
};

export const UpdateUserBackgroundImg = async (uuid, imgSourceBackground) => {
    try {
        return await firebase
            .database()
            .ref('users/' + uuid)
            .update({
                backgroundimg: imgSourceBackground,
            });
    } catch (error) {
        return error;
    }
};


export const UpdateUserName = async (uuid, namechange) => {
    try {
        return await firebase
            .database()
            .ref('users/' + uuid)
            .update({
                name: namechange,
            });
    } catch (error) {
        return error;
    }
};

export const UpdateUserPhone = async (uuid, phonechange) => {
    try {
        return await firebase
            .database()
            .ref('users/' + uuid)
            .update({
                phone: phonechange,
            });
    } catch (error) {
        return error;
    }
};