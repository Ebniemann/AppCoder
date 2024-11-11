import { Text, TextInput, View, Pressable } from "react-native";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Search = ({ onSearch }) => {
  const [item, setItem] = useState("");

  const search = () => {
    onSearch(input);
    setItem("");
  };

  return (
    <View>
      <TextInput
        value={item}
        onChangeText={setItem}
        placeholder="Busqueda..."
      />
      <Pressable onPress={search}>
        <FontAwesome name="search" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Search;
