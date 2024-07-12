import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Slider from 'react-native-slider';

function pad(n, width, z=0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (value, length) => (
    new Date(value * 1000).toISOString().substr(length > 3600 ? 11 : 14, length > 3600 ? 8 : 5)
);

const SeekBar = ({ trackLength, currentPosition, onSeek, onSlidingStart }) => {

    const elapsed = minutesAndSeconds(currentPosition, trackLength);
    const remaining = minutesAndSeconds(trackLength - currentPosition, trackLength);

    return (
        <View style={styles.container}>
            <Slider
                maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSeek}
                value={currentPosition}
                style={styles.slider}
                minimumTrackTintColor='#ffffff4f'
                maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
                thumbStyle={styles.thumb}
                trackStyle={styles.track}/>
            <View style={{flexDirection: 'row', marginTop: responsiveFontSize(.3)}}>
                <Text style={[styles.text, {marginLeft:10}]}>
                    {elapsed}
                </Text>
                <View style={styles.spacer} />
                <Text style={[styles.text, {width: 60, marginRight:10}]}>
                    -{remaining}
                </Text>
            </View>

        </View>
    );
};

export default SeekBar;

const styles = StyleSheet.create({
    slider: {
        marginTop: responsiveFontSize(.8)
    },
    container: {
        marginTop: responsiveFontSize(.5),
        paddingHorizontal: responsiveFontSize(1),
    },
    track: {
        height: responsiveFontSize(.4),
        borderRadius: 0,
    },
    thumb: {
        width: responsiveFontSize(2),
        height: responsiveFontSize(2),
        borderRadius: responsiveFontSize(2),
        backgroundColor: '#ffffff7f',
    },
    spacer: {flex: 1, marginTop:-15, height:1},
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: responsiveFontSize(.5),
        textAlign:'center',
    }
});