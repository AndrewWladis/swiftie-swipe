import { View, Image, TouchableOpacity, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useLayoutEffect, useRef } from 'react'
import * as Linking from 'expo-linking';
import styles from './Styles'

const fetchAd = async () => {
    const response = await fetch('https://sendad-tvdze2fo4q-uc.a.run.app/');
    const data = await response.json();
    return data;
}

export default function AdPage({ setScreen, nextScreen }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [ad, setAd] = useState({
        id: null,
        org: null,
        image: null,
        linkto: null
    })
    const [timeLeft, setTimeLeft] = useState(10);
    // ad image should roughly be 430x800

    useEffect(() => {
        fetchAd().then((data) => {
            setAd(data);
        });
    }, []);

    useEffect(() => {
        if (imageLoaded) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [imageLoaded]);

    const clickthruAd = async () => {
        await fetch("https://incrementclickthrough-tvdze2fo4q-uc.a.run.app/", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: ad.id }),
        });
        await Linking.openURL(ad.linkto);
    }

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleXPress = () => {
        setScreen(nextScreen);
    }

    return (
        <View style={styles.container}>
            {ad.id ? (
                <>
                    <TouchableOpacity style={styles.adContainer} onPress={() => { clickthruAd() }}>
                        <View style={styles.adHeader}></View>
                        {ad.image && (
                            <Image 
                                style={styles.adImage} 
                                resizeMode='stretch' 
                                source={{ uri: ad.image }} 
                                onLoad={handleImageLoad} 
                            />
                        )}
                    </TouchableOpacity>
                    <View style={styles.adFooter}>
                        <Text style={styles.adFooterText}><Text style={styles.adFooterTextBold}>Ad by</Text> {ad.org}</Text>
                        {timeLeft > 0 ? <Text style={styles.adFooterTimeLeft}>
                            {timeLeft}
                        </Text> : <TouchableOpacity onPress={handleXPress}>
                            <Text style={styles.adFooterX}>x</Text>
                        </TouchableOpacity>}
                    </View>
                </>
            ) : (
                <View style={styles.adContainer}>
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
                </View>
            )}
            <StatusBar style="light" />
        </View>
    )
}
