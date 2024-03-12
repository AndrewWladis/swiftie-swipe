import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Styles'
import { LinearGradient } from 'expo-linear-gradient'
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ setScreen }) => {
    const colorEras = [["#272729", "#062030"], ["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];

    const [color, setColor] = useState(Math.floor(Math.random() * colorEras.length))
    const [date, setDate] = useState(new Date());

    const netInfo = useNetInfo();

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
            // error reading value
        }
    }

    return (
        <LinearGradient colors={colorEras[color]} style={styles.homeContent}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Swiftie Swipe</Text>
                <Text style={styles.date}>
                    {date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' })}
                </Text>
            </View>
            {netInfo.isConnected ?
                <TouchableOpacity onPress={() => getData()} style={styles.startButton}>
                    <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>...ready for it?</Text>
                </TouchableOpacity>
                :
                <Text style={styles.date}>Connect to the Internet to play</Text>
            }
        </LinearGradient>
    )
}

export default Home