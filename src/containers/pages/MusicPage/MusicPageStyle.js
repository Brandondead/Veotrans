import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";


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
    }, gridItemUp_2: {
        height: '65%'
    },gridItemUp_3: {
        height: '18%',
    }, gridItemUp: {
        marginBottom: 5,
        marginTop: 5,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'visible',
    },
    gridItemUpLeft: {
        marginRight: 10,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItemUpRight: {
        width: '100%',
    }, gridItemUpRight_2: {
        width: '100%',
    },
    grid_row: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: "visible",
        position: "relative"
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    icon: {
        alignSelf: 'center',
        justifyContent: "center",
        alignContent: 'center',
        alignSelf: 'center'
    }, borderColor: {
        borderColor: 'rgba(255, 255, 255, .07)',
        backgroundColor: 'rgba(255, 255, 255, .05)',
        borderWidth: 1,
        borderRadius: responsiveHeight(3.5),
        overflow: 'hidden',
    },
    shadowEffect: {
        // Estilos de sombra para iOS
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .5,
        shadowColor: "#00000023",
        shadowRadius: 5,
        elevation: 1,
        borderColor: '#00000011',
        borderWidth: 2,
        borderRadius: responsiveHeight(3.5)
    }, progress: {
        position: 'relative',
        backgroundColor: 'red',
        marginTop: -10
    }, containerRepro: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
    }, progressLevelDuration: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, progressLabelText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: responsiveFontSize(.5),
        flex: 1,
        justifyContent: 'center'
    }, progressLevelTitle: {
        width: '100',
        flexDirection: "row",
        justifyContent: 'flex-start',
    }, progressLabelTitle: {
        position: 'relative',
        marginLeft: responsiveFontSize(1),
        flex: 1,
        justifyContent: 'center',
        color: '#999',
        fontWeight: '300',
        fontSize: responsiveFontSize(.8),
    }, progressLavelController: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'

    }, progressLabelController: {
        width: '100%'
    }, progressLabelText: {
        marginTop: -10,
        paddingHorizontal: responsiveFontSize(.5),
        overflow: 'visible',
        marginRight: 5,
        fontWeight: '500',
        fontSize: responsiveFontSize(.7),
        color: '#fff',
        marginLeft: 5,
    }, track: {
        height: 5,
        marginHorizontal: 2,
        backgroundColor: '#00000054'
    }, thumb: {
        width: responsiveFontSize(1.5),
        height: responsiveFontSize(1.5),
        borderRadius: 50,
        backgroundColor: '#ffffff7f',
    }, progressLavelControllerContainer: {
        height: '100%',
        marginTop: -5,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, containerVlumController: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
    }, thumbVolumen: {
        width: responsiveFontSize(1.5),
        height: responsiveFontSize(1.5),
        borderRadius: 50,
        backgroundColor: '#fff',
    }, trackVolumen: {
        height: responsiveHeight(2.5),
        marginHorizontal: responsiveHeight(1),
        backgroundColor: '#00000054'
    }, mute: {
        flex: 2
    },
    slider: {
        flex: 6
    }, input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: '100%',
        color: '#fff',
        borderRadius: 8,
        fontSize: responsiveFontSize(1),
    }, item: {
        height: responsiveFontSize(2.5),
        justifyContent: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 20,
    },
    title: {
        color: '#777',
        fontSize: responsiveFontSize(1),
    }, buttonController: {
        opacity: 0.9,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        flex: 1,
        width: '100%',
        height: '100%'
    }
});