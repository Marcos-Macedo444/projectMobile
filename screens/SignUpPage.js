import React, { useState } from 'react';
import { View, TextInput, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const API_URL = 'https://67437f64b7464b1c2a64fdcb.mockapi.io/api/taskfy/users'; // Endpoint para usuários

export default function SignUpPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    // Validações básicas
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      // Verificar se o e-mail já está registrado
      const response = await axios.get(API_URL);
      const existingUser = response.data.find(user => user.email === email);

      if (existingUser) {
        Alert.alert('Erro', 'Este e-mail já está registrado. Tente outro.');
        return;
      }

      // Criar novo usuário
      const user = { email, password };
      const postResponse = await axios.post(API_URL, user);

      if (postResponse.status === 201) {
        // Salvar no AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar usuário. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar usuário. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO</Text>
      <Image source={require('../assets/logo.png')} style={styles.image} />
      <View style={styles.card}>
        {/* E-mail */}
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        
        {/* Senha */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
            <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Confirmar Senha */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={24} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
            <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Botão de Cadastrar */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Botão de Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backButtonText}>Voltar</Text>
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
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00FF00',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  image: {
    width: '80%',
    height: 250,
    alignSelf: 'center',
    marginBottom: 30,
    borderColor: '#00FF00',
  },
  card: {
    backgroundColor: '#2E2E2E',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#3E3E3E',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 15,
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00FF00',
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  backButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingVertical: 8,
    marginVertical: 5,
    alignItems: 'center',
    width: '50%', // Botão menor
    alignSelf: 'center',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FF00',
  },
});
