import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    caption: {
        fontSize: 54,
        color: 'black',
        fontWeight: '800'
    },
    date: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
    },
    gameOverScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        margin: 13,
        backgroundColor: '#0f0f0f',
        padding: 10,
        borderRadius: 10,
        height: '30%'
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    home: {
        flex: 1,
        borderColor: '#e8e9e1',
        borderTopWidth: 60,
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 10,
    },
    homeCaptionView: {
        height: 113,
        backgroundColor: '#e8e9e1',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    homeContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        justifyContent: 'center',
        padding: 20
    },
    option: {
        margin: 10,
        padding: 7,
        width: '90%',
        minHeight: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        textAlign: 'center'
    },
    optionText: {
        fontSize: 22,
        color: 'black',
        fontWeight: '800',
        textAlign: 'center'
    },
    questionContainer: {
        flex: 1,
        backgroundColor: '#191a1c',
    },
    questionNumber: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },
    quote: {
        fontSize: 27,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
        paddingVertical: 20
    },
    score: {
        fontSize: 70,
        color: 'white',
        fontWeight: '900',
        textAlign: 'center'
    },
    shareButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        margin: 20
    },
    startButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10
    },
    startButtonText: {
        fontSize: 35,
        color: 'black'
    },
    timer: {
        fontSize: 40,
        color: 'white',
        fontWeight: '900'
    },
    title: {
        fontSize: 50,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 75
    }
});

export default styles;  