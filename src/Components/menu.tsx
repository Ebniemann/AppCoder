import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../Global/colors";
import DropdownComponent from "./dropdown";

const Menu = ({ title }) => {
  const itemOptions = [
    { label: "uno", value: "A" },
    { label: "dos", value: "B" },
  ];

  const renderIcon = (visible: boolean) => (
    <View style={styles.icon}>
      <Ionicons
        name="menu-outline"
        size={30}
        color="black"
        style={styles.icon}
      />
    </View>
  );
  return (
    <>
      <DropdownComponent options={itemOptions} renderLeftIcon={renderIcon} />
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
