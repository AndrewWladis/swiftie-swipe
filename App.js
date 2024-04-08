import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles'
import Home from './Home'
import Questions from './Questions'
import GameOver from './GameOver'
import Style from './Style'
import React, { useEffect, useState } from 'react';
import { useFonts, loadAsync } from 'expo-font';

export default function App() {
  const [screen, setScreen] = useState('Home')
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState('1989');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [score, setScore] = useState([]);


  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (date.getHours() === 0) {
      setTheme('midnights')
    }
  }, [date]);

  useFonts({
    '1989': require('./assets/Taylor Swift Handwriting.ttf'),
    'rep': require('./assets/OldeEnglish.ttf'),
    'midnights': require('./assets/coolvetica.otf')
  });

  useEffect(() => {
    loadAsync({
      '1989': require('./assets/Taylor Swift Handwriting.ttf'),
      'rep': require('./assets/OldeEnglish.ttf'),
      'midnights': require('./assets/coolvetica.otf'),
      'ttpd': require('./assets/ttpd.ttf')
    })
      .then(() => {
        setFontLoaded(true)
      })
  }, [])

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('swiftieSwipeTheme');
      if (value !== null) {
        setTheme(value)
      }
    })().catch(err => {
      console.error(err);
    });
  }, []);

  function returnScreen() {
    switch (screen) {
      case 'Home':
        return <Home setScreen={setScreen} theme={theme} />
        break;
      case 'Questions':
        return <Questions setScreen={setScreen} setScore={setScore} />
        break;
      case 'GameOver':
        return <GameOver setScreen={setScreen} score={score} theme={theme} />
        break;
      case 'Style':
        return <Style setScreen={setScreen} setTheme={setTheme} theme={theme} />
        break;
      default:
        break;
    }
  }


  if (!fontLoaded) return null


  switch (theme) {
    case 'midnights':
      return (
        <View style={styles.homeMidnights}>
          <View style={styles.homeCaptionViewMidnights}>
            <Text style={[styles.captionMidnights, { fontFamily: 'midnights' }]}>Swiftie Swipes</Text>
          </View>
          {returnScreen()}
          <StatusBar style="dark" />
        </View>
      )
    case '1989':
      return (
        <View style={styles.home}>
          {returnScreen()}
          <StatusBar style="dark" />
          <View style={styles.homeCaptionView}>
            <Text style={[styles.caption, { fontFamily: '1989' }]}>T.S.</Text>
            <Text style={[styles.caption, { fontFamily: '1989' }]}>{date.getFullYear()}</Text>
          </View>
        </View>
      )
    case 'TTPD':
      return (
        <View style={styles.homeTTPD}>
          {returnScreen()}
          <StatusBar style="dark" />
        </View>
      )
    default:
      return (
        <View style={styles.home}>
          {returnScreen()}
          <StatusBar style="dark" />
          <View style={styles.homeCaptionView}>
            <Text style={[styles.caption, { fontFamily: '1989' }]}>T.S.</Text>
            <Text style={[styles.caption, { fontFamily: '1989' }]}>{date.getFullYear()}</Text>
          </View>
        </View>
      )
  }
}
