import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as StoreReview from 'expo-store-review';
import styles from './Styles'

function GameOver({ score, setScreen, theme }) {
    const colorEras = [["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];
    const [date, setDate] = useState(new Date());
    const [color, setColor] = useState(Math.floor(Math.random() * colorEras.length))

    useEffect(() => {
        StoreReview.requestReview();

        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Score on ${(date.getMonth() + 1) + '/' + date.getDate()}: ${score}/10, from Swiftie Swipe, now on iOS https://apps.apple.com/us/app/swiftie-swipe/id6479224086`,
                //put link to app store here later
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
        {(theme === 'TTPD') ? (
            <LinearGradient colors={['#dbdbdb', '#858585']} style={styles.gameOverScreen}>
            <Text style={[styles.score, { fontFamily: 'ttpd' }]}>{score.match(/✅/g).length}/10</Text>
            <Text style={[styles.date, { fontFamily: 'ttpd' }]}> on {date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => onShare()} style={styles.shareButton}>
                <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setScreen('Home') }} style={styles.shareButton}>
                <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>back home</Text>
            </TouchableOpacity>
        </LinearGradient>
        ) : (
            <LinearGradient colors={colorEras[color]} style={styles.gameOverScreen}>
            <Text style={styles.score}>{score.match(/✅/g).length}/10</Text>
            <Text style={styles.date}> on {date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => onShare()} style={styles.shareButton}>
                <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setScreen('Home') }} style={styles.shareButton}>
                <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>back home</Text>
            </TouchableOpacity>
        </LinearGradient>
        )}
        </>
    )
}

export default GameOver