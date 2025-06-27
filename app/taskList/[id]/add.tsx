import AddTaskManager from '@/components/AddTask/AddTaskManager';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function AddTaskView() {

    const { id, taskId, name, description, expiresAt, mode } = useLocalSearchParams();

    // No toco esto porque me da miedo

    // lo dejaré for the jajas

    return (
      <>
        <Stack.Screen options={{ title: mode === 'edit' ? 'Modify task' : 'Add Task'}} />
        <AddTaskManager
        mode={mode as 'edit' | 'add'}
        initialValues={{
          id: id as string,
          taskId: taskId as string,
          name: name as string | undefined,
          description: description as string | undefined,
          expiresAt: expiresAt ? new Date(expiresAt as string) : undefined,
        }}
      />
    </>
    );
}