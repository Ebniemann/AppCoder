import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProducts from '../Screens/listProducts'
import  DetailProduct  from "../Screens/detailProduct";


const Stack = createNativeStackNavigator()

const ShopHome = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DetailProduct" component={DetailProduct}/>
    </Stack.Navigator>
  )
}

export default ShopHome