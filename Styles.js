import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    backHomeTTPDText: {
        fontSize: 24,
        color: 'black'
    },
    bead: {
        width: 29,
        height: 29,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    beadBlank: {
        width: 14,
        height: 23,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 0.2
    },
    beadColor: {
        width: 30,
        height: 30,
        borderRadius: 50,
        margin: 5
    },
    beadColorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    beadFontContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    beadText: {
        fontSize: 22,
        padding: 1,
        fontWeight: '800',
        alignSelf: 'center',
    },
    bracelet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
    },
    braceletAddButton: {
        backgroundColor: '#2cdb55',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom: 5
    },
    braceletButton: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10
    },
    braceletButtonText: {
        fontSize: 20,
        padding: 10,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center'
    },
    braceletContainerHome: {
        marginTop: 50,
    },
    braceletContainer: {
        marginVertical: 10,
        width: '100%',
    },
    braceletControlPanel: {
        flexDirection: 'column',
        padding: 5,
        margin: 5,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
    },
    braceletControlPanelText: {
        fontSize: 25,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10
    },
    braceletControls: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    braceletInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        borderColor: 'black',
        width: 100,
        alignSelf: 'center',
        borderWidth: 1
    },
    braceletPageButton: {
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        borderColor: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 3,
    },
    braceletPageButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center'
    },
    braceletRemoveButton: {
        backgroundColor: '#f03835',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    caption: {
        fontSize: 54,
        color: 'black',
        fontWeight: '800'
    },
    captionMidnights: {
        fontSize: 40,
        color: '#546488',
        fontWeight: '800',
        marginBottom: 10
    },
    date: {
        fontSize: 25,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
    },
    dateTTPD: {
        fontSize: 19,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center'
    },
    endgame: {
        fontSize: 17,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center'
    },
    endgameRep: {
        fontSize: 35,
        color: 'white',
        fontWeight: '800',
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
        maxHeight: '30%',
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
        borderTopWidth: 55,
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderBottomWidth: 10,
    },
    homeMidnights: {
        flex: 1,
        borderColor: '#e8e9e1',
        borderLeftWidth: 20,
        borderTopWidth: 10,
        borderRightWidth: 20,
        borderBottomWidth: 30,
    },
    homeTTPD: {
        flex: 1,
        borderColor: '#ebe9df',
        borderTopWidth: 60,
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 40,
    },
    homeCaptionView: {
        height: 113,
        backgroundColor: '#e8e9e1',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    homeCaptionViewMidnights: {
        height: 113,
        backgroundColor: '#e8e9e1',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'
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
    previewBead: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    creditText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 30
    },
    questionContainer: {
        flex: 1,
        backgroundColor: '#191a1c',
    },
    questionLoadingContainer: {
        flex: 1,
        backgroundColor: '#191a1c',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    questionNumber: {
        fontSize: 20,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },
    quote: {
        fontSize: 31,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 3,
        fontFamily: 'folklore'
    },
    quote1989: {
        fontSize: 37,
        color: '#43bfe6',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: '1989'
    },
    quoteDebut: {
        fontSize: 27,
        color: '#66ed6f',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'debut'
    },
    quoteEvermore: {
        fontSize: 27,
        color: '#f7e8cd',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'folklore'
    },
    quoteFearless: {
        fontSize: 27,
        color: '#f0e68c',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'fearless'
    },
    quoteFolklore: {
        fontSize: 27,
        color: '#baaa8f',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'folklore'
    },
    quoteLover: {
        fontSize: 45,
        color: '#e1aae6',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontFamily: 'love'
    },
    quoteMidnight: {
        fontSize: 27,
        color: '#7485e8',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontFamily: 'midnights'
    },
    quoteRep: {
        fontSize: 37,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'rep'
    },
    quoteSpeakNow: {
        fontSize: 27,
        color: '#722482',
        textAlign: 'center',
        paddingVertical: 10,
        fontFamily: 'debut'
    },
    quoteTTPD: {
        fontSize: 24,
        color: '#aeaeb0',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontFamily: 'TTPD'
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
        borderColor: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 3,
        padding: 15,
        borderRadius: 10,
        marginTop: 10
    },
    startButtonText: {
        fontSize: 35,
        textAlign: 'center',
        color: 'white'
    },
    themeButton: {
        borderRadius: 3,
        margin: 10,
        color: 'black'
    },
    themeFont: {
        fontSize: 40,
    },
    themeList: {
        flexDirection: 'column'
    },
    timer: {
        fontSize: 40,
        color: 'white',
        fontWeight: '900'
    },
    title: {
        fontSize: 40,
        color: 'white',
        fontWeight: '800',
        textAlign: 'center',
    },
    titleTTPD: {
        fontSize: 27,
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