import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import NavigatorShop from "./navigatorShop";
import AuthNavigator from "./authNavigator";


const MainNavigator=()=>{
  const [user, setUser] = useState(null)
  return(
   <NavigationContainer>
      { user? <NavigatorShop/> : <AuthNavigator/>}
   </NavigationContainer>

  )
}

export default MainNavigator