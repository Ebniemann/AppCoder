import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from '../Screens/cart'
import Order from '../Screens/order'

const Stack = createNativeStackNavigator()

const CartNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>

      <Stack.Screen name="Carrito" component={Cart}/>
      <Stack.Screen name="orden de compras" component={Order}/>
      

    </Stack.Navigator>
  )
}

export default CartNavigator