import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Layout from "../Components/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { applyDiscount } from "../Features/cart/cartSlice";
import { colors } from "../Global/colors";
import { usePostOrderMutation } from "../Service/orderService";
import { clearCart, removeItemCart } from "../Features/cart/cartSlice";

const { width } = Dimensions.get('window')

const Cart = ({ navigation }) => {
  const dispatch = useDispatch()

  const itemsCart = useSelector((state) => state.cartReducer.itemsCart)
  const total = useSelector((state) => state.cartReducer.totalPrice)
  const [triggerPost, result] = usePostOrderMutation()

  const isCartEmpty = itemsCart.length === 0;

  const handleCheckout = () => {
    if (!isCartEmpty) {
      navigation.navigate('OrderScreen');
    }
  };

  useEffect(() => {
    dispatch(applyDiscount())
  }, [dispatch, itemsCart])

  const handleRemoveItem = (id) => {
    dispatch(removeItemCart({ id }));
  };


  const handleUpdate = async () => {
    try {
      await triggerPost({ itemsCart, total, createdAt: Date.now() }).unwrap();
      dispatch(clearCart());
      navigation.navigate('orden de compras');
    } catch (error) {
      console.error("Error finalizing purchase:", error);
    }
  };


  const cartRender = ({ item }) => {

    return (
      <Pressable style={styles.productContainer}   >
        <View style={styles.newProduct}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
          <Text>Cantidad: {item.quantity}</Text>
          <Text>Sub Total: ${item.subTotal}</Text>
        </View>
        <Pressable
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id)} // Llama a la acción para eliminar
        >
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </Pressable>

      </Pressable>

    )
  }

  return (

    <Layout>
      <Text>Tu Carrito 🛒</Text>
      <FlatList
        data={itemsCart}
        keyExtractor={(item) => item.id}
        renderItem={cartRender}
        ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
      />

      <Text>TOTAL: ${total}</Text>

      <Pressable onPress={handleUpdate} disabled={isCartEmpty} style={[styles.button, isCartEmpty && styles.disabledButton]} >
        <Text style={styles.textButton}>
          Finalizar Compra
        </Text>
      </Pressable>
    </Layout>
  )
}


export default Cart

const styles = StyleSheet.create({
  productContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    marginBottom: 30
  },
  newProduct: {
    width: 200,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    flexShrink: 1,
  },
  price: {
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
    height: 50,
    backgroundColor: colors.lighblue,
    borderRadius: 5,
    marginBottom: 15
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
  textButton: {
    color: colors.white,
    fontSize: 25,
    textAlign: 'center',
    padding: 5
  }
})