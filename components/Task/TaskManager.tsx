import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { BSON } from 'realm';

import AddTaskForm from '../../components/Task/AddTaskForm';
import TaskList from '../../components/Task/TaskList';
import Task from '../../models/Task';

import { useRealm } from '@realm/react';
import { router, useLocalSearchParams } from 'expo-router';
import shadows from '../../styles/shadows';

export default function TaskManager({
  tasks,
  setShowDone,
  showDone,
}: {
  tasks: Realm.Results<Task & Realm.Object>;
  setShowDone: (showDone: boolean) => void;
  showDone: boolean;
}) {
  const realm = useRealm();
  
  const { id } = useLocalSearchParams<{ id: string }>();
  const taskListId = useMemo(() => new BSON.ObjectId(id as string), [id]);

  const handleAddTask = useCallback(
    (description: string): void => {
      if (!description) return;

      realm.write(() => {
        return realm.create(Task, {
          _id: new BSON.ObjectId(),
          taskListId: taskListId,
          name: 'Sin nombre',
          description,
          isComplete: false,
          expiresAt: new Date(),
          createdAt: new Date(),
          completedAt: new Date(),
        });
      });
    },
    [realm, taskListId]
  );

  const handleToggleTaskStatus = useCallback(
    (task: Task & Realm.Object): void => {
      realm.write(() => {
        task.isComplete = !task.isComplete;
      });

    },
    [realm]
  );

  const handleDeleteTask = useCallback(
    (task: Task & Realm.Object): void => {
      realm.write(() => {
        realm.delete(task);
      });
    },
    [realm]
  );

  return (
    <>
      <View style={styles.content}>
        <AddTaskForm onSubmit={handleAddTask} />
        {tasks.length === 0 ? (
          <Text>No hay ninguna task y tal</Text>
        ) : (
          <TaskList tasks={tasks} onToggleTaskStatus={handleToggleTaskStatus} onDeleteTask={handleDeleteTask} />
        )}
      </View>
      <View style={styles.switchPanel}>
        <Text style={styles.switchPanelText}>Show Completed?</Text>
        <Switch value={showDone} onValueChange={() => setShowDone(!showDone)} />
      </View> 
      <View>
        <TouchableOpacity onPress={() => {router.push({
            pathname: '/taskList/[id]/add',
            params: { id },
        });}}><Text>➕</Text></TouchableOpacity>
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
