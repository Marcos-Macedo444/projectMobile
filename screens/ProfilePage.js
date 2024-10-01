// screens/ProfilePage.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfilePage({ navigation }) {
  const handleLogout = () => {
    // Lógica de logout pode ser adicionada aqui, se necessário
    navigation.navigate('Login'); // Navegar para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.profileInfo}>
        <Image 
          source={require('../assets/profile-image.png')} // Certifique-se de que o caminho está correto
          style={styles.profileImage}
        />
        <Text style={styles.username}>Olá, Marcos Macêdo</Text>
      </View>
      <Button title="Ir para Minhas Tarefas" onPress={() => navigation.navigate('Home')} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100, // Ajuste o tamanho da imagem conforme necessário
    height: 100,
    borderRadius: 50, // Borda arredondada para a imagem
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
