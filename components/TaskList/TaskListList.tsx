import { Realm } from '@realm/react';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import TaskList from '../../models/TaskList';
import TaskListItem from './TaskListItem';

type TaskListProps = {
  taskLists: Realm.Results<TaskList & Realm.Object>;
  onPressTaskList: (taskList: TaskList & Realm.Object) => void;
  onDeleteTaskList: (taskList: TaskList & Realm.Object) => void;
};

const TaskListList: React.FC<TaskListProps> = ({ taskLists, onPressTaskList, onDeleteTaskList }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={taskLists}
        keyExtractor={(taskList) => taskList._id.toString()}
        renderItem={({ item }) => (
          <TaskListItem
            taskList={item}
            onDelete={() => onDeleteTaskList(item)}  
            onPress={() => onPressTaskList(item)}  
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

export default TaskListList;
