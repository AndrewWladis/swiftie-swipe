import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import styles from './Styles'
import { useNetInfo } from "@react-native-community/netinfo";

function Questions({ setScreen, setScore }) {
    const [externalData, setExternalData] = useState([])
    const [color, setColors] = useState('normal');
    const [isLoad, setLoad] = useState(true);
    const [quoteOpacity, setQuoteOpacity] = useState(1)
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionArr, setQuestionArr] = useState('');
    const [timer, setTimer] = useState(15);
    const [quote, setQuote] = useState({
        quote: {
            quote: 'Loading...',
            author: 'Andy Wladis'
        },
        options: ['Loading...', 'Loading...', 'Loading...', 'Loading...']
    });

    const netInfo = useNetInfo();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer - 1);

            if (timer <= 0) {
                isAnswer('Andy');
                clearInterval(interval);
                setTimer(0)
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isAnswer, timer]);

    useEffect(() => {
        if (externalData.length > 0) {
            if (quote.quote.quote != 'Loading..') {
                setQuoteOpacity(1)
                setTimer(13)
            } else {
                setQuoteOpacity(0)
            }
        }
    }, [quote]);

    useEffect(() => {
        if (externalData.length > 0) {
            if (isLoad) {
                setQuote(externalData[0])
                setLoad(false)
            }

            getData();
        }
    }, [externalData])

    useEffect(() => {
        fetch('https://taylor-swift-game-backend.onrender.com/today-challenge')
            .then(response => response.json())
            .then(data => setExternalData(data))
    }, [])


    function blankState() {
        setQuote({
            quote: {
                quote: 'Loading..',
                author: 'Andy Wladis'
            },
            options: [' ', ' ', ' ', ' ']
        });
    }

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@questionNumber', value.toString())
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@questionNumber')
            const date = await AsyncStorage.getItem('@date')
            if (date !== date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()) {
                storeData("1")
                setQuestionNumber(1)
            } else {
                setQuestionNumber(Number(value));
            }
        } catch (e) {
            // error reading value
        }
    }

    const isAnswer = (ele) => {
        if (color === 'normal' && quote.quote.author != 'Andy Wladis') {
            if (ele === quote.quote.author) {
                setColors('#5bde6a')
                setQuestionArr(questionArr + '✅');
            } else {
                setColors('#fc746a')
                setQuestionArr(questionArr + '❌');
            }
            if (questionNumber < 10) {
                setTimeout(() => {
                    setColors('normal')
                    blankState()
                    setQuote(externalData[questionNumber])
                    setQuestionNumber(questionNumber + 1);
                    storeData(questionNumber)

                }, 1500)
            } else {
                setTimeout(() => {
                    setScore('✅' + questionArr)
                    setScreen('GameOver')
                }, 1000)
            }
        }
    }

    const returnColor = (num) => {
        if (color === 'normal') {
            return "#e8e8e8";
        } else {
            return color;
        }
    }

    return (
        <>
            {
                (externalData.length > 0) ? (
                    <View style={styles.questionContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerContent}>
                                <Text style={styles.questionNumber}>Track #{questionNumber}</Text>
                                <Text style={[styles.timer]}>{timer}</Text>
                            </View>
                            {netInfo.isConnected ? <Text style={[styles.quote, { opacity: quoteOpacity }]}>"{quote.quote.quote}"</Text> : () => { setScreen('Home') }}
                        </View>
                        {quote.options.map((element, index) => (
                            <TouchableOpacity onPress={() => { isAnswer(element) }} key={index}>
                                <View style={[styles.option, { backgroundColor: returnColor(index), }]}>
                                    <Text style={styles.optionText}>{element}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (

                    <View style={styles.questionLoadingContainer}>
                        <Text style={styles.quoteDebut}>Loading...</Text>
                        <Text style={styles.quoteFearless}>loading...</Text>
                        <Text style={styles.quoteSpeakNow}>Loading...</Text>
                        <Text style={styles.quote1989}>Loading...</Text>
                        <Text style={styles.quoteRep}>Loading...</Text>
                        <Text style={styles.quoteLover}>Loading...</Text>
                        <Text style={styles.quoteFolklore}>Loading...</Text>
                        <Text style={styles.quoteEvermore}>Loading...</Text>
                        <Text style={styles.quoteMidnight}>Loading...</Text>
                        <Text style={styles.quoteTTPD}>LOADING...</Text>
                    </View>
                )
            }
        </>
    )
}

export default Questions