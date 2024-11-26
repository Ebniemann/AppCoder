import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import MainNavigator from "./src/Navigation/mainNavigator";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import {createSessionsTable} from '../AppCoder/src/db/index'


createSessionsTable()
.then((result)=> console.log('tabla creada', result))
.catch((error)=>console.log('error al crear tabla', error))

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
