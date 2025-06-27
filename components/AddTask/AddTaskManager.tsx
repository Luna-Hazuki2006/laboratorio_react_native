import React, { useCallback, useMemo } from 'react';
import { BSON } from 'realm';

import AddTaskForm from '@/components/AddTask/AddTaskForm';
import Task from '../../models/Task';

import { useRealm } from '@realm/react';
import { useLocalSearchParams } from 'expo-router';

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
                return realm.create(Task, {
                    _id: new BSON.ObjectId(),
                    taskListId: taskListId,
                    name: title,
                    description,
                    isComplete: false,
                    expiresAt: dateTime,
                    createdAt: new Date(),
                    completedAt: new Date(),
                });
            });
        },
        [realm, taskListId]
    );

    return (
        <AddTaskForm onSubmit={handleAddTask}></AddTaskForm>
    );
};