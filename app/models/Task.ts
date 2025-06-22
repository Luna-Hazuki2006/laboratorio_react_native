import { BSON, ObjectSchema, Realm } from 'realm';

class Task extends Realm.Object<Task> {
  _id!: BSON.ObjectId;
  taskListId!: BSON.ObjectId;
  name!: string;
  description!: string;
  isComplete!: boolean;
  expiresAt!: Date;
  createdAt!: Date;
  completedAt!: Date;

  static schema: ObjectSchema = {
    name: 'Task',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      taskListId: 'objectId',
      name: 'string',
      description: 'string',
      isComplete: { type: 'bool', default: false },
      expiresAt: 'date',
      createdAt: { type: 'date', default: new Date() },
      completedAt: 'date',
    },
  };
}

export default Task;
