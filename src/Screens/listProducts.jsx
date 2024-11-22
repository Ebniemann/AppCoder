import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Layout from "../Components/layout";
import { useGetProductsQuery, useGetProductsByCategoriesQuery } from "../Service/shopService";
import Input from '../Components/input'
import { useDispatch, useSelector } from "react-redux";
import { setProductId } from "../Features/shop/shopSlice";
import { Loader } from '../Components/loader'
import { addItemCart } from "../Features/cart/cartSlice";
import { colors } from "../Global/colors";
import { useEffect, useState } from "react";
import { addFavorite } from '../Features/functionalities/favoritesSlice'



const { width } = Dimensions.get('window')

const ListProducts = ({ navigation }) => {
  const [inputText, setInputText] = useState('')
  const [productFiltered, setProductFiltered] = useState([])
  const dispatch = useDispatch()

  const category = useSelector((state) => state.shopReducer.categorySelected)

  const { data: products, error, isLoading: productsLoading } = useGetProductsQuery()
  const { data: productsCategory, isLoading } = useGetProductsByCategoriesQuery(category || null)

  const isFavorite = useSelector((state) =>
    state.favoritesReducer.favoriteItems.some((product) => product.id === item.id)
  );

  const ProductItem = ({ item }) => {

    return (
      <View>
        {
          productsLoading ? (
            <Loader />
          ) : (
            <Pressable style={styles.productContainer} onPress={() => { dispatch(setProductId(item.id)), navigation.navigate('Detalle del Producto') }} >
              <View style={styles.newProduct}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.text}>{item.shortDescription}</Text>
                <Text style={styles.price}>${item.price}</Text>
                {
                  item.discount & item.discount > 0 ?
                    <Text style={styles.discount}>{item.discount}% OFF</Text> :
                    null
                }
                <Pressable onPress={() => dispatch(addFavorite(item))}>
                  <Image
                    source={require("../Icons/favorito.png")}
                    style={[
                      styles.favoriteIcon,
                      isFavorite ? { tintColor: "red" } : { tintColor: "gray" },
                    ]}
                  />
                </Pressable>
                <Pressable onPress={() => dispatch(addItemCart(item))}>
                  <Text>
                    Añadir al carrito
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          )
        }
      </View>


    )
  }

  useEffect(() => {
    const dataToFilter = category ? productsCategory : products
    if (dataToFilter?.lenght) {
      const result = dataToFilter(prod => prod.title?.toLowerCase().includes(inputText.toLowerCase()));
      setProductFiltered(result);
    } else {
      setProductFiltered([]);
    }
  }, [inputText, products, productsCategory, category]);

  return (
    isLoading ? (<ActivityIndicator size='small' />)
      :
      error ? (<Text>Error de carga</Text>)
        :
        <Layout>
          <Input placeholder={'Buscar producto...'} value={inputText} onChangeText={text => setInputText(text)} />
          <FlatList
            data={productFiltered}
            keyExtractor={(item) => item.id}
            renderItem={ProductItem}
            ListEmptyComponent={<Text>No hay productos disponibles.</Text>}
          />
        </Layout>
  )
}


export default ListProducts

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
  favoriteIcon: {
    width: 25,
    height: 25,
    marginTop: 10,
  }
})