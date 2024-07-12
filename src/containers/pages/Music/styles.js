import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";

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
    }, gridView: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: responsiveFontSize(.5),
        padding: responsiveFontSize(.5),
        height: responsiveHeight(28),
    },
    itemName: {
        fontSize: responsiveFontSize(.8),
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: responsiveFontSize(.6),
        color: '#fff',
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
    }, fullScreen: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    navBar: { height: 80, justifyContent: 'flex-start', flexDirection: 'row' },
    backButton: { width: responsiveFontSize(4), height: responsiveFontSize(4), justifyContent: 'center', alignItems: 'center' },
    movieLogo: { height: '100%', aspectRatio: 2, paddingLeft: 10 },
    bigPlayButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    controlBarContainer: { height: responsiveFontSize(6), flexDirection: 'row' },
    coverView: { width: 100, backgroundColor: 'white' },
    controlsContainer: { flexDirection: 'column', flex: 1 },
    controls: {
        flex: 2,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    }, playerContainer: {
        height: 100,
        flex: 1,
        flexDirection: 'row'
    },mainView: {
        height:'100%',
        width: '100%'
    },
    mainControls: { width: '100%', alignItems: 'center' },
    audioControls: { flex: 1, flexDirection: 'row', alignItems: 'stretch' },
    volumeBar: { flex: 1, marginLeft: 20 },
    padded: { height: 20 },
    controlBar: { flex: 1.5, backgroundColor: 'rgba(0,0,0,0.65)' },
    seekBar: { flex: 1, justifyContent: 'center' },
    title: {
        color: '#ffffff',
        fontSize: responsiveFontSize(.8),
        fontWeight: '600'
    },
    year: {
        color: '#ffffff',
        fontSize: responsiveFontSize(.7),
        marginLeft: 10
    }, containerRepro: {
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
    }, progressLabelTitle: {
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
    }, progressLabelText: {
        overflow: 'visible',
        marginRight: 5,
        fontWeight: '500',
        fontSize: responsiveFontSize(1),
        color: '#fff',
        marginLeft: 5,
    }, track: {
        height: 5,
        marginHorizontal: 2,
        backgroundColor: '#00000054'
    }, thumb: {
        width: responsiveFontSize(2),
        height: responsiveFontSize(2),
        borderRadius: 50,
        backgroundColor: '#fff',
    }, progressLavelControllerContainer: {
        height: '100%',
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});