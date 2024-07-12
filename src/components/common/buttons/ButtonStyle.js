import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const toolbarButtonStyles = StyleSheet.create({
    button: {
        width:responsiveWidth(4),
        height: responsiveHeight(7),
        borderRadius: 10,
        backgroundColor: '#fffff03f',
        borderColor: '#8888882f',
        borderWidth: responsiveFontSize(.08),
        elevation: responsiveFontSize(.08),
        flexDirection: 'row',
        padding: 2,
        marginRight: responsiveFontSize(.5),
        justifyContent: 'center'
    },
    icon: {
        paddingLeft: 0,
        alignSelf: 'center',
        marginRight: 0,
        flex: 1
    },
    title: {
        fontSize:  responsiveFontSize(1),
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
    }
});

export const menuButtonStyles = StyleSheet.create({
    button: {
        borderRadius: responsiveFontSize(1),
        backgroundColor: 'transparent',
        flexDirection: 'column',
        borderColor: '#0000003f',
        backgroundColor: '#0000001f',
        elevation: responsiveFontSize(.5),
        borderWidth: responsiveFontSize(.1),
        margin: responsiveFontSize(.5)
    },
    icon: {
        flex:1,
        paddingTop: responsiveFontSize(.4)
    },
    title: {
        fontSize: responsiveFontSize(.8),
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    }
});

export const actionButtonStyles = StyleSheet.create({
    button: {
       width: '100%',
       height: '100%',
       justifyContent: 'center',
       alignItems: 'center',
       alignContent: 'center',
    },
    icon: {
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        alignSelf: 'center',
        paddingRight: 10
    }
});