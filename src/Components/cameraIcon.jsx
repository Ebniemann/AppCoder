import { StyleSheet,View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from "../Global/colors";

const CameraIcon =()=>{
  return(
    <View style={styles.iconContainer}>
      <Icon name="photo-camera" size={45} color="#fff<"/>
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
  iconContainer:{
    justifyContent:'center',
    alignContent: 'center',
    backgroundColor: colors.purple,
    width: 48,
    height: 48,
    borderRadius: 32

  }
}) 