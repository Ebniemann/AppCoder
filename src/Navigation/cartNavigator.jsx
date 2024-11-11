import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from '../Screens/cart'

const Stack = createNativeStackNavigator()

const CartNavigator = ()=>{
  return(
    <Stack.Navigator>

      <Stack.Screen name="Carrito" component={Cart}/>
      

    </Stack.Navigator>
  )
}

export default CartNavigator