import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import ShopHomeNavigator from './shopHome';
import CartNavigator from './cartNavigator';
import DetailProduct from '../Screens/detailProduct';

const Tab = createBottomTabNavigator();

const TabProductDetailNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { height: 64 },
    }}>
      <Tab.Screen
        name="ShopHome"
        component={ShopHomeNavigator}
        options={{
          tabBarIcon: () => (<Image style={{ width: 30, height: 30 }} source={require('../Icons/list.png')} />),
          headerShown: false,  
        }}
        
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: () => (<Image style={{ width: 30, height: 30 }} source={require('../Icons/cart.png')} />),
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={{
          tabBarIcon: () => (<Image style={{ width: 30, height: 30 }} source={require('../Icons/detail.png')} />)
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default TabProductDetailNavigator;
