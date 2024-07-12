import { StyleSheet } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 10,
        width: "100%",
        height: "100%",
        paddingLeft: 20,
        paddingBottom: 10,
        paddingRight: 20,
        position: 'relative',
        overflow: 'visible',
    },
    gridItemUp_2: {
        height: '60%',
    }, gridItemUp_3: {
        height: '18%',
    },
    gridItemUp: {
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '10%',
        position: 'relative',
        overflow: 'visible',
    },
    borderColor: {
        borderColor: 'rgba(255, 255, 255, .07)',
        backgroundColor: 'rgba(255, 255, 255, .05)',
        borderWidth: 1,
        borderRadius: responsiveHeight(4),
        overflow: 'hidden',
    },
    shadowEffect: {
        // Estilos de sombra para iOS
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .5,
        shadowColor: "#000",
        shadowRadius: 5,
        elevation: 1,
        borderColor: '#00000021',
        borderWidth: 2,
    },options: {
        flexDirection: 'row',
        justifyContent: 'center',
    },option: {
        width: "26%",
        aspectRatio: 1,
        padding: 20
    },
    gridItemUpLeft: {
        flex: 4,
        marginRight: 10,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItemUpRight: {
        flex: 1,
        width: '100%',
    }, gridItemUpRight_2: {
        flex: 3,
        width: '100%',
    },
    toolbar: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    icon: {
        alignSelf: 'center',
        justifyContent: "center",
        alignContent: 'center',
         alignSelf: 'center'
    },
});