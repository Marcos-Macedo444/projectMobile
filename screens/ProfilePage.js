import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ProfilePage({ navigation }) {
  const route = useRoute();
  const { taskCount } = route.params; // Recebe a quantidade de tarefas passada como parâmetro

  const handleLogout = () => {
    navigation.navigate('Login'); // Navegar para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Image 
        source={require('../assets/logo.png')}  // Adicionando a logo do app
        style={styles.logo} 
      />
      <View style={styles.profileCard}>
        <Image 
          source={require('../assets/profile-image.png')} 
          style={styles.profileImage} 
        />
        <Text style={styles.username}>Olá, Marcos Macêdo</Text>

        {/* Adicionando a quantidade de tarefas */}
        <Text style={styles.taskCountText}>Você tem {taskCount} tarefas</Text>

        <TouchableOpacity style={styles.taskButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.taskButtonText}>Minhas Tarefas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E', // Fundo escuro para combinar com a HomeScreen
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Cor neon para manter a consistência
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  logo: {
    width: '70%', // 70% da largura da tela
    height: 250, // Altura da logo
    marginBottom: 20, // Espaçamento entre a logo e o card
    resizeMode: 'contain', // Para manter a proporção da imagem
  },
  profileCard: {
    backgroundColor: '#2E2E2E', // Fundo do card
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  profileImage: {
    width: 100, // Tamanho da imagem
    height: 100,
    borderRadius: 50, // Borda arredondada para a imagem
    marginBottom: 10,
  },
  username: {
    fontSize: 22, // Aumentar o tamanho do texto
    color: '#FFF', // Texto branco para contraste
    marginTop: 10,
  },
  taskCountText: {
    fontSize: 18, // Tamanho do texto para a quantidade de tarefas
    color: '#00FF00', // Cor do texto para destaque
    marginVertical: 10,
  },
  taskButton: {
    backgroundColor: '#00FF00', // Botão neon
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#00FF00', // Sombra neon
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  taskButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E', // Texto escuro para contraste
  },
  logoutButton: {
    marginTop: 10, // Ajusta o espaçamento entre os botões
    padding: 12,
    backgroundColor: '#00FF00', // Botão neon
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutText: {
    color: '#1E1E1E', // Texto escuro para contraste
    fontWeight: 'bold',
  },
});
