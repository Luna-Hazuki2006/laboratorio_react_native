import React from 'react';
import TaskListManager from '../../components/TaskList/TaskListManager';
import TaskList from '../../models/TaskList';

import { useQuery } from '@realm/react';

export default function TasksListView () {
  const taskLists = useQuery(
    TaskList);
  return (
    <TaskListManager taskLists={taskLists} />
  );
};

