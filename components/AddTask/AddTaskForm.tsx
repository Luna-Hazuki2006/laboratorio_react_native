import { mandar } from "@/hooks/sending";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AddTaskFormProps = {
    onSubmit: (title : string, description : string, dateTime : Date) => void;
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({onSubmit}) => {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [date, setDate] = useState<Date>(new Date());
    const [mode, setMode] = useState<'date' | 'countdown' | 'datetime' | 'time'>('date');
    const [show, setShow] = useState(false);
    const handleSubmit = () => {
        onSubmit(titulo, descripcion, date);
        mandar(titulo, descripcion)
        setTitulo('');
        setDescripcion('')
        if (date > (new Date())) {
            router.push({
                pathname: '/taskLists'
            })
        }
        setDate(new Date())
    };

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
        <SafeAreaView style={estilos.fondo}>
            <Text>Título: </Text>
            <TextInput 
                value={titulo} 
                placeholder="Enter the name of your task"
                onChangeText={setTitulo}
                autoCapitalize="none"
                autoCorrect={true}
                style={estilos.textInput}
            />
            <Text>Descripción: </Text>
            <TextInput 
                value={descripcion} 
                placeholder="Enter the description of your task"
                onChangeText={setDescripcion}
                autoCapitalize="none"
                autoCorrect={true}
                style={estilos.textInput}
            />
            {/* <Text>Fecha de vencimiento: </Text> */}
            {/* <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" /> */}
            <View style={estilos.division}>
                <TouchableOpacity style={estilos.tiempo} onPress={showDatepicker}>
                    <Text>📅</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.tiempo} onPress={showTimepicker}>
                    <Text>⌚</Text>
                </TouchableOpacity>
            </View>
            <Text>Fecha de vencimiento: </Text>
            <Text style={estilos.textInput}>{date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                />
            )}
            <View>
                <TouchableOpacity style={estilos.boton} onPress={handleSubmit}>
                    <Text>Añadir</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    fondo: {
        flex: 1, 
        padding: 10
    },
    tiempo: {
        backgroundColor: 'indianred', 
        padding: 5, 
        margin: 5,
        borderRadius: 10
    }, 
    division: {
        display: 'flex', 
        flexDirection: 'row'
    }, 
    textInput: {
        borderRadius: 5, 
        backgroundColor: 'white', 
        paddingLeft: 10, 
        // margin: 10, 
        marginBottom: 10, 
        marginTop: 10, 
        fontSize: 16
    }, 
    boton: {
        backgroundColor: 'indianred',
        flexDirection: 'row', 
        alignContent: 'center',
        textAlign: 'center', 
        alignSelf: 'center', 
        margin: 5,
        padding: 5,
        borderRadius: 10
    }
});

export default AddTaskForm