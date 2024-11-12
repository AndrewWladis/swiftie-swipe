import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import * as StoreReview from 'expo-store-review';
import styles from './Styles'

function GameOver({ score, setScreen, theme }) {
    const [date, setDate] = useState(new Date());

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
                    `Score on ${(date.getMonth() + 1) + '/' + date.getDate()}: ${score.match(/✅/g).length}/10 \n ${score} \n from Swiftie Swipe, now on iOS https://apps.apple.com/us/app/swiftie-swipe/id6479224086`,
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
                    <Text style={styles.endgame}>you have reached the <Text style={[styles.endgameRep, { fontFamily: 'rep' }]}>endgame</Text></Text>
                    <Text style={[styles.score, { fontFamily: 'TTPD' }]}>{score.match(/✅/g).length}/10</Text>
                    <Text style={[styles.date, { fontFamily: 'TTPD' }]}> on {date.toLocaleDateString()}</Text>
                    <TouchableOpacity onPress={() => onShare()} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScreen('Home') }} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'rep' }]}>back home</Text>
                    </TouchableOpacity>
                    <Text style={[styles.creditText, { fontFamily: 'TTPD' }]}>Created by @andywl27 on Instagram</Text>
                </LinearGradient>
            ) : (
                <LinearGradient colors={["#47d1ff", "#f5a2e0"]} style={styles.gameOverScreen}>
                    <Text style={styles.endgame}>you have reached the <Text style={[styles.endgameRep, { fontFamily: 'rep' }]}>endgame</Text></Text>
                    <Text style={styles.score}>{score.match(/✅/g).length}/10</Text>
                    <Text style={styles.date}> on {date.toLocaleDateString()}</Text>
                    <TouchableOpacity onPress={() => onShare()} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'folklorev2' }]}>share</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setScreen('Home') }} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: 'folklorev2' }]}>back home</Text>
                    </TouchableOpacity>
                    <Text style={[styles.creditText, { fontFamily: 'TTPD' }]}>Created by @andywl27 on insta</Text>
                </LinearGradient>
            )}
        </>
    )
}

export default GameOver
