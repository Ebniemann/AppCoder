import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions } from "react-native";
import Layout from "../Components/layout";
import { useGetProductsQuery } from "../Service/shopService";
import { colors } from "../Global/colors";
import { useSelector } from "react-redux";
import { discount } from "../utils/functions";


const { width } = Dimensions.get('window')


const PromotionDetail = () => {


  const { data: products, error, isLoading } = useGetProductsQuery()

  const promotion = () => {
    return (
      products
      .filter((item) => item.discount && item.discount > 0)
      .map((item)=>({
        ...item,
        priceDicount : discount(item.price, item.discount)
      }))

    )
  }

  const promotionList = ({ item }) => {
    return (
      isLoading ? (<ActivityIndicator size='small' />)
        :
        error ? (<Text>Error de carga</Text>)
          :

          <View style={styles.productContainer}>
            <View style={styles.newProduct}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>{item.shortDescription}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.discount}>{item.discount}% OFF</Text>
              <Text>Precio Final: {item.priceDicount}</Text>
            </View>
          </View>

    )

  }

  return (
    <Layout>
      <Text style={styles.title}>Promos Bombas💥</Text>
      <FlatList
        data={promotion()}
        keyExtractor={(item) => item.id}
        renderItem={promotionList}

      />
    </Layout>

  )
}


export default PromotionDetail

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    alignSelf: 'center',
    marginBottom: 25
  },
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
  }
})