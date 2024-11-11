import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from 'react-native';
import CartNavigator from './cartNavigator'
import ShopNavigator from './shopNavigator';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
   
      <Tab.Navigator screenOptions={{
        headerShown: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
          <Tab.Screen
          name='Shop'
          component={ShopNavigator}
          options={{
            tabBarIcon: () => (<Image style={{ width: 30, height: 30 }} source={require('../Icons/list.png')} />),
            headerShown: false
          }} />
        <Tab.Screen
          name='Cart'
          component={CartNavigator}
          options={{
            tabBarIcon: () => (<Image style={{ width: 30, height: 30 }} source={require('../Icons/cart.png')} />),
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