import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import {getAsyncStorage, keys} from '../../asyncStorage';
import {setUniqueValue} from '../../utility/constants';
import {Logo} from '../../component';
import styles from './styles';
import {LOADING_START,LOADING_STOP} from '../../context/actions/type';
import { Store } from '../../context/store';

export default ({navigation}) => {

  //khai báo Loading
    //chạy loading chờ phản hồi từ Server
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;

  useEffect(() => {   
    const redirect = setTimeout(() => {  
      dispatchLoaderAction({
        type:LOADING_START,
    }, 4000);          
      getAsyncStorage(keys.uuid)
        .then((uuid) => {          
          if (uuid) {
            dispatchLoaderAction({
              type:LOADING_STOP,
          });
            setUniqueValue(uuid);            
            navigation.replace('Home');
          } else {         
            dispatchLoaderAction({
              type:LOADING_STOP,
          });   
            navigation.replace('Login');
          }
        })
        .catch((err)=>{
          console.log(err);
          navigation.replace('Login');
      });
    }, 3000);
    return () => clearTimeout(redirect);
  }, [navigation]);
  return (
    <View
      style={[styles.containerCentered, {backgroundColor: '#DDDDDD'}]}>
      <Logo />
    </View>
  );
};
