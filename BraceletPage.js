import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles'
import Bracelet from './Bracelet';

function BraceletPage({ setScreen, theme }) {
    const colorEras = [["#47d1ff", "#f5a2e0"], ["#948543", "#decb76"]];
    const colors = {
        'a': '#e6e6e6',
        'b': '#fc5c53',
        'c': '#f29a27',
        'e': '#c9c65b',
        'f': '#53a123',
        'g': '#0ad11e',
        'h': '#38b6c9',
        'i': '#388bc9',
        'j': '#5f38c9',
        'k': '#eeb6f2',
        'l': '#ed5fb2',
        'm': '#1c1c1c',
        'n': '#cccccc'
    }

    const fonts = {
        'a': 'none',
        'b': '1989',
        'c': 'rep',
        'd': 'TTPD',
        'e': 'midnights'
    }

    const [color, setColor] = useState(Math.floor(Math.random() * colorEras.length))
    const [beads, setBeads] = useState([]);
    const [beadColor, setBeadColor] = useState('a')
    const [beadText, setBeadText] = useState('🫶')
    const [beadFont, setBeadFont] = useState('a')

    const setItem = async (value) => {
        try {
            await AsyncStorage.setItem('@bracelet', value);
        } catch (e) {
            // saving error
        }
    };

    useEffect(() => {
        (async () => {
            const value = await AsyncStorage.getItem('@bracelet');
            if (value !== null) {
                setBeads(value.split('.'))
            } else {
                await AsyncStorage.setItem('@bracelet', 'b%.aaS.b%.aaW.b%.aaI.b%.aaF.b%.aaT.b%.aaI.b%.aaE.b%');
            }
        })().catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        (async () => {
            await AsyncStorage.setItem('@bracelet', beads.join('.'));
        })().catch(err => {
            console.error(err);
        });
    }, [beads]);

    function addBead() {
        if (beadText.trim() == 0) {
            setBeads([...beads, beadColor + '%'])
        } else {
            setBeads([...beads, beadColor + beadFont + beadText])
        }
    }

    function removeLastBead() {
        setBeads(beads.slice(0, -1))
    }

    return (
        <>
            {(theme === 'TTPD') ? (
                <LinearGradient colors={['#dbdbdb', '#858585']} style={styles.homeContent}>
                    <TouchableOpacity onPress={() => setScreen('Home')} style={styles.startButton}>
                        <Text style={[styles.backHomeTTPDText, { fontFamily: '1989' }]}>Back Home</Text>
                    </TouchableOpacity>
                    <View style={styles.braceletContainer}>
                        <View style={styles.bracelet}>
                            {beads.map((bead, index) => {
                                return (
                                    bead.charAt(1) !== '%' ? (
                                        <View style={[styles.bead, { backgroundColor: colors[bead.charAt(0)] }]}>
                                            <Text style={[styles.beadText, { fontFamily: fonts[bead.charAt(1)] }]}>{bead.charAt(2)}</Text>
                                        </View>
                                    ) : (
                                        <View style={[styles.beadBlank, { backgroundColor: colors[bead.charAt(0)] }]}>
                                        </View>
                                    )
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <View style={styles.braceletControls}>
                            <View style={styles.previewBead}>
                                <Text style={styles.braceletControlPanelText}>Preview</Text>
                                {(
                                beadText.trim() !== '' ? (
                                    <View style={[styles.bead, { backgroundColor: colors[beadColor] }]}>
                                        <Text style={[styles.beadText, { fontFamily: fonts[beadFont] }]}>{beadText}</Text>
                                    </View>
                                ) : (
                                    <View style={[styles.beadBlank, { backgroundColor: colors[beadColor] }]}>
                                    </View>
                                )
                            )}
                            </View>
                            <View style={styles.previewBead}>
                                <TouchableOpacity style={styles.braceletAddButton} onPress={() => {
                                    addBead()
                                }}>
                                    <Text style={styles.braceletButtonText}>Add Bead</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.braceletRemoveButton} onPress={() => {
                                    removeLastBead()
                                    }}>
                                    <Text style={styles.braceletButtonText}>Remove Bead</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <Text style={styles.braceletControlPanelText}>Choose Bead Color</Text>
                        <View style={styles.beadColorContainer}>
                            {Object.keys(colors).map(key => (
                                <TouchableOpacity key={key} style={[styles.beadColor, { backgroundColor: colors[key] }]} onPress={() => {
                                    setBeadColor(key)
                                }}>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <View style={styles.beadFontContainer}>
                            <Text style={styles.braceletControlPanelText}>Choose Bead Font</Text>
                            <View style={styles.beadColorContainer}>
                                {Object.keys(fonts).map(key => (
                                    <TouchableOpacity key={key} style={[styles.beadColor, { backgroundColor: colors[beadColor] }]} onPress={() => {
                                        setBeadFont(key)
                                    }}>
                                        <Text style={[styles.beadText, { fontFamily: fonts[key] }]}>{key}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <Text style={styles.braceletControlPanelText}>Enter Bead Character</Text>
                            <TextInput
                                style={styles.braceletInput}
                                maxLength={1}
                                onChangeText={text => setBeadText(text)}
                                blurOnSubmit={true}
                            />
                    </View>
                </LinearGradient>
            ) : (
                <LinearGradient colors={colorEras[color]} style={styles.homeContent}>
                    <TouchableOpacity onPress={() => setScreen('Home')} style={styles.startButton}>
                        <Text style={[styles.startButtonText, { fontFamily: '1989' }]}>Back Home</Text>
                    </TouchableOpacity>
                    <View style={styles.braceletContainer}>
                        <View style={styles.bracelet}>
                            {beads.map((bead, index) => {
                                return (
                                    bead.charAt(1) !== '%' ? (
                                        <View style={[styles.bead, { backgroundColor: colors[bead.charAt(0)] }]}>
                                            <Text style={[styles.beadText, { fontFamily: fonts[bead.charAt(1)] }]}>{bead.charAt(2)}</Text>
                                        </View>
                                    ) : (
                                        <View style={[styles.beadBlank, { backgroundColor: colors[bead.charAt(0)] }]}>
                                        </View>
                                    )
                                )
                            })}
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <View style={styles.braceletControls}>
                            <View style={styles.previewBead}>
                                <Text style={styles.braceletControlPanelText}>Preview</Text>
                                {(
                                beadText.trim() !== '' ? (
                                    <View style={[styles.bead, { backgroundColor: colors[beadColor] }]}>
                                        <Text style={[styles.beadText, { fontFamily: fonts[beadFont] }]}>{beadText}</Text>
                                    </View>
                                ) : (
                                    <View style={[styles.beadBlank, { backgroundColor: colors[beadColor] }]}>
                                    </View>
                                )
                            )}
                            </View>
                            <View style={styles.previewBead}>
                                <TouchableOpacity style={styles.braceletAddButton} onPress={() => {
                                    addBead()
                                }}>
                                    <Text style={styles.braceletButtonText}>Add Bead</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.braceletRemoveButton} onPress={() => {
                                    removeLastBead()
                                    }}>
                                    <Text style={styles.braceletButtonText}>Remove Bead</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <Text style={styles.braceletControlPanelText}>Choose Bead Color</Text>
                        <View style={styles.beadColorContainer}>
                            {Object.keys(colors).map(key => (
                                <TouchableOpacity key={key} style={[styles.beadColor, { backgroundColor: colors[key] }]} onPress={() => {
                                    setBeadColor(key)
                                }}>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <View style={styles.beadFontContainer}>
                            <Text style={styles.braceletControlPanelText}>Choose Bead Font</Text>
                            <View style={styles.beadColorContainer}>
                                {Object.keys(fonts).map(key => (
                                    <TouchableOpacity key={key} style={[styles.beadColor, { backgroundColor: colors[beadColor] }]} onPress={() => {
                                        setBeadFont(key)
                                    }}>
                                        <Text style={[styles.beadText, { fontFamily: fonts[key] }]}>{key}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={styles.braceletControlPanel}>
                        <Text style={styles.braceletControlPanelText}>Enter Bead Character</Text>
                            <TextInput
                                style={styles.braceletInput}
                                maxLength={1}
                                onChangeText={text => setBeadText(text)}
                                blurOnSubmit={true}
                            />
                    </View>
                </LinearGradient>
            )}
        </>
    )
}

export default BraceletPage