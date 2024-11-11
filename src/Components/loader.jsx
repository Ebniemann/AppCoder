import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';


const Loader = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [animation]);

  const backgroundPosition = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-185, 185],
  });

  return (
    <View style={styles.loader}>
      <Animated.View
        style={[
          styles.loaderAfter,
          { transform: [{ translateX: backgroundPosition }] },
        ]}
      />
    </View>
  );
};


export default Loader


const styles = StyleSheet.create({
  loader: {
    width: 215,
    height: 215,
    display: 'flex',
    margin: 'auto',
    position: 'relative',
    backgroundColor: '#FFF',
    borderRadius: 10, 
    overflow: 'hidden', 
  },
  loaderAfter: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: Dimensions.get('window').width - 60, 
    height: Dimensions.get('window').height - 45,
    backgroundColor: '#DDD',
    opacity: 0.5,
  },
});
