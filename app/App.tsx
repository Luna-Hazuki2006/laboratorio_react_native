import React from 'react';
import Task from './models/Task';
import TaskManager from './views/TaskManager';

import { useQuery } from '@realm/react';

export default function AppNonSync () {
  const [showDone, setShowDone] = React.useState(false);
  const tasks = useQuery(
    Task);

  return (
    <TaskManager tasks={tasks} setShowDone={setShowDone} showDone={showDone} />
  );
};

