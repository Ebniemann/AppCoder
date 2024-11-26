import { useSelector, useDispatch } from "react-redux";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { removeFavorite } from "../Features/functionalities/favoritesSlice";



const FavoritesScreen = ({ navigation }) => {

  const dispatch= useDispatch()
  const favoriteItems = useSelector((state) => state.favoritesReducer.favoriteItems);


  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Pressable
        style={styles.itemContainer}
        onPress={() => {
          navigation.navigate("Detalle");
        }}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.shortDescription}</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => handleRemoveFavorite(item.id)}
        style={styles.deleteButton}
      >
        <Image source={require("../Icons/delete.png")} style={styles.deleteIcon} />
      </Pressable>
    </View>
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
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    flex: 1,
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
  deleteButton: {
    padding: 5,
  },
  deleteIcon: {
    width: 24,
    height: 24,
  },
});
