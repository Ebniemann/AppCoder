import { Image, View, StyleSheet } from "react-native";
import { colors } from "../Global/colors";
import DropdownComponent from "./dropdown";

const Header = ({ title }) => {
  const item = [
    { label: "Escolar", value: "remera" },
    { label: "Papelera", value: "papelera" },
    { label: "Regalos", value: "regalo" },
    { label: "Paper & Craft", value: "papercraft" },
  ];

  const renderIcon = (visible: boolean) => (
    <View style={styles.icon}>
      <Image style={styles.icon} source={require("../Icons/menu.png")} />
    </View>
  );

  return (
    // <View style={styles.headerContainer}>
    <DropdownComponent options={item} renderLeftIcon={renderIcon} />
    // </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    justifyContent: "center",
    backgroundColor: colors.white,
    marginBottom: 10,
  },

  icon: {
    width: 35,
    height: 35,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
