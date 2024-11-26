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

  const dispatch = useDispatch();

  const [triggerSignIn, result] = useSignInMutation();

  const userSession = useSelector((state) => state.authReducer.user);
  const { fromSignUp } = route.params || {}; 

  
  // useEffect(() => {
  //   const checkSession = async () => {
  //     try {
  //       const session = await fetchSession();
  //       console.log('Sesión encontrada:', session);
  //       if (session.length > 0) {
  //         const { email, localId, idToken } = session[0];
  //         dispatch(setUser({ email, localId, idToken }));
  //         navigation.navigate('Cart');
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener la sesión:', error);
  //     }
  //   };    
    

  //   if (!fromSignUp) {
  //     checkSession();
  //   }
  // }, [userSession, fromSignUp, dispatch, navigation]);

  useEffect(() => {
    if (result.isSuccess) {
      console.log('Resultado exitoso de inicio de sesión:', result);
      dispatch(setUser(result.data));
      
      if (isEnabled) {
        console.log("result data:", result.data)
        insertSession({
          localId: result.data.localId,
          email: result.data.email,
          token: result.data.idToken,
        })
        .then(res => console.log("Usuario insertado con éxito", res))
        .catch(error => console.log("Error al insertar usuario", error))
      }
  
      navigation.navigate('Cart');
    }
  }, [result, isEnabled, navigation]);
  

  const onSubmit =()=>{
    triggerSignIn({email, password})
  }
  
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
      
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{loading ? 'Iniciando sesión...' : 'Iniciar sesión'}</Text>
      </Pressable>
      
      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Registrate</Text>
      </Pressable>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Mantener sesión</Text>
        
          <Icon name={isEnabled ? "check-circle" : "cancel"} size={30} color={isEnabled ? colors.green : colors.red} />
          <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: colors.gray, true: colors.green }}
            thumbColor={isEnabled ? colors.white : colors.gray}
          />

      </View>
    </View>
  );
};

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

export default SignIn;
