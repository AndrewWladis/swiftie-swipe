import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles'

function Style({ setScreen, setTheme, theme }) {
    const colorEras = [["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];
    const themes = [{
        font: '1989',
        text: '1989',
        value: '1989',
        color: 'black'
    },
    {
        font: 'midnights',
        value: 'midnights',
        text: 'Midnights',
        color: '#546488'
    },
    {
        font: 'ttpd',
        text: 'TTPD',
        value: 'TTPD',
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
                                <TouchableOpacity key={index} onPress={() => {
                                    setChecked(index)
                                    setTheme(font.value)
                                    setItem(font.value)
                                }} style={styles.themeButton}>
                                    {(checked === index) ? (
                                        <View style={styles.checked}></View>
                                    ) : (
                                        <View style={styles.check}></View>
                                    )}
                                </TouchableOpacity>
                            <Text style={[styles.themeFont, { fontFamily: font.font, color: font.color }]}> {font.text} </Text>
                        </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setScreen('Home')} style={styles.startButton}>
                        <Text style={[styles.backHomeTTPDText, { fontFamily: 'ttpd' }]}>Back Home</Text>
                    </TouchableOpacity>
                </LinearGradient>
            ) : (
                <LinearGradient colors={colorEras[color]} style={styles.homeContent}>
                    <View style={styles.themeList}>
                        {themes.map((font, index) => (
                            <View style={styles.row} key={index}>
                                <TouchableOpacity key={index} onPress={() => {
                                    setChecked(index)
                                    setTheme(font.value)
                                    setItem(font.value)
                                }} style={styles.themeButton}>
                                    {(checked === index) ? (
                                        <View style={styles.checked}></View>
                                    ) : (
                                        <View style={styles.check}></View>
                                    )}
                                </TouchableOpacity>
                            <Text style={[styles.themeFont, { fontFamily: font.font, color: font.color }]}> {font.text} </Text>
                        </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setScreen('Home')} style={styles.startButton}>
                        <Text style={[styles.backHomeTTPDText, { fontFamily: '1989' }]}>Back Home</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        </>
    )
}

export default Style