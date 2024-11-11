import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductQuery } from "../Service/shopService";
import Layout from "../Components/layout";
import { addItemCart } from "../Features/cart/cartSlice";
import { colors } from "../Global/colors";

const { width } = Dimensions.get('window');

const DetailProduct = ({navigation}) => {

  dispatch= useDispatch()

  const product = useSelector((state) => state.shopReducer.productSelected);

  const { data: productData, error, isLoading } = useGetProductQuery(product?.id, {
    skip: !product?.id, 
  });
  
  
  const ProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.newProduct}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.shortDescription}</Text>
        <Text>{item.longDescription}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.discount}>{item.discount}% OFF</Text>
        <Pressable style={styles.cart}  source={require('../Icons/cart.png')}  onPress={()=> {dispatch(addItemCart(item.id)), navigation.navigate('Carrito')}}/>
      </View>
    </View>
  );

  return isLoading ? (
    <ActivityIndicator size="small" />
  ) : error ? (
    <Text>Error de carga</Text>
  ) : (
    <Layout>
      <FlatList
        data={productData ? [productData] : []}
        keyExtractor={(item) => item.id}
        renderItem={ProductItem}
      />
    </Layout>
  );
};

export default DetailProduct;

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
  discount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.purple
  },
  cart:{
    width: 15,
    height: 15
  }
});
