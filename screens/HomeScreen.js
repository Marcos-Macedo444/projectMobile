import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen({ navigation }) {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [urgent, setUrgent] = useState('opcional');
  const [profileImage, setProfileImage] = useState(require('../assets/logo.png'));
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const tarefasDiarias = [
    "Ir à academia",
    "Estudar para a prova",
    "Cozinhar o jantar",
    "Ler um livro",
    "Fazer compras no mercado",
    "Limpar a casa",
    "Fazer exercícios",
    "Meditar pela manhã",
    "Assistir a um filme",
    "Participar de trabalho voluntário",
    "Praticar um novo idioma",
    "Escrever no meu diário",
    "Cuidar do jardim",
    "Ir ao mercado",
    "Aperfeiçoar minhas habilidades culinárias",
    "Organizar minha mesa de trabalho",
    "Jogar um jogo",
    "Fazer um passeio",
    "Fazer um curso online",
    "Escutar música",
    "Correr no parque",
    "Caminhar na praia",
    "Fazer uma entrevista de emprego",
    "Assistir a um documentário",
    "Preparar um almoço especial",
    "Aprender a tocar um instrumento",
    "Praticar meditação guiada",
    "Fazer um planejamento financeiro",
    "Visitar um museu",
    "Escrever um poema",
    "Fazer um trabalho manual",
    "Participar de um workshop",
    "Criar um blog ou vlog",
    "Fazer um piquenique",
    "Jogar um jogo de tabuleiro",
    "Planejar uma viagem",
    "Fazer um desenho",
    "Praticar yoga",
    "Assistir a um show ou concerto",
    "Fazer um dia de spa em casa",
    "Estudar história",
    "Organizar fotos ou memórias",
    "Fazer uma atividade em família",
    "Ler um artigo científico",
    "Participar de um grupo de leitura",
    "Desenvolver um projeto pessoal",
    "Voluntariar-se em uma ONG",
    "Fazer um brainstorm de ideias",
    "Participar de uma reunião",
    "Preparar uma apresentação",
    "Revisar um relatório",
    "Enviar e-mails",
    "Fazer networking",
    "Buscar inspiração",
    "Atualizar meu currículo",
    "Realizar uma pesquisa",
    "Planejar meu dia",
    "Descansar",
    "Tomar um café",
    "Preparar um chá",
    "Fazer uma ligação importante",
    "Agendar uma reunião",
    "Estudar finanças",
    "Assistir a uma aula online",
    "Fazer um curso de atualização",
    "Praticar escrita criativa",
    "Ler notícias",
    "Explorar novas receitas",
    "Cuidar da pele",
    "Fazer uma caminhada matinal",
    "Ir ao médico",
    "Ir ao dentista",
    "Cuidar das finanças pessoais",
    "Revisar metas pessoais",
    "Estabelecer novas metas",
    "Fazer um balanço do dia",
    "Relaxar",
    "Desenhar",
    "Pintar",
    "Fazer uma chamada de vídeo",
    "Organizar documentos",
    "Planejar um evento",
    "Fazer uma sessão de fotos",
    "Atualizar redes sociais",
    "Ler um blog",
    "Escrever um artigo",
    "Desenvolver um aplicativo",
    "Praticar programação",
    "Testar um novo hobby",
    "Fazer uma doação",
    "Ajudar um amigo",
    "Revisar um projeto",
    "Participar de um grupo de estudo",
    "Preparar um jantar temático",
    "Estudar marketing digital",
    "Praticar habilidades de liderança",
    "Participar de uma conferência",
    "Explorar um novo bairro",
    "Fazer uma trilha",
    "Visitar um parque",
    "Aprender sobre investimento",
    "Criar uma playlist",
    "Andar de bicicleta",
    "Nadar",
    "Passear ao ar livre",
];



  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks).map(task => ({
        ...task,
        dueDate: new Date(task.dueDate),
      }));
      setTaskList(parsedTasks);
    }
  };

  const addTask = async () => {
    if (!task.trim()) {
      Alert.alert('Erro', 'Por favor, adicione uma tarefa!');
      return;
    }

    const existingTask = taskList.find(item => 
      item.task === task && 
      item.dueDate.toLocaleDateString() === dueDate.toLocaleDateString()
    );

    if (existingTask) {
      Alert.alert('Erro', 'Esta tarefa já existe para a mesma data!');
      return;
    }

    const updatedTasks = [...taskList, { task, urgent, dueDate }];
    setTaskList(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTask('');
    setUrgent('opcional');
    setDueDate(new Date());
    setMostrarSugestoes(false);
  };

  const deleteTask = async (taskToDelete) => {
    const updatedTasks = taskList.filter(item => item.task !== taskToDelete.task);
    setTaskList(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const clearTasks = async () => {
    await AsyncStorage.removeItem('tasks');
    setTaskList([]);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || dueDate;
    setShowTimePicker(false);
    setDueDate(currentTime);
  };

  const handleSuggestionPress = (suggestion) => {
    setTask(suggestion);
    setMostrarSugestoes(false);
  };

  const filteredSuggestions = tarefasDiarias.filter(suggestion => 
    suggestion.toLowerCase().includes(task.toLowerCase())
  );

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Minhas Tarefas</Text>    
    <Text style={styles.taskCount}>Você tem {taskList.length} tarefas</Text>

      <Image source={profileImage} style={styles.profileImage} />

      <TextInput
  style={styles.input}
  placeholder="Adicionar tarefa"
  value={task}
  onChangeText={setTask}
  onFocus={() => setMostrarSugestoes(true)}
  keyboardType="default"  // Esta linha permite acentuação
/>


      {mostrarSugestoes && (
        <View style={styles.suggestionsContainer}>
          <TouchableOpacity style={styles.customizeButton} onPress={() => setTask('')}>
            <Text style={styles.customizeText}>Personalizar Tarefa</Text>
          </TouchableOpacity>
          <FlatList
            data={filteredSuggestions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionList}
          />
        </View>
      )}

      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Urgência:</Text>
        <TouchableOpacity onPress={() => setUrgent('imediato')} style={styles.urgentButton}>
          <Text style={urgent === 'imediato' ? styles.selectedUrgent : styles.urgentText}>Imediato</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUrgent('opcional')} style={styles.urgentButton}>
          <Text style={urgent === 'opcional' ? styles.selectedUrgent : styles.urgentText}>Opcional</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUrgent('não imediato')} style={styles.urgentButton}>
          <Text style={urgent === 'não imediato' ? styles.selectedUrgent : styles.urgentText}>Não Imediato</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>Escolher Data: {dueDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>Escolher Hora: {dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={dueDate}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      <Button title="Adicionar Tarefa" onPress={addTask} />

      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>
              {item.task} - {item.urgent} - {item.dueDate instanceof Date ? item.dueDate.toLocaleString() : 'Data inválida'}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item)}>
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Limpar Lista" onPress={clearTasks} />

    <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('ProfilePage', { taskCount: taskList.length })}>
      <Image source={require('../assets/profile-image.png')} style={styles.profileImageSmall} />
    </TouchableOpacity>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  profileImage: {
    width: '65%',
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#3E3E3E',
    color: '#FFF',
    fontSize: 16,
  },
  suggestionsContainer: {
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  suggestionText: {
    color: '#FFF',
    paddingVertical: 5,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    color: '#fff',
  },
  urgentButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 10,
    backgroundColor: '#3E3E3E',
    marginHorizontal: 5,
  },
  urgentText: {
    fontSize: 16,
    color: '#FFF',
  },
  selectedUrgent: {
    fontWeight: 'bold',
    color: '#00FF00',
  },
  dateButton: {
    backgroundColor: '#00FF00',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#00FF00',
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  profileIcon: {
    width: 50,
    height: 50,
    position:'absolute',
    marginLeft:350,
    marginTop:35,
  },
  profileImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  customizeButton: {
    padding: 10,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    alignItems: 'center',
  },
  customizeText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  taskCount: {
    fontSize: 18,
    color: '#00FF00', // Cor do texto, pode ser ajustada
    textAlign: 'center',
    marginBottom: 20, // Espaçamento abaixo do contador
  },
});
