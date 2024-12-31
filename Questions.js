import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Styles'
import lyrics from './lyrics';

async function getQuestions() {
    let now = new Date();
    let num = Math.floor(((now.getDay() + 3) * (now.getDate() + now.getMonth() + 1)) + (now.getMonth() * 3))

    let allSongs = ['22', 'All Too Well (10 Minute Version) [From The Vault]',
                 'Babe [From The Vault]', 'Begin Again',
                 'Better Man [From The Vault]', 'Come Back...Be Here',
                 'Everything Has Changed', 'Forever Winter [From The Vault]',
                 'Girl At Home', 'Holy Ground', 'I Almost Do',
                 'I Bet You Think About Me [From the Vault]',
                 'I Knew You Were Trouble',
                 'Message In A Bottle [From The Vault]',
                 'Nothing New [From The Vault]', 'Red',
                 'Ronan', 'Run [From The Vault]',
                 'Sad Beautiful Tragic', 'Starlight',
                 'State of Grace', 'Stay Stay Stay',
                 'The Last Time', 'The Lucky One',
                 'The Moment I Knew', 'The Very First Night [From The Vault]',
                 'Treacherous', 'We Are Never Ever Getting Back Together',
                 'Afterglow', 'Cornelia Street', 'Cruel Summer', 'Daylight', 'Death By A Thousand Cuts',
                 'False God',
                 'I Forgot That You Existed', 'I Think He Knows', 'It’s Nice To Have A Friend', 'London Boy',
                 'Lover',
                 'ME!', 'Miss Americana & The Heartbreak Prince', 'Paper Rings', "Soon You'll Get Better",
                 'The Archer',
                 'The Man', 'You Need To Calm Down', 'All Of The Girls You Loved Before',
                 'All You Had To Do Was Stay', 'Bad Blood',
                 'Blank Space', 'Clean',
                 'How You Get The Girl', 'I Know Places',
                 'Is It Over Now? [From The Vault]', 'I Wish You Would',
                 'New Romantics', 'Now That We Don’t Talk [From The Vault]',
                 'Out Of The Woods', 'Say Don’t Go [From The Vault]',
                 'Shake It Off', '“Slut!” [From The Vault]',
                 'Style', 'Suburban Legends [From The Vault]',
                 'Sweeter Than Fiction', 'This Love',
                 'Welcome To New York', 'Wildest Dreams',
                 'Wonderland', 'You Are In Love', 'Anti-Hero', 'Bejeweled',
                 'Bigger Than The Whole Sky', 'Dear Reader', 'Glitch', 'High Infidelity', 'Karma', 'Labyrinth',
                 'Lavender Haze', 'Maroon', 'Mastermind', 'Midnight Rain', 'Paris', 'Question...?',
                 'Snow On The Beach',
                 'Sweet Nothing', 'The Great War', 'Vigilante Shit', 'Would’ve, Could’ve, Should’ve',
                 'You’re On Your Own, Kid', 'Back To December',
                 'Better Than Revenge', 'Castles Crumbling [From The Vault]',
                 'Dear John', 'Electric Touch [From The Vault]',
                 'Enchanted', 'Foolish One [From The Vault]',
                 'Haunted', 'I Can See You [From The Vault]',
                 'Innocent', 'Last Kiss', 'Long Live',
                 'Mean', 'Mine', 'Never Grow Up',
                 'Ours', 'Sparks Fly', 'Speak Now',
                 'Superman', 'The Story Of Us',
                 'Timeless [From The Vault]',
                 'When Emma Falls in Love [From The Vault]', 'Bad Blood (Remix)',
                 'Breathe', 'Bye Bye Baby [From the Vault]',
                 'Change', 'Come In With The Rain',
                 'Don’t You [From the Vault]', 'Fearless',
                 'Fifteen', 'Forever & Always', 'Hey Stephen',
                 'Jump Then Fall', 'Love Story',
                 'Mr. Perfectly Fine [From the Vault]', 'Superstar',
                 'Tell Me Why', 'That’s When [From the Vault]',
                 'The Best Day', 'The Other Side of the Door',
                 'The Way I Loved You', 'Today Was a Fairytale',
                 'Untouchable', 'We Were Happy [From the Vault]',
                 'White Horse', 'You All Over Me [From the Vault]',
                 'You Belong With Me', 'You’re Not Sorry',
                 'Call It What You Want', 'Dancing With Our Hands Tied', 'Delicate', 'Don’t Blame Me', 'Dress',
                 'End Game', 'Getaway Car', 'Gorgeous', 'I Did Something Bad', 'King of My Heart',
                 'Look What You Made Me Do', 'New Year’s Day', 'So It Goes...',
                 'This Is Why We Can’t Have Nice Things',
                 '...Ready for It?', 'Hits Different', 'If This Was a Movie',
                 'You’re Losing Me (From The Vault)', 'august', 'betty', 'cardigan', 'epiphany', 'exile', 'hoax',
                 'illicit affairs', 'invisible string', 'mad woman', 'mirrorball', 'my tears ricochet', 'peace',
                 'seven', 'the 1', 'the last great american dynasty', 'this is me trying', 'champagne problems',
                 'closure', 'coney island', 'cowboy like me', 'dorothea', 'evermore', 'gold rush', 'happiness',
                 'ivy',
                 'long story short', 'marjorie', 'no body, no crime', '’tis the damn season', 'tolerate it',
                 'willow',
                 'the lakes', 'Fortnight', 'The Tortured Poets Department', 'My Boy Only Breaks His Favorite Toys',
                 "Down Bad", 'So Long, London',
                 'But Daddy I Love Him', 'Fresh Out The Slammer', 'Florida!!!', 'Guilty as Sin?',
                 "Who's Afraid of Little Old Me?", 'I Can Fix Him (No Really I Can)',
                 'loml',
                 'I Can Do It With a Broken Heart',
                 'The Smallest Man Who Ever Lived',
                 'The Alchemy',
                 'Clara Bow',
                 'The Black Dog',
                 'imgonnagetyouback',
                 'The Albatross',
                 'Chloe or Sam or Sophia or Marcus',
                 'How Did It End?',
                 'So High School',
                 'I Hate It Here',
                 'thanK you aIMee',
                 "I Look In People's Windows",
                 'The Prophecy',
                 'Cassandra',
                 'Peter',
                 'The Bolter',
                 'Robin',
                 'The Manuscript'];

    const lyricsArray = []
    const quizList = []

    lyrics.forEach(albumData => {
        const songs = albumData.songs;
        songs.forEach(songData => {
            const songLyrics = songData.lyrics;
            songLyrics.forEach(lyric => {
                lyricsArray.push([lyric, songData.song]);
            });
        });
    });
    
    let j = Math.ceil(num / 300);

    for (let i = num; i < lyricsArray.length; i += num) {
        if (quizList.length < 10) {
            const item = {
                quote: {
                    quote: lyricsArray[i][0],
                    author: lyricsArray[i][1]
                },
                options: []
            };
            
            let supportingSongs = [];
            while (supportingSongs.length < 3) {
                if (Math.ceil(num / 13) > allSongs.length) {
                    supportingSongs = ['loml', 
                                       'All Too Well (10 Minute Version) [From The Vault]', 
                                       'no body, no crime'];
                }
    
                if (j >= allSongs.length) {
                    j = Math.ceil(num / 22);
                }
                
                if (!supportingSongs.includes(allSongs[j]) && allSongs[j] != lyricsArray[i][1]) {
                    supportingSongs.push(allSongs[j]);
                }
                j += Math.ceil(num / 22);
            }
    
            supportingSongs.splice(lyricsArray[i][0].length % 4, 0, item.quote.author);
            item.options = supportingSongs;
    
            quizList.push(item);
        } else {
            break;
        }
    }

    if (now.getDay() % 2 === 0) {
        quizList.reverse();
    }
    
    return JSON.stringify(quizList);
}

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

    const themecolors = ["#daf7e8", "#f3f598", "#eb98f5", "#f59898", "#98d4f5", "#ffffff", "#facaf0", "#dbdbdb", "#b5a693", "#8c93e6"]

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
        const fetchQuestions = async () => {
            const data = await getQuestions();
            console.log(data)
            setExternalData(JSON.parse(data));
        };

        fetchQuestions();
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
            return themecolors[questionNumber - 1];
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
                                {(questionNumber === 5) ? (
                                    <Text style={[styles.questionNumber, { fontWeight: '900', textShadowColor: 'white', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2, }]}>Track #{questionNumber}</Text>
                                ) : (
                                    <Text style={styles.questionNumber}>Track #{questionNumber}</Text>
                                )}
                                <Text style={[styles.timer]}>{timer}</Text>
                            </View>
                            <Text style={[styles.quote, { opacity: quoteOpacity }]}>"{quote.quote.quote}"</Text>
                        </View>
                        {quote.options.map((element, index) => (
                            <TouchableOpacity onPress={() => { isAnswer(element) }} key={index}>
                                {(element === quote.quote.author && color === '#fc746a') ? (
                                    <View style={[styles.option, { backgroundColor: '#5bde6a' }]}>
                                        <Text style={styles.optionText}>{element}</Text>
                                    </View>
                                ) : (
                                    <View style={[styles.option, { backgroundColor: returnColor(index) }]}>
                                        <Text style={styles.optionText}>{element}</Text>
                                    </View>
                                )}
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