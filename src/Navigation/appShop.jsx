import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, ShoppingList, Location, PromotionList, UserProfile } from '../Screens';
import TabNavigator from "./tabNavigator";
import TabProductDetailNavigator from "./tabShopHome";
import AuthNavigator from "./authNavigator";
import Header from "../Components/header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setProfilePicture } from "../Features/auth/authSlice";
import { useGetProfilePictureQuery } from "../Service/userService";
import ProfileNavigator from "./userProfileNavigation";
import { fetchSession } from "../db";

const Stack = createNativeStackNavigator();

const AppShop = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.authReducer.email)
  const localId = useSelector((state) => state.authReducer.localId);
  const { data: profilePicture } = useGetProfilePictureQuery(localId);

  useEffect(() => {
    if (profilePicture?.image) {
      dispatch(setProfilePicture(profilePicture.image));
    }
  }, [profilePicture, dispatch]);

useEffect(()=>{
  if(!user){
    (async()=> {
      try{
        const session = await fetchSession()
        console.log('sessions', session)

      }
      catch(error){
        console.log('error al obtener la sesion', error)
      }

    })
  }
}, [user])

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={({ navigation, route }) => ({
      header: () => <Header title={route.name} navigation={navigation} />,
    })}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name="Sucursales" component={Location} />
      <Stack.Screen name="Lista de Compras" component={ShoppingList} />
      <Stack.Screen name="Productos" component={TabNavigator} />
      <Stack.Screen name="Promociones" component={PromotionList} />
      <Stack.Screen name="DetailProductTabs" component={TabProductDetailNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Tu Perfil" component={ProfileNavigator} />
    </Stack.Navigator>
  );
};

export default AppShop;
