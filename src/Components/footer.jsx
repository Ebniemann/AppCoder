import { View, Text, StyleSheet } from "react-native";
import { colors } from "../Global/colors";

const Footer =()=>{
  return(
    <View style={styles.container}>
      <Text style={styles.text}> By Niemann❤️</Text>
    </View>
  )
}

export default Footer;

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.lighblue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  text:{
    color: colors.white,
    fontSize: 25, 
  }
})