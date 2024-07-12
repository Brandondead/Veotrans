import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000'
    }, logo: {
        position: 'absolute',
        margin: 'auto',
        width: '100%',
        height: '100%',
        zIndex: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#0562f73f',
        alignItems: 'center'
    }, fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }, mainContainer: {
        backgroundColor: "#444",
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
    }, button:{
        position: 'absolute',
        top: responsiveFontSize(1),
        left: responsiveFontSize(1),
        width: responsiveFontSize(3),
        borderRadius: responsiveFontSize(2),
        height: responsiveFontSize(3),
        backgroundColor: '#f000005f'
    }
});