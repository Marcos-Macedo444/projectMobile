import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
      if (username === storedEmail && password === storedPassword) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos.');
      }
    } else {
      Alert.alert('Erro', 'Usuário não cadastrado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>LOGIN</Text>
      <Image source={require('../assets/logo.png')} style={styles.image} />

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#8F8F8F"
            value={username}
            onChangeText={setUsername}
          />
          <Icon name="mail-outline" size={24} color="#000" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#8F8F8F"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
            <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('SignUpPage')}>
          <Text style={styles.buttonTextSecondary}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E', // Fundo mais escuro e moderno
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff', // Cor neon para um efeito tecnológico
    textShadowColor: '#00FF00',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  image: {
    width: '70%',
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
    borderColor: '#00FF00',
  },
  card: {
    backgroundColor: '#2E2E2E', // Card escuro
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#00FF00', // Sombra neon
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF00', // Borda neon
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#3E3E3E', // Fundo escuro para os inputs
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    paddingHorizontal: 10,
    color: '#fff',
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 15,
    color: '#FFF', // Texto branco para contraste
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00FF00', // Botão neon
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#00FF00', // Sombra neon
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E', // Texto escuro para contraste
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    width: '50%', // Reduziu o tamanho do botão de cadastrar
    alignSelf: 'center',
  },
  buttonTextSecondary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00FF00',
  },
});
