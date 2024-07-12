import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from 'react-native-slider';
import Icon from "react-native-vector-icons/Ionicons";

const VolumeBar = ({ currentPosition, onToggle, onSeek, onSlidingStart }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.mute} activeOpacity={0.8} onPress={onToggle}>
                <Icon style={{color:"#fff"}} name={`${currentPosition===0 ? 'md-volume-off' : 'md-volume-high'}`} size={32}/>
            </TouchableOpacity>
            <Slider
                maximumValue={100}
                step={1}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSeek}
                value={currentPosition}
                style={styles.slider}
                minimumTrackTintColor='#fff'
                maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
                thumbStyle={styles.thumb}
                trackStyle={styles.track}/>
        </View>
    );
};

export default VolumeBar;

const styles = StyleSheet.create({
    mute:{
        flex:2
    },
    slider: {
        flex:6
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    track: {
        height: 8,
        borderRadius: 5,
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: '#fff',
    }
});