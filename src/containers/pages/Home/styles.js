import { StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: responsiveFontSize(.8),
        paddingVertical: responsiveFontSize(.5)
    }, conten: {
        width: '100%',
        margin: responsiveFontSize(.3)
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
    }, options: {
        flexDirection: 'row',
        justifyContent: 'center',
    }, option: {
        width: "26%",
        aspectRatio: 1,
        padding: responsiveFontSize(1)
    },
})