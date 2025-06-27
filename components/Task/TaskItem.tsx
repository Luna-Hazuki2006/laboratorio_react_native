import { Checkbox } from "expo-checkbox";
import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Task from '../../models/Task';
import colors from '../../styles/colors';
import shadows from '../../styles/shadows';

type TaskItemProps = {
  task: Task;
  onToggleStatus: () => void;
  onEdit: (task: Task & Realm.Object) => void;
  onDelete: () => void;
};

const TaskItemComponent: React.FC<TaskItemProps> = ({ task, onToggleStatus, onEdit, onDelete }) => {

  return (
    <View style={styles.task}>
      <Checkbox 
        style={[styles.status, task.isComplete && styles.completed]} 
        value={task.isComplete} onValueChange={onToggleStatus}/>
      {/* <Pressable
        onPress={onToggleStatus}
        style={[styles.status, task.isComplete && styles.completed]}>
        <Text style={styles.icon}>{task.isComplete ? '✓' : '○'}</Text>
      </Pressable> */}
      <View style={styles.descriptionContainer}>
        <TouchableOpacity onPress={() => onEdit(task as Task & Realm.Object)}>
          <Text numberOfLines={1} style={styles.description}>
            {task.name}
          </Text>
          <Text className="text-left mb-3 ml-2" numberOfLines={1} style={styles.descriptionDate}>
            Until: {task.expiresAt.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
};


export default React.memo(TaskItemComponent);

const styles = StyleSheet.create({
  task: {
    height: 60,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...shadows,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
        paddingTop:10,
        paddingHorizontal: 15,
        color: colors.black,
        fontSize: 20,
  },
  descriptionDate: {
        color: colors.gray,
        fontSize: 13,
        textAlign: 'right',
    },
  status: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: colors.gray,
  },
  completed: {
    backgroundColor: colors.purple,
  },
  deleteButton: {
    justifyContent: 'center',
  },
  deleteText: {
    marginHorizontal: 10,
    color: colors.gray,
    fontSize: 17,
  },
  icon: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

