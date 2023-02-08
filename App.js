import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Lottie from 'lottie-react-native';
import amountOfWater from '@react-native-async-storage/async-storage';

import animation from './src/images/water-animation.json';

export default function App() {
  const [save, setSave] = useState(false)
  const anim = useRef(true)
  const [water, setWater] = useState(0)
  const [fix, setFix] = useState(500)

  useEffect( async ()=> {
    total = setWater(await amountOfWater.getItem('@water'))
    if(total == null){
      setWater(0)
    } else{
      setWater(total)
    }
  }, [])

  useEffect(()=> {
    if(save || !save){
      anim.current.play(0, 120)
    }
  }, [save])

  async function drinkWater(){
    setSave(!save)
    setFix(500)
    setWater(water+(~~fix))
    await amountOfWater.setItem('@water', water)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}> -WATER SIZE- </Text>
      
      <View style={styles.mainView}>
        <Lottie source={animation} style={{width:300}} ref={anim} loop={false}/>
        
        <Text style={styles.waterText}>{water}mL</Text>
        <TouchableOpacity style={styles.button} onPress={drinkWater}><Text style={styles.texts}>FILL</Text></TouchableOpacity>
        <TextInput placeholder='FOR DEFAULT IS SET TO 500ML' style={styles.bottleSizeInput} keyboardType='numeric' onChangeText={(x)=> setFix(x)}/>
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
    margin: 10,

  },

  texts: {
    fontSize: 15,
    color: 'black'
  },

  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  waterText: {
    fontSize: 25,
    color:'#84A98C',
  },

  bottleSizeInput: {
    backgroundColor: '#84A98C',
    padding: 20,
    margin: 10,
    borderRadius: 30,
  }
});
