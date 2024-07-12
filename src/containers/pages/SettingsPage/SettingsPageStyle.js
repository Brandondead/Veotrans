import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        paddingTop: 10,
        paddingLeft: 20,
        paddingBottom: 10,
        paddingRight: 20,
        position: 'relative',
        overflow: 'visible',
    },
    icon: {
        alignSelf: 'center',
        justifyContent: "center",
        alignContent: 'center',
        alignSelf: 'center'
    }, containerPinDop: {
        margin: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, pinDop: {
        width: responsiveFontSize(3),
        height: responsiveFontSize(3),
        backgroundColor: '#ffffff46',
        elevation: responsiveFontSize(0.5),
        borderRadius: responsiveFontSize(3),
        shadowColor: "#fff",
    }, button: {
        backgroundColor: '#2A004A',
        width: responsiveFontSize(3.5),
        height: responsiveFontSize(3.5),
        borderRadius: responsiveFontSize(3.5),
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, container_2: {
        position: 'absolute',
        width: responsiveFontSize(4),
        height: responsiveFontSize(4),
        top: responsiveFontSize(1), left:
            responsiveFontSize(1),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveFontSize(4),
        overflow: 'hidden'
    }
});
export const configStyles = StyleSheet.create({
    mainContainer: {width: '100%', flex:5, padding: responsiveFontSize(5)},
    inputContainer: {flexDirection:'row', marginBottom: responsiveFontSize(1), flex: 1},
    inputIcon: {color:"#ffffff", flex: .3, paddingTop: responsiveFontSize(.3)},
    inputLabel: {color: '#ffffff', flex: 1, fontSize: responsiveFontSize(1), paddingTop: responsiveFontSize(.3), textAlign: 'center'},
    input: {color: '#1a1a1a', flex: 2.5, fontSize: responsiveFontSize(1), backgroundColor: "#fcfcfc", borderColor: "#dddddd", borderRadius: responsiveFontSize(0.2), padding: 0, paddingLeft: responsiveFontSize(.5)}
});