import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import MainNavigator from "./src/Navigation/mainNavigator";
import { Provider } from "react-redux";
import { store } from "./src/app/store";

//AGREGAR EL useEFFECT de LOADES!!!!!!
export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
