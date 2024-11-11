import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Layout from "../Components/layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { applyDiscount } from "../Features/cart/cartSlice";

const { width } = Dimensions.get('window')

const Cart = () => {
  const dispatch = useDispatch()
  
  const itemsCart = useSelector((state) => state.cartReducer.itemsCart)
  const total = useSelector ((state)=> state.cartReducer.totalPrice)

 useEffect(()=>{
  dispatch(applyDiscount())
 },[dispatch, itemsCart])
 
  console.log('cart', itemsCart)
  console.log('total', total)


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
})