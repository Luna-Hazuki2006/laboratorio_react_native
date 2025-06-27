import { RealmProvider } from '@realm/react';
import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

import '../global.css';
import schemas from '../models';
import colors from '../styles/colors';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider schema={schemas}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="index" options={{ title: 'My Lists' }}/>
          <Stack.Screen name="taskLists/index" options={{ title: 'My Lists' }} />
          <Stack.Screen name="taskList/[id]" options={{ title: 'My Tasks' }}  />
          <Stack.Screen name="taskList/[id]/add" />
        </Stack>
      </RealmProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
