import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home, ShoppingList, Location, PromotionList, DetailProduct} from '../Screens'
import TabNavigator from "./tabNavigator";
import TabProductDetailNavigator from "./tabShopHome";


const Stack = createNativeStackNavigator()

const Navigator=()=>{
  return(
   <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="Sucursales" component={Location}/>
        <Stack.Screen name="Lista de Compras" component={ShoppingList}/>
        <Stack.Screen name="Productos" component={TabNavigator}/>
        <Stack.Screen name="Promociones" component={PromotionList}/>
        <Stack.Screen name="DetailProductTabs" component={TabProductDetailNavigator} />
      </Stack.Navigator>
   </NavigationContainer>

  )
}

export default Navigator