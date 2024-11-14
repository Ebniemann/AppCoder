import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Dimensions, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductQuery } from "../Service/shopService";
import Layout from "../Components/layout";
import { addItemCart } from "../Features/cart/cartSlice";
import CardProduct from "../Components/cardProduct";



const DetailProduct = () => {

  dispatch = useDispatch()

  const product = useSelector((state) => state.shopReducer.productSelected);

  const { data: productData, error, isLoading } = useGetProductQuery(product?.id, {
    skip: !product?.id,
  });


  const ProductItem = ({ item }) => (
  
  <CardProduct
  item={item}
  onAddToCart={() => dispatch(addItemCart(item))}/>
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

