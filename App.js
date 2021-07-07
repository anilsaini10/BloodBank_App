import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main_Bottom_Navigator from './Navigation/NavigationScreen';  


export default function App() {
  return (
    <Main_Bottom_Navigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
