import firebase from '../../firebase/config';
import Firebase from 'firebase';

export const senderMsg = async (
  msgValue, 
  currentUserId, 
  guestUserId, 
  img,
  ) => {
  try {    
    return await firebase
      .database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          time: Firebase.database.ServerValue.TIMESTAMP,
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,
        },
      });
  } catch (error) {
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  img,
) => {
  try {
    return await firebase
      .database()
      .ref('messeges/' + guestUserId)
      .child(currentUserId)      
      .push({
        messege: {
          time: Firebase.database.ServerValue.TIMESTAMP,
          sender: currentUserId,
          reciever: guestUserId,
          msg: msgValue,
          img: img,     
        },                
      });      
  } catch (error) {
    return error;
  }
};
