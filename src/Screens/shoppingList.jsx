import { useState } from "react";
import {
  FlatList,
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Image
} from "react-native";
import Layout from "../Components/layout";
import InputAdd from "../Components/input";
import Fontisto from "@expo/vector-icons/Fontisto";
import ModalView from "../Components/modal";

const ShoppingList = () => {
  const [prodInput, setProdInput] = useState("");
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedprod, setSelectedProd] = useState({});


  const listProduct = () => {
    setList((prevList) => [
      ...prevList,
      { id: Math.random(), value: prodInput, checked: false },
    ]);
    setProdInput("");
  };

  const handleDeleteProd = () => {
    setList(list.filter((item) => item.id != selectedprod.id));
    setModalVisible(false);
  };

  const handleSelectedProd = (item) => {
    setSelectedProd(item);
    setModalVisible(true);
  };

  const handleCheck = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const renderList = ({ item, isChecked }) => {
    return (
      <View style={styles.taskContainer}>
        <View style={styles.checkContainer}>
          <Pressable style={styles.check} onPress={() => handleCheck(item.id)}>
            {item.checked ? (
              <Fontisto name="checkbox-active" size={24} color="black" />
            ) : (
              <Fontisto name="checkbox-passive" size={24} color="black" />
            )}
          </Pressable>
          <Text style={styles.text}>{item.value}</Text>
        </View>
        <Pressable onPress={() => handleSelectedProd(item)}>
          <Image style={styles.icon}  source={require('../Icons/delete.png')} />
        </Pressable>
      </View>
    );
  };

  return (
    <Layout>
      <InputAdd
        value={prodInput}
        placeholder={"Agregar producto"}
        onChangeText={setProdInput}
        onPress={listProduct}
      />
      <FlatList
        style={styles.list}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={renderList}
      />
      <ModalView
        visible={modalVisible}
        selectedProd={selectedprod}
        onAcept={handleDeleteProd}
        onClose={() => setModalVisible(false)}
        aceptOption={"Aceptar"}
        closeOption={"Cancelar"}
      />
    </Layout>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },

  checkContainer: {
    flexDirection: "row",
  },
  check: {
    marginRight: 15,
  },
  list: {
    width: "95%",
  },
  text:{
    fontSize: 18
  },
  icon:{
    width: 35,
    height: 35
  }
});
