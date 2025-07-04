import { Realm } from '@realm/react';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import Task from '../../models/Task';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Realm.Results<Task & Realm.Object>;
  onToggleTaskStatus: (task: Task & Realm.Object) => void;
  onDeleteTask: (task: Task & Realm.Object) => void;
  onEditTask: (task: Task & Realm.Object) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTaskStatus, onDeleteTask, onEditTask }) => {

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        keyExtractor={(task) => task._id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleStatus={() => onToggleTaskStatus(item)}
            onDelete={() => onDeleteTask(item)}
            onEdit={() => onEditTask(item)}
            />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TaskList;
