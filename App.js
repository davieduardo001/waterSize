import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import animation from './src/images/water-animation.json';

export default function App() {
  const [save, setSave] = useState(false)
  const anim = useRef(true)
  const [water, setWater] = useState(0)

  useEffect(()=> {
    if(save || !save){
      anim.current.play(0, 120)
    }
  }, [save])

  function drinkWater(){
    setSave(!save)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}> -WATER SIZE- </Text>

      <View style={styles.mainView}>
        <Text style={styles.waterText}>TEST</Text>

        <Lottie source={animation} style={{width:300}} ref={anim} loop={false}/>
        
        <TouchableOpacity style={styles.button} onPress={drinkWater}><Text>FILL</Text></TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#2F3E46',
  },

  header: {

  },

  header: {
    color: '#CAD2C5',
    fontSize: 30,
  },

  button: {
    backgroundColor: '#52796F',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    width: 100,
  },

  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  waterText: {
    fontSize: 20,
    color:'#84A98C',
  }
});
