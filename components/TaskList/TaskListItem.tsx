import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import TaskList from '../../models/TaskList';
import colors from '../../styles/colors';
import shadows from '../../styles/shadows';

type TaskListItemProps = {
    taskList: TaskList;
    onPress: () => void;
    onDelete: () => void;
};

const TaskListItemComponent: React.FC<TaskListItemProps> = ({ taskList, onPress, onDelete }) => {
    return (
        <View style={styles.task}>
            <View style={styles.descriptionContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Text numberOfLines={1} style={styles.description}>
                        {taskList.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.descriptionDate}>
                        {taskList.createdAt.toLocaleString()}
                    </Text>
                </TouchableOpacity>
            </View>
            <Pressable onPress={onDelete} style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
        </View>
    );
};


export default React.memo(TaskListItemComponent);

const styles = StyleSheet.create({
    task: {
        height: 60,
        alignSelf: 'stretch',
        flexDirection: 'row',
        marginVertical: 8,
        backgroundColor: colors.white,
        borderRadius: 5,
        ...shadows,
    },
    descriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    description: {
        paddingTop:10,
        paddingHorizontal: 15,
        color: colors.black,
        fontSize: 20,
    },
    descriptionDate: {
        color: colors.gray,
        fontSize: 13,
        textAlign: 'right',
    },
    deleteButton: {
        justifyContent: 'center',
    },
    deleteText: {
        marginHorizontal: 10,
        color: colors.gray,
        fontSize: 17,
    },
});

