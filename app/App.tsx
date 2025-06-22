import React from 'react';
import TaskManager from './components/TaskManager';
import Task from './models/Task';

import { useQuery } from '@realm/react';

export default function AppNonSync () {
  const [showDone, setShowDone] = React.useState(false);
  const tasks = useQuery(
    Task);

  return (
    <TaskManager tasks={tasks} setShowDone={setShowDone} showDone={showDone} />
  );
};

