// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen({ navigation }) {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [urgent, setUrgent] = useState('opcional');
  const [profileImage, setProfileImage] = useState(require('../assets/profile-image.png'));
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  };

  const addTask = async () => {
    if (!task.trim()) {
      Alert.alert('Erro', 'Por favor, adicione uma tarefa!');
      return;
    }
    const updatedTasks = [...taskList, { task, urgent, dueDate }];
    setTaskList(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTask('');
    setUrgent('opcional');
    setDueDate(new Date());
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Adicionar tarefa"
        value={task}
        onChangeText={setTask}
      />
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

      <Button title="Adicionar Tarefa" onPress={addTask} />

      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task} - {item.urgent} - {item.dueDate.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => deleteTask(item)}>
              <Icon name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button title="Limpar Lista" onPress={clearTasks} />

      {/* Ícone de perfil com imagem de perfil */}
      <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('ProfilePage')}>
        <Image source={profileImage} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
  },
  urgentButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 5,
  },
  urgentText: {
    fontSize: 16,
  },
  selectedUrgent: {
    fontWeight: 'bold',
    color: 'blue',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#4A90E2', 
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 3, 
  },
  dateText: {
    fontSize: 16,
    color: '#fff', 
  },
  profileIcon: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
