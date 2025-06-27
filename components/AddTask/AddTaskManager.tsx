import React, { useCallback, useMemo } from 'react';
import { BSON } from 'realm';

import AddTaskForm from '@/components/AddTask/AddTaskForm';
import Task from '../../models/Task';

import { useRealm } from '@realm/react';
import { router, useLocalSearchParams } from 'expo-router';


type AddTaskManagerProps = {
  mode: 'add' | 'edit';
  initialValues: {
    id: string;
    taskId?: string;
    name?: string;
    description?: string;
    expiresAt?: Date;
  };
};

export default function TaskManager({ mode, initialValues }: AddTaskManagerProps) {
    const realm = useRealm();
    
    const { id } = useLocalSearchParams<{ id: string }>();
    const taskListId = useMemo(() => new BSON.ObjectId(id as string), [id]);

    const handleAddTask = useCallback(
        (title: string, description: string, dateTime: Date): void => {
            if (!title) {
                alert('Necesitas un título')
                return
            }
            if (!description) {
                alert('Necestias una descripción')
                return
            }

            if (dateTime <= (new Date())) {
                alert('No puedes viajar en el tiempo')
                return
            }

            realm.write(() => {
                if (mode === 'edit' && initialValues.taskId) {
                 const task = realm.objectForPrimaryKey(Task, new BSON.ObjectId(initialValues.taskId));
                    if (task) {
                        task.name = title;
                        task.description = description;
                        task.expiresAt = dateTime;
                    }
                } else {
                    realm.create(Task, {
                        _id: new BSON.ObjectId(),
                        taskListId: taskListId,
                        name: title,
                        description,
                        isComplete: false,
                        expiresAt: dateTime,
                        createdAt: new Date(),
                        completedAt: new Date(),
                    });
                }
            });
            router.push({ pathname: '/taskList/[id]', params: { id: initialValues.id } });
        },
        [realm, taskListId, initialValues.taskId, initialValues.id, mode]
    );

    return (
        <AddTaskForm
            onSubmit={handleAddTask}
            defaultTitle={initialValues.name}
            defaultDescription={initialValues.description}
            defaultDate={initialValues.expiresAt}
            mode={mode}
        />
    );
};