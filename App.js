// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import BookShipmentScreen from './screens/BookShipmentScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BookShipmentScreen />
    </SafeAreaView>
  );
}