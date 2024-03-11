import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import styles from './Styles'
import Home from './Home'
import Questions from './Questions'
import GameOver from './GameOver'
import React, { useEffect, useState } from 'react';
import { useFonts, loadAsync } from 'expo-font';

export default function App() {
  const [screen, setScreen] = useState('Home')
  const [date, setDate] = useState(new Date());
  const [fontLoaded, setFontLoaded] = useState(false)
  const [score, setScore] = useState([])


  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useFonts({
    '1989': require('./assets/Taylor Swift Handwriting.ttf'),
    'rep': require('./assets/OldeEnglish.ttf'),
  });

  useEffect(() => {
    loadAsync({
      '1989': require('./assets/Taylor Swift Handwriting.ttf'),
      'rep': require('./assets/OldeEnglish.ttf'),
    })
    .then(() => {
     setFontLoaded(true)
    }) 
  }, [])

  function returnScreen() {
    switch (screen) {
      case 'Home':
        return <Home setScreen={setScreen} />
        break;
      case 'Questions':
        return <Questions setScreen={setScreen} setScore={setScore} />
        break;
      case 'GameOver':
        return <GameOver setScreen={setScreen} score={score} />
        break;
      default:
        break;
    }
  }


  if (!fontLoaded) return null

  return (
    <View style={styles.home}>
      {returnScreen()}
      <StatusBar style="dark" />
      <View style={styles.homeCaptionView}>
        <Text style={[styles.caption, { fontFamily: '1989' }]}>T.S.</Text>
        <Text style={[styles.caption, { fontFamily: '1989' }]}>{date.getFullYear()}</Text>
      </View>
    </View>
  );
}
