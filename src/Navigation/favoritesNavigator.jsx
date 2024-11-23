import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  DetailProduct  from "../Screens/detailProduct";
import FavoritesScreen from '../Screens/favorites';



const Stack = createNativeStackNavigator()

const FavoritesNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
          name='Favorites'
          component={FavoritesScreen}
       />
      <Stack.Screen name="Detalle" component={DetailProduct}/>
    </Stack.Navigator>
  )
}

export default FavoritesNavigator