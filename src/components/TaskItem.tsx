import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/Pen.png'
import excludeIcon from '../assets/icons/X.png'

interface TaskItemProps {
  item: Task
  index: number
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [ isEditing,  setIsEditing ] = useState(false)
  const [ newTitle,  setNewTitle ] = useState(item.title)

  const textInputRef = useRef<TextInput>(null)  

  function handleStartEditing(){
    setIsEditing(true)
  }
  function handleCancelEditing(){
    setNewTitle(item.title)
    setIsEditing(false)
  }
  function handleSubmitEditing(){
    if(newTitle != ''){
      editTask(item.id, newTitle)

      setIsEditing(false)
    }{
      handleCancelEditing()
    }
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={newTitle}
            editable={isEditing}
            onChangeText={setNewTitle}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
            onBlur={handleCancelEditing}
          />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isEditing?
          <TouchableOpacity
            testID={`exclude-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Image source={excludeIcon} />
          </TouchableOpacity>
          :
          <TouchableOpacity
            testID={`pen-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
          <Image source={penIcon} />
          </TouchableOpacity>
        }
        <View style={styles.separator}/>
        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          style={{ paddingHorizontal: 24, opacity: isEditing? .2: 1}}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }
});