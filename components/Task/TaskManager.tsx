import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { BSON } from 'realm';

import TaskList from '../../components/Task/TaskList';
import Task from '../../models/Task';

import { useRealm } from '@realm/react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.content}>
        {/* <AddTaskForm onSubmit={handleAddTask} /> */}
        {tasks.length === 0 ? (
          <Text>Hmmm... Parece que no tienes ningún quehacer que hacer 😉</Text>
        ) : (
          <TaskList tasks={tasks} onToggleTaskStatus={handleToggleTaskStatus} onDeleteTask={handleDeleteTask} />
        )}
      </View>
      <View>
        <View>
          <TouchableOpacity 
            onPress={() => {router.push({
              pathname: '/taskList/[id]/add',
              params: { id },
            });}}>
              <Text style={styles.boton}>➕</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.switchPanel}>
        <Text style={styles.switchPanelText}>Show Completed?</Text>
        <Switch value={showDone} onValueChange={() => setShowDone(!showDone)} />
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boton: {
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'indianred',
    textAlign: 'center',
    width: '15%', 
    alignSelf: 'flex-end', 
  },
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
