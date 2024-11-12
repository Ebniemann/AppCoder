import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, ShoppingList, Location, PromotionList, UserProfile } from '../Screens'
import TabNavigator from "./tabNavigator";
import TabProductDetailNavigator from "./tabShopHome";
import AuthNavigator from "./authNavigator";
import Header from "../Components/header";


const Stack = createNativeStackNavigator()

const AppShop = () => {
  return (

    <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation, route }) => ({
      header: () => <Header title={route.name} navigation={navigation} />,
    })}>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name="Sucursales" component={Location} />
      <Stack.Screen name="Lista de Compras" component={ShoppingList} />
      <Stack.Screen name="Productos" component={TabNavigator}  />
      <Stack.Screen name="Promociones" component={PromotionList} />
      <Stack.Screen name="DetailProductTabs" component={TabProductDetailNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Tu Perfil" component={UserProfile}/>

    </Stack.Navigator>


  )
}

export default AppShop