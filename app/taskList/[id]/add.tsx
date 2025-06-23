import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"

const AddTaskForm = () => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [date, setDate] = useState<Date>(new Date(1598051730000));
    const [mode, setMode] = useState<'date' | 'countdown' | 'datetime' | 'time'>('date');
    const [show, setShow] = useState(false);

    const onChange = (ev : DateTimePickerEvent, selectedDate? : Date | undefined) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate((!currentDate) ? (new Date()) : currentDate);
    };

    const showMode = (currentMode : 'date' | 'countdown' | 'datetime' | 'time') => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            <Text>Título: </Text>
            <TextInput 
                value={titulo} 
                placeholder="Enter the name of your task"
                onChangeText={setTitulo}
                autoCapitalize="none"
                autoCorrect={true}
                style={styles.textInput}
            />
            <Text>Descripción: </Text>
            <TextInput 
                value={descripcion} 
                placeholder="Enter the description of your task"
                onChangeText={setDescripcion}
                autoCapitalize="none"
                autoCorrect={true}
                style={styles.textInput}
            />
            <Text>Fecha de vencimiento: </Text>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
            <Text>selected: {date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        
    },
    textInput: {
        borderRadius: 5, 
        backgroundColor: 'white', 
        paddingLeft: 10, 
        margin: 10, 
        fontSize: 16
    }
});

export default AddTaskForm