import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import App from './App';
import colors from './styles/colors';

import { RealmProvider } from '@realm/react';
import schemas from './models';

export default function AppWrapper()  {

  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider schema={schemas}>
        <App />
      </RealmProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
