import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Switch } from 'react-native';
import { useSignInMutation } from '../Service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Features/auth/authSlice';
import { insertSession, fetchSession } from '../db/index'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../Global/colors';

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
    const checkSession = async () => {
      const session = await fetchSession();
      if (session.length > 0) {
        const { email, localId, token } = session[0];
        dispatch(setUser({ email, localId, token }));
        navigation.navigate('Cart');
      }
    };

    if (!fromSignUp) {
      checkSession();
    }
  }, [userSession, fromSignUp, dispatch, navigation]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await triggerSignIn({ email, password }).unwrap();
      if (isEnabled) {
        await insertSession({ email: result.email, localId: result.localId, token: result.token });
      }

      dispatch(setUser({ email: result.email, localId: result.localId, token: result.token }));
      navigation.navigate('Cart');
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
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Registrate</Text>
      </Pressable>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Mantener sesión</Text>
        <Pressable onPress={toggleSwitch} style={styles.switchPressable}>
          <Icon name={isEnabled ? "check-circle" : "cancel"} size={30} color={isEnabled ? colors.green : colors.red} />
          <Switch value={isEnabled} onValueChange={toggleSwitch} trackColor={{ false: colors.gray, true: colors.green }} thumbColor={isEnabled ? colors.white : colors.gray} />
        </Pressable>
      </View>
    </View>
  );
};
