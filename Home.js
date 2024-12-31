import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bracelet from './Bracelet';


const Home = ({ setScreen, theme, setNextScreen }) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@date');
            if (value === date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()) {
                Alert.alert('You already played today', 'Please check back in tomorrow for a new round of questions.');
            } else {
                setScreen('Questions')
                await AsyncStorage.setItem('@date', date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear());
            }
        } catch (e) {
            console.log(e)
        }
    }

    const startUnlimited = async () => {
        setScreen('AdPage')
        setNextScreen('Unlimited')
    }

    const startStyle = async () => {
        setScreen('AdPage')
        setNextScreen('Style')
    }

    return (
        <>
            {(theme === 'TTPD') ? (
                <LinearGradient colors={['#dbdbdb', '#858585']} style={styles.homeContent}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleTTPD, { fontFamily: 'TTPD' }]}>SWIFTIE SWIPE</Text>
                        <Text style={[styles.dateTTPD, { fontFamily: 'TTPD' }]}>
                            {date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' })}
                        </Text>
                        <View style={styles.braceletContainerHome}>
                            <Bracelet />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => getData()} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'TTPD' }]}>TODAY'S CHALLENGE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setScreen('AdPage'); setNextScreen('Unlimited')}} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'TTPD' }]}>UNLIMITED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setScreen('AdPage'); setNextScreen('Style')}} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: '1989' }]}>Style</Text>
                    </TouchableOpacity>
                </LinearGradient>
            ) : (
                <LinearGradient colors={["#47d1ff", "#f5a2e0"]} style={styles.homeContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Swiftie Swipe</Text>
                        <Text style={[styles.date, { fontFamily: '1989' }]}>
                            {date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' })}
                        </Text>
                        <View style={styles.braceletContainerHome}>
                            <Bracelet />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => getData()} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'folklorev2' }]}>today's challenge</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => startUnlimited()} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'folklorev2' }]}>unlimited</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => startStyle()} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: '1989' }]}>Style</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        </>
    )
}

export default Home