import React from "react";
import { Pressable, TextInput, Text, StyleSheet, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from "../Global/colors";

const Task = ({ value, onChangeText, placeholder, onPress }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable style={styles.iconoContainer} onPress={onPress}>
        <FontAwesome6 name="add" size={24} color="black" />
      </Pressable>
    </View>
  );
};


export default Task;

const styles = StyleSheet.create({
  container:{
  width:'90%',
    flexDirection:'row',
    marginBottom: 30
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.purple,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    width: "90%",
   
  },
  iconoContainer: {
    backgroundColor: colors.lighpurple,
    borderColor: colors.purple,
  borderWidth:2,
    marginLeft: 20,
    width: "10%",
    alignContent: "center",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

});


{
  /* <TextInput
          style={styles.textInput}
          placeholder="nueva tarea"
          onChangeText={(text) => setTaskInput(text)}
          value={taskInput}
        />
        <Pressable style={styles.iconoContainer} onPress={AddTask}>
          <Text style={styles.icono}>+</Text>
        </Pressable> */
}
