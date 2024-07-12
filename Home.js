import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bracelet from './Bracelet';


const Home = ({ setScreen, theme }) => {
    const colorEras = [["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];

    const [color, setColor] = useState(Math.floor(Math.random() * colorEras.length))
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
            }setScreen('Questions')
        } catch (e) {
            // error reading value
        }
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
                        <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>...ready for it?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScreen('Style')} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: '1989' }]}>Style</Text>
                    </TouchableOpacity>
                </LinearGradient>
            ) : (
                <LinearGradient colors={colorEras[color]} style={styles.homeContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Swiftie Swipe</Text>
                        <Text style={styles.date}>
                            {date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' })}
                        </Text>
                        <View style={styles.braceletContainerHome}>
                            <Bracelet />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => getData()} style={styles.startButton}>
                            <Text style={[styles.startButtonText, { fontFamily: 'folklore' }]}>START GAME</Text>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScreen('Style')} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: '1989' }]}>Style</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        </>
    )
}

export default Home