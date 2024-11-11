import { Pressable, Image, Text, StyleSheet } from "react-native";
import { colors } from "../Global/colors";

const CardItem = ({ titleCard, icon, onPress }) => {
  console.log("Title Card Value:", titleCard);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {icon && <Image source={icon} style={styles.image} resizeMode="contain" />}
      <Text style={styles.text}>{titleCard}</Text>
    </Pressable>
  )
}

export default CardItem


const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    padding: 10,
    backgroundColor: colors.white,
    borderColor: colors.blue, 
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    lineHeight: 16,
  },
  image:{
    width: 35,
    height: 35,
    marginBottom: 5,
  }
})