import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const alreadyTitle = tasks.find((item) => {
      if(item.title == newTaskTitle){
        return true
      }else false
    })
    // if(alreadyTitle){
    //   Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    // }else{
      const newTask:Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done:  false,
      }
      setTasks([...tasks, newTask])
    // }
  }

  function handleToggleTaskDone(id: number) {
    const doneArray: Array<Task> = []
    tasks.map((item) => {
      if(item.id == id){
        doneArray.push({
          id: item.id,
          title: item.title,
          done: !item.done,
        })
      }else{
        doneArray.push(item)
      }
    })
    setTasks(doneArray)
  }
  
  function handleRemoveTask(id: number) {
    // Alert.alert(
    //   'Remover item',
    //   'Tem certeza que você deseja remover esse item?',
    //   [ 
    //     {text: 'Não'},
    //     {text: 'Sim', onPress: () => {
          const filtered = tasks.filter((item) =>  {
            return item.id != id
          })
          setTasks(filtered)
    //     }}
    //   ]
    // )
  }

  function handleEditTask(id: number, title: string){
    const doneArray: Array<Task> = []
    tasks.map((item) => {
      if(item.id == id){
        doneArray.push({
          id: item.id,
          title: title,
          done: item.done,
        })
      }else{
        doneArray.push(item)
      }
    })
    setTasks(doneArray)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})