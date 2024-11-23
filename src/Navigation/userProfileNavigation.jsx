import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from '../Screens/userProfile'
import AuthNavigator from "./authNavigator";



const Stack = createNativeStackNavigator()

const ProfileNavigator = ()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
          name='Perfil'
          component={UserProfile}
       />
      <Stack.Screen name="Sesiones" component={AuthNavigator} />

    </Stack.Navigator>
  )
}

export default ProfileNavigator