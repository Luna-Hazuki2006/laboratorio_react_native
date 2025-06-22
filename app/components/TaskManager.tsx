import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BSON } from 'realm';

import Task from '../models/Task';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

import { useRealm } from '@realm/react';
import shadows from '../styles/shadows';

export default function TaskManager({
  tasks,
  setShowDone,
  showDone,
}: {
  tasks: Realm.Results<Task & Realm.Object>;
  userId?: string;
  setShowDone: (showDone: boolean) => void;
  showDone: boolean;
}) {
  const realm = useRealm();

  const handleAddTask = useCallback(
    (description: string): void => {
      if (!description) return;

      realm.write(() => {
        return realm.create(Task, {
          _id: new BSON.ObjectId(),
          taskListId: new BSON.ObjectId(),
          name: 'Sin nombre',
          description,
          isComplete: false,
          expiresAt: new Date(),
          createdAt: new Date(),
          completedAt: new Date(),
        });
      });
    },
    [realm]
  );

  const handleToggleTaskStatus = useCallback(
    (task: Task & Realm.Object): void => {
      realm.write(() => {
        // Normally when updating a record in a NoSQL or SQL database, we have to type
        // a statement that will later be interpreted and used as instructions for how
        // to update the record. But in RealmDB, the objects are "live" because they are
        // actually referencing the object's location in memory on the device (memory mapping).
        // So rather than typing a statement, we modify the object directly by changing
        // the property values. If the changes adhere to the schema, Realm will accept
        // this new version of the object and wherever this object is being referenced
        // locally will also see the changes "live".
        task.isComplete = !task.isComplete;
      });

      // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
      // realm?.write(() => {
      //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
      //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
      //   task.isComplete = !task.isComplete;
      // });
    },
    [realm]
  );

  const handleDeleteTask = useCallback(
    (task: Task & Realm.Object): void => {
      realm.write(() => {
        realm.delete(task);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
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
      {/* <View style={styles.switchPanel}>
        <Text style={styles.switchPanelText}>Show Completed?</Text>
        <Switch value={showDone} onValueChange={() => setShowDone(!showDone)} />
      </View> */}
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
