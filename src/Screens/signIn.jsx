import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { colors } from '../Global/colors';
import { useSignInMutation } from '../Service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Features/auth/authSlice'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignIn = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

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

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Mantener sesion</Text>
        <Pressable onPress={toggleSwitch} style={styles.switchPressable}>
          <Icon name={isEnabled ? "check-circle" : "cancel"} size={30} color={isEnabled ? colors.green : colors.red} />
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: colors.gray, true: colors.green }}
            thumbColor={isEnabled ? colors.white : colors.gray}
          />
        </Pressable>
      </View>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.black,
    marginRight: 10,
  },
  switchPressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
