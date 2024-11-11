import { View, StyleSheet } from "react-native";
import { colors } from "../Global/colors";

const cardProduct = ({ children, style }) => {
  return (
    <View style={{...styles.cardContainer, ...style}}>
      {children}
    </View>
  );
};

export default cardProduct;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: colors.lighblue,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 5 },
    elevation: 10,
  },
});
