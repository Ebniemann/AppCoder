import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { colors } from '../Global/colors';
import { useSignInMutation } from '../Service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Features/auth/authSlice'; 

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [triggerSignIn] = useSignInMutation();
  const dispatch = useDispatch();


  const userSession = useSelector((state) => state.authReducer.user);

  const { fromSignUp } = route.params || {}; 

  useEffect(() => {
    if (userSession && userSession?.email && !fromSignUp) {
      navigation.navigate('Cart');
    }
  }, [userSession, fromSignUp, navigation]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await triggerSignIn({ email, password }).unwrap();

      dispatch(
        setUser({ email: result.email, idToken: result.idToken })
      );

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
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
      
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}> {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Text>
      </Pressable>
      
      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Registrate</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

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
