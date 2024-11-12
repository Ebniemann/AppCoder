import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>
      <View style={styles.profileImageContainer}>
        <Text>Imagen de perfil</Text>
      </View>
    </View>
  );
};
export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0', // Color de fondo para el contenedor de la imagen
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});


