import AddTaskManager from '@/components/AddTask/AddTaskManager';
import Task from '@/models/Task';
import { useQuery } from '@realm/react';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { BSON } from 'realm';

export default function TasksView() {
    const [showDone, setShowDone] = React.useState(false);
    const { id } = useLocalSearchParams();
    const idObjectId = new BSON.ObjectId(id as string);

    // No toco esto porque me da miedo
    const tasks = useQuery(
        Task,
        collection =>
            showDone
                ? collection.sorted('createdAt').filtered('taskListId == $0', idObjectId)
                : collection.filtered('isComplete == false').sorted('createdAt').filtered('taskListId == $0', idObjectId),
        [idObjectId, showDone]
    );

    return (
        <AddTaskManager tasks={tasks} setShowDone={setShowDone} showDone={showDone} />
    );
}