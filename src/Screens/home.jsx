import Layout from "../Components/layout";
import CardItem from "../Components/cardItem";
import { View, StyleSheet, ActivityIndicator, Text, FlatList, Image, Dimensions, Pressable } from "react-native";
import { useGetCategoriesQuery, useGetProductsQuery } from "../Service/shopService";
import { useDispatch } from "react-redux";
import { setCategory, setProductId } from "../Features/shop/shopSlice";
import { Loader } from '../Components/loader'
import { addItemCart } from "../Features/cart/cartSlice";


const { width } = Dimensions.get('window')


const Home = ({ navigation }) => {
  const dispatch = useDispatch()

  const { data: categories, error, isLoading } = useGetCategoriesQuery()
  const { data: products , isLoading: productsLoading} = useGetProductsQuery()


  const productsByTags = () => {
    return products ? products.filter((item) => (item.tags && item.tags.includes("new"))) : []
  }

  const newProducts = ({ item }) => {
    return (
      <View>
        {productsLoading ? (
          <Loader />
        ) : (
          <Pressable 
            style={styles.productContainer} 
            onPress={() => {
              dispatch(setProductId(item.id));
              navigation.navigate('DetailProductTabs');
            }}
          >
            <View style={styles.newProduct}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>{item.shortDescription}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </Pressable>
        )}
      </View>
    );
  };
  
  return (

    isLoading ? (<ActivityIndicator size='small' />)
      :
      error ? (<Text>Error de carga</Text>)
        :
        (<Layout>
          <View style={styles.itemComtainer}>
            <CardItem onPress={() => navigation.navigate('Lista de Compras')}
              icon={require('../Icons/list.png')}
              titleCard={'Lista de compras'} />
            <CardItem onPress={() => navigation.navigate('Sucursales')}
              icon={require('../Icons/location.png')}
              titleCard={'Locales'} />
            <CardItem onPress={() => navigation.navigate('Promociones')}
              icon={require('../Icons/sales.png')}
              titleCard={'Promos'} />
          </View>
          <View style={styles.bannerContainer}>
            {
              categories.map((item) =>
              (
                <Pressable key={item.id} style={styles.banners} onPress={() => { dispatch(setCategory(item.name));   navigation.navigate('Productos') }}>
                  
                  <Image source={{ uri: item.image }} style={styles.bannerImage} />
                </Pressable>)
              )
            }
          </View>
          <Text style={styles.title}>Nuevos Ingresos!</Text>
          <FlatList
            data={productsByTags()}
            keyExtractor={(item) => item.id}
            renderItem={newProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            contentContainerStyle={{
              alignItems: 'center',
            }}

          />
        </Layout>)
  );
};

export default Home;

const styles = StyleSheet.create({
  itemComtainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 25,
    marginBottom: 25
  },
  bannerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  banners: {
    marginBottom: 10,
    marginRight: 20,
    marginLeft: 20
  },
  bannerImage: {
    width: 120,
    height: 140,
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15
  },
  productContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  newProduct: {
    width: 230,
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 150,
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
  cart: {
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: 0,
    top: -10
  }

})