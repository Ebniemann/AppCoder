import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "../Global/colors";

const Header = ({ title, navigation }) => {
  return (
    <View style={styles.container}>
      {navigation.canGoBack() && (
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
      )}
      <Text style={styles.title}>{title}</Text>
      <Pressable
        onPress={() => navigation.navigate("Tu Perfil")}
        style={styles.profileButton}
      >
        <Feather name="user" size={35} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.lighblue,
    paddingTop: 20,
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileButton: {
    padding: 5,
  },
});

export default Header;
