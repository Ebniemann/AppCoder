import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import CameraIcon from '../Components/cameraIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../Features/auth/authSlice';
import { colors } from '../Global/colors';
import { usePutProfilePictureMutation } from '../Service/userService';
import { useEffect } from 'react';

const UserProfile = () => { 


  const dispatch=useDispatch()

  const image = useSelector((state)=> state.authReducer.profilePicture)
  const user = useSelector((state)=> state.authReducer.user)
  const localId = useSelector((state)=> state.authReducer.localId)
  const [triggerPicture, result]= usePutProfilePictureMutation()
  
  
  const verifyCameraPermissions= async ()=>{
    const {granted }= await ImagePicker.requestCameraPermissionsAsync()
    if(!granted) return false
    return true
  }

  const pickImage = async() =>{

      const permissionsOk = await verifyCameraPermissions()
      if(permissionsOk){
         let result = await ImagePicker.launchCameraAsync(
          {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect:[1,1],
            base64: true,
            quality: 0.5
 
          }
         )
         if(!result.canceled){
          const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`
          dispatch(setProfilePicture(base64))
          triggerPicture({base64, localId})
         }
      }else{

      }
  }

  if (!user|| !localId) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aun no has iniciado Sesión...</Text>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      <View style={styles.profileImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} resizeMode="cover" />
        ) : (
          <Text style={styles.initials}>
            {user ? user.charAt(0).toUpperCase() : "?"}
          </Text>
        )}
        <Pressable onPress={pickImage} style={styles.cameraIcon}>
          <CameraIcon />
        </Pressable>
      </View>

      <Text style={styles.userInfo}>Usuario: {user}</Text>
      
    </View>
  );
};
export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333', 
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 200, 
    height: 200,
    borderRadius: 60, 
    backgroundColor: colors.lighpurple, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  profileImage: {
    width: '80%',
    height: '80%',
    borderRadius: 60, 
  },
  initials: {
    fontSize: 36, 
    fontWeight: 'bold',
    color: '#ffffff', 
    textTransform: 'uppercase',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.purple, 
    borderRadius: 20, 
    padding: 8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, 
  },
  userInfo: {
    fontSize: 18,
    color: '#555555', 
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#4caf50', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

