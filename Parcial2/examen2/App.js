//Hernandez Gonzalez Alejandro
//4-B
//14/03/2024

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TodosScreen = () => {
  const [todosResueltos, setTodosResueltos] = useState([]);
  const [todosNoResueltos, setTodosNoResueltos] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  useEffect(() => {
    const url = "http://jsonplaceholder.typicode.com/todos";

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const resueltos = data.filter(todo => todo.completed);
        const noResueltos = data.filter(todo => !todo.completed);
        setTodosResueltos(resueltos);
        setTodosNoResueltos(noResueltos);
      })
      .catch(error => console.error("Error al obtener la lista de pendientes:", error));
  }, []);

  const handleOptionSelect = (opcion) => {
    switch (opcion) {
      case "1":
        setOpcionSeleccionada(todosResueltos.map(elemento => <Text key={elemento.id}>{elemento.id}</Text>));
        break;
      case "2":
        setOpcionSeleccionada(todosResueltos.map(elemento => <Text key={elemento.id}>{`${elemento.id}: ${elemento.title}`}</Text>));
        break;
      case "3":
        setOpcionSeleccionada(todosNoResueltos.map(elemento => <Text key={elemento.id}>{`${elemento.id}: ${elemento.title}`}</Text>));
        break;
      case "4":
        setOpcionSeleccionada(todosResueltos.map(elemento => <Text key={elemento.id}>{`${elemento.id}: ${elemento.title}`}</Text>));
        break;
      case "5":
        setOpcionSeleccionada(todosResueltos.map(elemento => <Text key={elemento.id}>{`${elemento.id}: ${elemento.userId}`}</Text>));
        break;
      case "6":
        setOpcionSeleccionada(todosResueltos.map(elemento => <Text key={elemento.id}>{`${elemento.id}: ${elemento.userId}`}</Text>));
        break;
      case "7":
        setOpcionSeleccionada(todosNoResueltos.map(elemento => <Text key={elemento.id}>{`${elemento.id}: ${elemento.userId}`}</Text>));
        break;
      case "0":
        setOpcionSeleccionada(null);
        break;
      default:
        setOpcionSeleccionada(<Text>Opción no válida</Text>);
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!opcionSeleccionada ? (
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("1")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes (solo IDs)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("2")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes (IDs y Títulos)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("3")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes sin resolver (ID y Título)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("4")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes resueltos (ID y Título)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("5")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes (IDs y userID)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("6")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes resueltos (ID y userID)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => handleOptionSelect("7")}>
            <Text style={styles.buttonText}>Lista de todos los pendientes sin resolver (ID y userID)</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView>
          {opcionSeleccionada}
          <TouchableOpacity style={styles.menuButton} onPress={() => setOpcionSeleccionada(null)}>
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  menuButton: {
    backgroundColor: 'purple',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TodosScreen;
