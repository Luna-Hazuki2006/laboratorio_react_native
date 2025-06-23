import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import TaskList from '../../models/TaskList';
import colors from '../../styles/colors';
import shadows from '../../styles/shadows';

type TaskListItemProps = {
  taskList: TaskList;
  onPress: () => void;
  onDelete: () => void;
};

const TaskListItemComponent: React.FC<TaskListItemProps> = ({ taskList, onPress, onDelete }) => {
  return (
    <View style={styles.task}>
      <View style={styles.descriptionContainer}>
        <Pressable
        onPress={onPress}
        >
        <Text numberOfLines={1} style={styles.description}>
          {taskList.name}
        </Text>
        </Pressable>
      </View>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );
};


export default React.memo(TaskListItemComponent);

const styles = StyleSheet.create({
  task: {
    height: 50,
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
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 17,
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

