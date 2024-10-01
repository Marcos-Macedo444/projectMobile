// screens/SignUpPage.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando o Ionicons

export default function SignUpPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Para alternar a visibilidade da senha

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const user = { email, password };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login-image.png')} style={styles.image} />
      <Text style={styles.title}>CADASTRO</Text>
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={24} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E90FF', // Fundo azul
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  image: {
    width: '80%',
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff', // Borda branca para harmonizar com o fundo
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  icon: {
    paddingHorizontal: 10,
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#fff', // Cor do botão
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#1E90FF', // Cor do texto do botão
    fontWeight: 'bold',
  },
});
