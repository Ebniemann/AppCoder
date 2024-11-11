import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Home, ShoppingList, Location, PromotionList} from '../Screens'
import TabNavigator from "./tabNavigator";
import TabProductDetailNavigator from "./tabShopHome";


const Stack = createNativeStackNavigator()

const NavigatorShop=()=>{
  return(
   
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name="Sucursales" component={Location}/>
        <Stack.Screen name="Lista de Compras" component={ShoppingList}/>
        <Stack.Screen name="Productos" component={TabNavigator}/>
        <Stack.Screen name="Promociones" component={PromotionList}/>
        <Stack.Screen name="DetailProductTabs" component={TabProductDetailNavigator} />
     
      </Stack.Navigator>
 

  )
}

export default NavigatorShop