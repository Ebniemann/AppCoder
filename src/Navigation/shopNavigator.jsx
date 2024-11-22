import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProducts from '../Screens/listProducts'
import  DetailProduct  from "../Screens/detailProduct";
import { Favorites } from "../Screens";


const Stack = createNativeStackNavigator()

const ShopNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>

      <Stack.Screen name="Productos" component={ListProducts}/> 
      <Stack.Screen name="Detalle del Producto" component={DetailProduct}/>
      <Stack.Screen name="Favoritos" component={Favorites}/>
    </Stack.Navigator>
  )
}

export default ShopNavigator