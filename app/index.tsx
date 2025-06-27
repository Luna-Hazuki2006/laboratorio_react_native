import React from 'react';
import { aceptar_notificaciones } from "../hooks/sending";
import TaskLists from './taskLists/index';

aceptar_notificaciones()

export default function App()  {
  return (
        <TaskLists />
  );
};


