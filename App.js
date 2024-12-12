import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles'
import Home from './Home'
import Questions from './Questions'
import GameOver from './GameOver'
import Unlimited from './Unlimited'
import Style from './Style'
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import BraceletPage from './BraceletPage';
import * as Notifications from 'expo-notifications';


// Set up the notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerDeviceWithBackend(token) {
  try {
    await fetch('http://localhost:3000/register-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error('Failed to register token with backend:', error);
  }
}

export default function App() {
  const [screen, setScreen] = useState('Home')
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState('1989');
  const [score, setScore] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');

  // Function to register for push notifications
  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    
    console.log(token);
    return token;
  }


  useEffect(() => {
    
    // Inside your registerForPushNotificationsAsync function
    registerForPushNotificationsAsync().then(token => {
      
      if (token) {
        setExpoPushToken(token)
        registerDeviceWithBackend(token);
      }
    });

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);

  const [fontsLoaded] = useFonts({
    '1989': require('./assets/Taylor Swift Handwriting.ttf'),
    'rep': require('./assets/OldeEnglish.ttf'),
    'midnights': require('./assets/coolvetica.otf'),
    'TTPD': require('./assets/ttpd.ttf'),
    'debut': require('./assets/debut.ttf'),
    'fearless': require('./assets/fearless.ttf'),
    'love': require('./assets/Love.ttf'),
    'folklore': require('./assets/folklore.ttf'),
    'folklorev2': require('./assets/IMFePIit28P.ttf')
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null;
  }

  function returnScreen() {
    switch (screen) {
      case 'Home':
        return <Home setScreen={setScreen} theme={theme} />
        break;
      case 'Questions':
        return <Questions setScreen={setScreen} setScore={setScore} />
        break;
      case 'Unlimited':
        return <Unlimited setScreen={setScreen} />
        break;
      case 'GameOver':
        return <GameOver setScreen={setScreen} score={score} theme={theme} />
        break;
      case 'Style':
        return <Style setScreen={setScreen} setTheme={setTheme} theme={theme} />
        break;
      case 'Bracelet':
        return <BraceletPage setScreen={setScreen} theme={theme} />
        break;
      default:
        return <Home setScreen={setScreen} theme={theme} />
        break;
    }
  }

  switch (theme) {
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
