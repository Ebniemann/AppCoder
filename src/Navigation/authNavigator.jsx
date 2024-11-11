import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp, } from '../Screens'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />


    </Stack.Navigator>
  )
}

export default AuthNavigator