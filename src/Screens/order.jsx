import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearCart } from "../Features/cart/cartSlice";

const Order = () => {
  const itemsCart = useSelector((state) => state.cartReducer.itemsCart);
  const total = useSelector((state) => state.cartReducer.totalPrice);
  const [orderNumber, setOrderNumber] = useState(null);

  const dispatch = useDispatch(); 

  const navigation = useNavigation();

  useEffect(() => {
    const generateOrderNumber = () => {
      return Math.floor(Math.random() * 10000);
    };
    setOrderNumber(generateOrderNumber());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text>
          {item.quantity} - {item.title}
        </Text>
        <Text>Subtotal: ${item.subTotal}</Text>
      </View>
    );
  };
  const handleBackToHome = () => {
    dispatch(clearCart()); 
    navigation.navigate("Home"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orden Finalizada</Text>

      {orderNumber && (
        <Text style={styles.orderNumber}>N° de Orden: {orderNumber}</Text>
      )}

      <FlatList
        data={itemsCart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <Text style={styles.total}>Total: ${total}</Text>

      <Pressable
        style={styles.button}
        onPress={handleBackToHome}
      >
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </Pressable>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 18,
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
