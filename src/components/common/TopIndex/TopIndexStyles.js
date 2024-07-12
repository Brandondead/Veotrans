import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";


export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
    }, conten: {
        width: '100%',
        height: '100%',
        marginLeft: responsiveFontSize(.5)
    }, row: {
        flexDirection: 'row',
    }, column: {
        flexDirection: 'column'
    }, borderRadius: {
        borderRadius: responsiveFontSize(1),
        overflow: 'hidden',
        borderWidth: responsiveFontSize(.04),
        borderColor: '#0000002f',
        elevation: responsiveFontSize(.1)
    }, glass: {
        backgroundColor: '#2222222f'
    }, logo: {
        padding: responsiveFontSize(.3),
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }, center: {
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        color: '#fff',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    }
});