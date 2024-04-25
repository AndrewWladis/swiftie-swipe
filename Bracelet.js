import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles'

function Bracelet() {
    
    const [bracelet, setBracelet] = useState('b%.aaS.b%.aaW.b%.aaI.b%.aaF.b%.aaT.b%.aaI.b%.aaE.b%')

    function returnBead(bead) {
        let data = {
            color: '#e6e6e6',
            text: bead.charAt(2),
            //text: '🫶',
            font: 'none'
        }

        switch (bead.charAt(0)) {
            case 'a':
                // offwhite
                data.color = '#e6e6e6'
                break;
            case 'b':
                // light red
                data.color = '#fc5c53'
                break;
            case 'c':
                // orange
                data.color = '#f29a27'
                break;
            case 'e':
                // dark yellow
                data.color = '#c9c65b'
                break;
            case 'f':
                // dark green
                data.color = '#53a123'
                break;
            case 'g':
                // green
                data.color = '#0ad11e'
                break;
            case 'h':
                // blue
                data.color = '#38b6c9'
                break;
            case 'i':
                // dark blue
                data.color = '#388bc9'
                break;
            case 'j':
                // purple
                data.color = '#5f38c9'
                break;
            case 'k':
                // pink
                data.color = '#eeb6f2'
                break;
            case 'l':
                // hot pink
                data.color = '#ed5fb2'
                break;
            case 'm':
                // off black
                data.color = '#1c1c1c'
                break;
            case 'n':
                // light gray
                data.color = '#cccccc'
                break;
            default:
                data.color = '#e6e6e6'
        }

        switch (bead.charAt(1)) {
            case 'a':
                data.font = 'none'
                break;
            case 'b':
                data.font = '1989'
                break;
            case 'c':
                data.font = 'rep'
                break;
            case 'd':
                data.font = 'TTPD'
                break;
            case 'e':
                data.font = 'midnights'
                break;
            case '%':
                return {
                    color: data.color,
                    text: 'none'
                }
            default:
                data.font = 'none'
                break;
        }

        return data;
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@bracelet');
                if (value !== null) {
                    setBracelet(value)
                } else {
                    await AsyncStorage.setItem('@bracelet', 'b%.aaS.b%.aaW.b%.aaI.b%.aaF.b%.aaT.b%.aaI.b%.aaE.b%');
                }
            } catch (e) {
                // error reading value
            }
        }
        getData()
    }, [])

    return (
        <View style={styles.braceletContainer}>
            <View style={styles.bracelet}>
                {bracelet.split('.').map((bead, index) => {
                    const beadData = returnBead(bead);
                    return (
                        beadData.text !== 'none' ? (
                            beadData.font !== 'none' ? (
                                <View key={index} style={[styles.bead, { backgroundColor: beadData.color }]}>
                                    <Text style={[styles.beadText, { fontFamily: beadData.font }]}>{beadData.text}</Text>
                                </View>
                            ) : (
                                <View key={index} style={[styles.bead, { backgroundColor: beadData.color }]}>
                                    <Text style={styles.beadText}>{beadData.text}</Text>
                                </View>
                            )
                        ) : (
                            <View key={index} style={[styles.beadBlank, { backgroundColor: beadData.color }]}>
                            </View>
                        )
                    )
                })}
            </View>
        </View>
    )
}

export default Bracelet