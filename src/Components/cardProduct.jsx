import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../Global/colors';

const { height } = Dimensions.get('window');
const CardProduct = ({ item, onAddToCart }) => {
  return (
   < View style={styles.productContainer}>
      <View style={styles.newProduct}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.discountContainer}>

        {
          item.discount & item.discount > 0 ?
            <Text style={styles.discount}>{item.discount}% OFF</Text>
            :
            null
        }

        </View>

        <View style={styles.descriptios}>

        <Text style={styles.shortDescription}>{item.shortDescription}</Text>
        <Text style={styles.longDescription}>{item.longDescription}</Text>

        </View>

        <Text style={styles.price}>${item.price}</Text>
       
        <Pressable onPress={onAddToCart} style={styles.addButton}>
          <Text style={styles.addButtonText}>Añadir al carrito</Text>
        </Pressable>

      </View>
    </View>
  );
};

export default CardProduct;

const styles = StyleSheet.create({
  productContainer: {
    padding: 5,
    margin: 5,
    borderRadius: 20,
    backgroundColor: colors.lighpurple,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
   
  },
  newProduct: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 5,
    flex: 1,  // Esto hace que el contenedor ocupe el espacio disponible
  },
  image: {
    width: '100%',
    height: 250, 
    borderRadius: 15,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.purple,
    textAlign: 'center',
    marginBottom: 15
  },
  discountContainer: {
    position: 'absolute',
    top: 6,
    right: -30,
    zIndex: 1, 
    transform: [{ rotate: '45deg' }], 
  },
  discount: {
    backgroundColor: colors.orange,
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20, 
    textAlign: 'center',
  },
  descriptios:{
    padding:10,
    marginBottom: 20
  },
  shortDescription: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 15
  },
  longDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.blue,
    textAlign: 'center',
    marginBottom: 90
  },
  addButton: {
    backgroundColor: colors.purple,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    bottom: -2,
   
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 24,
  },
});
