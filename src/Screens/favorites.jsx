import { useSelector } from "react-redux";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

const FavoritesScreen = ({ navigation }) => {
  const favoriteItems = useSelector((state) => state.favoritesReducer.favoriteItems);

  const renderFavoriteItem = ({ item }) => (
    <Pressable
      style={styles.favoriteItem}
      onPress={() => navigation.navigate("Detalle del Producto", { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteItems}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        ListEmptyComponent={<Text>No tienes productos favoritos 😿</Text>}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteItem: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#555",
  },
});
