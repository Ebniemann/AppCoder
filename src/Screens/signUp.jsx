import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { colors } from '../Global/colors';
import { useSignUpMutation } from '../Service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Features/auth/authSlice';

const SignUp = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch()
  
  const [triggerSignUp, result] = useSignUpMutation();

  console.log('result trigger', result)

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden🚫");
      return;
    }
    if(result.status === 'rejected'){
      alert('usuario existente')
    }
    try {
      const result= await triggerSignUp({ email, password }).unwrap();  
      console.log ('result await', result)
      dispatch(setUser(result.data.email, result.data.idToken));
   
      navigation.navigate('SignIn');
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Registrarte</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Iniciar Sesión</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lighblue,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.purple,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.green,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },
  linkText: {
    color: colors.purple,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
