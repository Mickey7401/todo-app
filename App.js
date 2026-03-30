import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Pressable,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Finish homework', completed: false },
    { key: '2', description: 'Study for quiz', completed: true },
    { key: '3', description: 'Clean my room', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;

    const task = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };

    setTasks((prev) => [...prev, task]);
    setNewTask('');
  };

  const toggleTask = (key) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === key
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => toggleTask(item.key)} style={styles.task}>
      <Text
        style={[
          styles.text,
          item.completed && styles.completed
        ]}
      >
        {item.description}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO App</Text>

      <TextInput
        placeholder="Enter a task"
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  task: {
    padding: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
});