import React, { useState } from "react";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  
  const addTask = () => {
    if (taskText.trim() === "") {
      Alert.alert("Empty Task", "Please enter a task before adding.");
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };


  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  
  const renderItem = ({ item }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteActionText}>Delete</Text>
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.taskItem}>
          <TouchableOpacity
            onPress={() => toggleTask(item.id)}
            style={{ flex: 1 }}
          >
            <Text
              style={[styles.taskText, item.done && styles.taskTextDone]}
              numberOfLines={1}
            >
              {item.text}
            </Text>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <Text style={styles.checkbox}>{item.done ? "✅" : "⬜"}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
       
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter new task"
            value={taskText}
            onChangeText={setTaskText}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#f9f9f9",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007BFF",
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eee",
  },
  taskText: {
    fontSize: 16,
  },
  taskTextDone: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  checkbox: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  deleteButton: {
    fontSize: 18,
    color: "red",
  },
  deleteAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 5,
    marginVertical: 2,
  },
  deleteActionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
