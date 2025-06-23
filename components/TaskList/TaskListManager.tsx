import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BSON } from 'realm';

import AddTaskListForm from '../../components/TaskList/AddTaskListForm';
import TaskListList from '../../components/TaskList/TaskListList';
import TaskList from '../../models/TaskList';

import { useRealm } from '@realm/react';
import shadows from '../../styles/shadows';

export default function TaskListManager({
  taskLists,
}: {
  taskLists: Realm.Results<TaskList & Realm.Object>;
}) {
  const realm = useRealm();
  const router = useRouter();

  const handleAddTask = useCallback(
    (name: string): void => {
      if (!name) return;

      realm.write(() => {
        return realm.create(TaskList, {
          _id: new BSON.ObjectId(),
          name,
          tasks: [],
          createdAt: new Date(),
        });
      });
    },
    [realm]
  );


  const handleDeleteTaskList = useCallback(
    (taskList: TaskList & Realm.Object): void => {
      realm.write(() => {
        realm.delete(taskList);
      });
    },
    [realm]
  );

  const handlePressTaskList = useCallback(
  (taskList: TaskList & Realm.Object) => {
    const id = (taskList._id as BSON.ObjectId).toHexString();
    router.push({
      pathname: '/taskList/[id]',
      params: { id },
    });
  },
  [router]
);

  return (
    <>
      <View style={styles.content}>
        <AddTaskListForm onSubmit={handleAddTask} />
        {taskLists.length === 0 ? (
          <Text>Theres no task lists</Text>
        ) : (
          <TaskListList taskLists={taskLists} onDeleteTaskList={handleDeleteTaskList} onPressTaskList={ handlePressTaskList } />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  switchPanel: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    ...shadows,
  },
  switchPanelText: {
    flex: 1,
    fontSize: 16,
    padding: 5,
  },
});
