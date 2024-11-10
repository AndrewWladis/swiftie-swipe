import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles'

function Style({ setScreen, setTheme, theme }) {
    const colorEras = [["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];
    
    const themes = [{
        text: 'folklovermore',
        value: '1989',
        color: 'black'
    },
    {
        value: 'TTPD',
        text: 'TTPD',
        color: 'black'
    }]

    const [checked, setChecked] = useState(0)
    const [color, setColor] = useState(Math.floor(Math.random() * colorEras.length))

    useEffect(() => {
        if (theme === '1989') {
            setChecked(0)
        } else if (theme === 'midnights') {
            setChecked(1)
        } else if (theme === 'TTPD') {
            setChecked(2)
        }
    }, [])

    const setItem = async (value) => {
        try {
            await AsyncStorage.setItem('swiftieSwipeTheme', value);
        } catch (e) {
            // saving error
        }
    };

    return (
        <>
            {(theme === 'TTPD') ? (
                <LinearGradient colors={['#dbdbdb', '#858585']} style={styles.homeContent}>
                    <View style={styles.themeList}>
                        {themes.map((font, index) => (
                            <View style={styles.row} key={index}>
                                {(checked === index) ? (
                                    <>
                                        <FontAwesome5 name="heart" size={40} color="pink" style={{ transform: [{ rotate: '-10deg' }] }} />
                                        <Text style={[styles.themeFont, { fontFamily: font.value, color: font.color }]}> {font.text} </Text>
                                    </>
                                ) : (
                                    <TouchableOpacity onPress={() => { setChecked(index); setItem(font.value); setTheme(font.value) }} style={{ marginLeft: 40 }}>
                                        <Text style={[styles.themeFont, { fontFamily: font.value, color: font.color }]}> {font.text} </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setScreen('Bracelet')} style={styles.braceletPageButton}>
                        <Text style={[styles.braceletPageButtonText, { fontFamily: 'midnights' }]}>Make The Friendship Bracelet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScreen('Home')} style={styles.startButton}>
                        <Text style={[styles.backHomeTTPDText, { fontFamily: 'TTPD' }]}>Back Home</Text>
                    </TouchableOpacity>
                </LinearGradient>
            ) : (
                <LinearGradient colors={colorEras[color]} style={styles.homeContent}>
                    <View style={styles.themeList}>
                        {themes.map((font, index) => (
                            <View style={styles.row} key={index}>
                                {(checked === index) ? (
                                    <>
                                        <FontAwesome5 name="heart" size={40} color="pink" style={{ transform: [{ rotate: '-10deg' }] }} />
                                        <Text style={[styles.themeFont, { fontFamily: font.value, color: font.color }]}> {font.text} </Text>
                                    </>
                                ) : (
                                    <TouchableOpacity onPress={() => { setChecked(index); setItem(font.value); setTheme(font.value) }} style={{ marginLeft: 40 }}>
                                        <Text style={[styles.themeFont, { fontFamily: font.value, color: font.color }]}> {font.text} </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setScreen('Bracelet')} style={styles.braceletPageButton}>
                        <Text style={[styles.braceletPageButtonText, { fontFamily: 'midnights' }]}>Make The Friendship Bracelet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScreen('Home')} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: '1989' }]}>Back Home</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        </>
    )
}

export default Style