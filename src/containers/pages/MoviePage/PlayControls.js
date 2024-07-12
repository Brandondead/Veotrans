import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from "react-native-vector-icons/MaterialIcons";

const PlayControls = ({ paused, onPressPlay, onPressPause, onBack, onForward, forwardDisabled }) => (

    <View style={styles.container}>
        <TouchableOpacity onPress={onBack}>
            <Icon color={"#fff"} name={'fast-rewind'} size={responsiveFontSize(2)}/>
        </TouchableOpacity>
        <View style={styles.padded} />
        {!paused ?
            <TouchableOpacity onPress={onPressPause}>
                <Icon color={"#fff"} name={'pause'} size={responsiveFontSize(2.5)}/>
            </TouchableOpacity> :
            <TouchableOpacity onPress={onPressPlay}>
                <Icon color={"#fff"} name={'play-arrow'} size={responsiveFontSize(2.5)}/>
            </TouchableOpacity>
        }
        <View style={styles.padded} />
        <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
            <Icon color={forwardDisabled?"#ffffff4f":"#fff"} name={'fast-forward'} size={responsiveFontSize(2)}/>
        </TouchableOpacity>
    </View>
);

export default PlayControls;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryControl: {
        height: 18,
        width: 18,
        marginLeft: 10,
        marginRight: 10
    },
    off: {
        opacity: 0.30,
    },
    padded: {width: 20}
});