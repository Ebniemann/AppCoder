import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import { Image } from 'react-native';
import CartNavigator from './cartNavigator'
import ShopNavigator from './shopNavigator';
import favoritesNavigator from './favoritesNavigator';



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
   
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
          <Tab.Screen
          name='Shop'
          component={ShopNavigator}
          options={{
            tabBarIcon: () => (<Image style={{ width: 40, height: 40 }} source={require('../Icons/list.png')} />),
            headerShown: false
          }} />
        <Tab.Screen
          name='Cart'
          component={CartNavigator}
          options={{
            tabBarIcon: () => (<Image style={{ width: 40, height: 40 }} source={require('../Icons/cart.png')} />),
            headerShown: false
          }} />
           <Tab.Screen
          name='Favorites'
          component={favoritesNavigator}
          options={{
            tabBarIcon: () => (<Image style={{ width: 50, height: 50 }} source={require('../Icons/favorito.png')} />),
            headerShown: false
          }} />
      </Tab.Navigator>
   
   
  )
}

export default TabNavigator


const styles = StyleSheet.create({
  tabBar: {
    height: 64,
  }
})