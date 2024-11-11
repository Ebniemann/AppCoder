import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProducts from '../Screens/listProducts'
import  DetailProduct  from "../Screens/detailProduct";


const Stack = createNativeStackNavigator()

const ShopNavigator = ()=>{
  return(
    <Stack.Navigator>

       <Stack.Screen name="Productos" component={ListProducts}/> 
      <Stack.Screen name="Detalle del Producto" component={DetailProduct}/>

    </Stack.Navigator>
  )
}

export default ShopNavigator