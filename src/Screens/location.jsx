import { View, Text, Image, Pressable, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import Layout from "../Components/layout";
import { useGetLocationQuery } from "../Service/locationService";
import { phoneNumber } from "../utils/functions";

const { width } = Dimensions.get('window')

const Location = () => {

  const { data: locations, error, isLoading } = useGetLocationQuery()

  const locationRender = ({ item }) => {
    return (

      <View style={styles.container}>
        <Image source={require('../Icons/location.png')} style={styles.image} />
        <Text style={styles.nameLocation}>{item.name}</Text>
        <Text style={styles.text}>Domicilio: {item.domicilio}</Text>
        <Text style={styles.text}>Localidad: {item.localidad}</Text>
        <Text style={styles.text}>Teléfono: {phoneNumber(item.tel)}</Text>
      </View>
    )
  }

  return (
    isLoading ? (<ActivityIndicator size='small' />)
      :
      error ? (<Text>Error de carga</Text>)
        :
        <Layout>
          <Text style={styles.title}>Locales</Text>
          <FlatList
            data={locations}
            keyExtractor={item => item.id}
            renderItem={locationRender}
          />
        </Layout>
  )
}


export default Location

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20
  },
  newProduct: {
    width: 200,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: 45,
    height: 45,
  },
  nameLocation: {
    width: '100%',
    textAlign: 'center',
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    width: '100%',
    textAlign: 'left',
    flexShrink: 1,
  },

})