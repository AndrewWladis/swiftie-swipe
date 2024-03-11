import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './Styles'

function GameOver({ score, setScreen }) {
    const colorEras = [["#272729", "#062030"], ["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];
    const [date, setDate] = useState(new Date());
    const [color, setColor] = useState(Math.floor(Math.random() * colorEras.length))

    useEffect(() => {
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
                    `Score on ${(date.getMonth() + 1) + '/' + date.getDate()}: ${score}/10, from Taylor Time, now on iOS`,
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
        <LinearGradient colors={colorEras[color]} style={styles.gameOverScreen}>
            <Text style={styles.score}>{score.match(/✅/g).length}/10</Text>
            <Text style={styles.date}> on {date.toLocaleDateString()}</Text>
            <TouchableOpacity onPress={() => onShare()} style={styles.shareButton}>
                <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>share</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default GameOver