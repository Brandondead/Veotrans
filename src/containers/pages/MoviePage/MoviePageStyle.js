import { Platform, StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";


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
    },
    containerShadow: {
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(8),
        marginLeft: responsiveWidth(6),
        marginRight: responsiveWidth(6),
        borderRadius: responsiveHeight(3.5),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 1,
            }
        })
    },
    containerShadowElevated: {
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(8),
        marginLeft: responsiveWidth(6),
        marginRight: responsiveWidth(6),
        borderRadius: responsiveHeight(3.5),
        ...Platform.select({
            android: {
                elevation: 1,
            }
        })
    }, genreContainer: {
        flexDirection: "row",
        justifyContent: "space-between"

    }, gridView: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: "#202124"
    },
    itemContainer: {
        margin: 15,
        height: 280,
    },
    albumInfo: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center'
    },
    itemName: {
        fontSize: responsiveFontSize(.8),
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center'
    },
    itemCode: {
        fontWeight: '400',
        fontSize: responsiveFontSize(0.8),
        color: '#e1e1e1',
    },track:{
        height: 5,
        marginHorizontal: 2,
        backgroundColor: '#00000054'
    }, thumb:{
        width: responsiveFontSize(2),
        height: responsiveFontSize(2),
        borderRadius: 50,
        backgroundColor: '#fff',
    }, duration:{
        color: '#fff',
        marginLeft: 15
    },playerContainer:{
        height: 100,
        flex: 1,
        flexDirection: 'row'
    },
    mainView: {
        height:'100%',
        width: '100%'
    },
    fullScreen:{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0},
    navBar: {height: 80, justifyContent: 'flex-start', flexDirection: 'row'},
    backButton: {width: responsiveFontSize(4), height: responsiveFontSize(4), justifyContent: 'center', alignItems: 'center'},
    movieLogo: {height: '100%', aspectRatio: 2, paddingLeft: 10},
    bigPlayButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    controlBarContainer: {height: responsiveFontSize(6), flexDirection: 'row'},
    coverView: {width: 100, backgroundColor: 'white'},
    controlsContainer: {flexDirection: 'column', flex: 1},
    controls: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    mainControls: {width: '100%', alignItems: 'center'},
    audioControls: {flex: 1, flexDirection: 'row', alignItems: 'stretch'},
    volumeBar: {flex: 1, marginLeft: 20},
    padded: {height: 20},
    controlBar: {flex: 1.5, backgroundColor: 'rgba(0,0,0,0.65)'},
    seekBar: {flex: 1, justifyContent: 'center'},
    title: {
        color: '#ffffff',
        fontSize: responsiveFontSize(.8),
        fontWeight: '600'
    },
    year: {
        color: '#ffffff',
        fontSize: responsiveFontSize(.7),
        marginLeft: 10
    },containerRepro: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        padding: 10,
    }, progressLevelDuration: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, progressLevelTitle: {
        width: '100',
        flexDirection: "row",
        justifyContent: 'flex-start',
    },progressLabelTitle:{
        color: '#888',
        fontWeight: '300',
        fontSize: responsiveFontSize(1.2),
        flex: 1,
        justifyContent: 'center'
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
    }, progressLabelText:{
        overflow: 'visible',
        marginRight: 5,
        fontWeight: '500',
        fontSize: responsiveFontSize(1),
        color: '#fff',
        marginLeft: 5,
    },track:{
        height: 5,
        marginHorizontal: 2,
        backgroundColor: '#00000054'
    }, thumb:{
        width: responsiveFontSize(2),
        height: responsiveFontSize(2),
        borderRadius: 50,
        backgroundColor: '#fff',
    }, progressLavelControllerContainer:{
        height: '100%',
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },laterales:{
        flex: .5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }

});