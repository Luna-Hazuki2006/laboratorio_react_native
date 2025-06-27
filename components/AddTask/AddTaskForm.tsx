import { mandar } from "@/hooks/sending";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AddTaskFormProps = {
  onSubmit: (title: string, description: string, dateTime: Date) => void;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultDate?: Date;
  mode: 'add' | 'edit';
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onSubmit,
  defaultTitle = '',
  defaultDescription = '',
  defaultDate = new Date(),
  mode
}) => {
    const [titulo, setTitulo] = useState(defaultTitle);
    const [descripcion, setDescripcion] = useState(defaultDescription);
    const [date, setDate] = useState<Date>(defaultDate);
    const [modeD, setModeD] = useState<'date' | 'countdown' | 'datetime' | 'time'>('date');
    const [show, setShow] = useState(false);
    const handleSubmit = () => {
        onSubmit(titulo, descripcion, date);
        mandar(titulo, descripcion)
        setTitulo('');
        setDescripcion('')
        // if (date > (new Date())) {
        //     router.push({
        //         pathname: '/taskLists'
        //     })
        // }
        setDate(new Date())
    };

    const onChange = (ev : DateTimePickerEvent, selectedDate? : Date | undefined) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate((!currentDate) ? (new Date()) : currentDate);
    };
    
    const showMode = (currentMode : 'date' | 'countdown' | 'datetime' | 'time') => {
        setShow(true);
        setModeD(currentMode);
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView className="flex-1 p-4 bg-gray-100">
            <Text className="text-xl font-bold text-center mb-4">{mode === 'edit' ? 'Modify Task' : 'Add new task'}</Text>
            <Text>Título: </Text>
            <TextInput 
                value={titulo} 
                placeholder="Enter the name of your task"
                onChangeText={setTitulo}
                autoCapitalize="none"
                autoCorrect={true}
                className="bg-white rounded-md px-3 py-2 mt-2 mb-4 text-base"
            />
            <Text>Descripción: </Text>
            <TextInput 
                value={descripcion} 
                placeholder="Enter the description of your task"
                onChangeText={setDescripcion}
                autoCapitalize="none"
                autoCorrect={true}
                className="bg-white rounded-md px-3 py-2 mt-2 mb-4 text-base"
            />
            {/* <Text>Fecha de vencimiento: </Text> */}
            {/* <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" /> */}
            <View className="flex flex-row justify-start space-x-4 mb-4">
                <TouchableOpacity className="bg-red-400 px-3 py-2 rounded-lg mr-3" onPress={showDatepicker}>
                    <Text className="text-white text-xl">📅</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-400 px-3 py-2 rounded-lg  ml-3 " onPress={showTimepicker}>
                    <Text className="text-white text-xl">⌚</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-base font-semibold">Fecha de vencimiento: </Text>
            <Text className="bg-white rounded-md px-3 py-2 mt-2 mb-4 text-base">{date.toLocaleString()}</Text>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={modeD}
                is24Hour={true}
                onChange={onChange}
                />
            )}
            <View>
                <TouchableOpacity className="bg-red-500 px-5 py-3 rounded-lg self-center mt-4" onPress={handleSubmit}>
                    <Text className="text-white font-bold text-lg">{mode === 'edit' ? 'Modify' : 'Add'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default AddTaskForm