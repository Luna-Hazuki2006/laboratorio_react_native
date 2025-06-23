import Realm, { BSON } from 'realm';

class TaskList extends Realm.Object<TaskList> {
  _id!: BSON.ObjectId;
  name!: string;
  tasks!: Realm.List<Realm.Object>;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'TaskList',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      tasks: {
        type: 'list',
        objectType: 'Task',
      },
      createdAt: { type: 'date', default: new Date() },
    },
  };
}

export default TaskList;
