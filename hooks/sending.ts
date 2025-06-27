import * as Notifications from 'expo-notifications';

// First, set the handler that will cause the notification
// to show the alert
export async function aceptar_notificaciones() {
    let datos = await Notifications.requestPermissionsAsync()
    console.log(datos);
    
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowBanner: true,
            shouldShowList: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}

export function mandar(titulo : string, descripcion : string) {
    let info = Notifications.scheduleNotificationAsync({
        content: {
            title: titulo,
            body: `Recuerda: ${descripcion}`,
            sound: 'notificacion.wav'
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, 
            seconds: 300, 
            repeats: false
        }
    });
    console.log(info);
    
}