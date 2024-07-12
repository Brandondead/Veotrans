import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from "react-native-video";
import { styles } from "./MusicPageStyle";

const ApiBase = 'http://ltimeadmin.com/';
const minutesAndSeconds = (value, length) => (
    new Date(value * 1000).toISOString().substr(length > 3600 ? 11 : 14, length > 3600 ? 8 : 5)
);

const ReproMusic = ({ track, OnChange, id, limit, volum=.8 }) => {
    const [totalLength, setTotalLength] = useState(1);
    const [currentPosition, setCurrentPosition] = useState(0)
    const [paused, setPaused] = useState(false);
    const [volume, setVolume] = useState(volum);
    const [isChanging, setChanging] = useState(false)
    const onSlidingStart = () => {
        setPaused(false);
    };

    const setDuration = data => {
        setTotalLength(Math.floor(data.duration));
    };

    const setTime = data => {
        setCurrentPosition(Math.floor(data.currentTime));
    };

    const onSlidingComplete = value => {
        setCurrentPosition(value);
        this.player.seek(value)
        setPaused(true);
    };

    const onBack = () => {
        if (currentPosition < 15 && track != null) {
            setTimeout(() => {
                setCurrentPosition(0)
                this.player.seek(0)
                setPaused(false)
            }, 0);
        } else if (track != null) {
            setCurrentPosition(currentPosition - 15)
            this.player.seek(currentPosition - 15)
        }
    }

    const onForward = () => {
        if (currentPosition > totalLength - 15 && track != null) {
            setTimeout(() => {
                setCurrentPosition(totalLength)
                this.player.seek(totalLength)
                setPaused(false)
            }, 0);
        } else if (track != null) {
            setCurrentPosition(currentPosition + 15)
            this.player.seek(currentPosition + 15)
        }
    }

    const elapsed = minutesAndSeconds(currentPosition, totalLength);
    const remaining = minutesAndSeconds(totalLength - currentPosition, totalLength);
    return (
        <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 1.5, position: 'relative', flexDirection: 'column' }]}>
            <View style={[styles.grid_row, { flex: 1.2 }]}>
                <Text style={styles.progressLabelTitle}>{track.name}</Text>
            </View>
            <View style={[styles.grid_row, { flex: 2.5 }]}>
                <View style={[styles.grid_row, { height: '30%', marginBottom: 5, paddingHorizontal: responsiveFontSize(1) }]}>
                    <View style={styles.containerRepro}>
                        <Slider
                            maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
                            value={currentPosition}
                            onSlidingStart={onSlidingStart}
                            onSlidingComplete={onSlidingComplete}
                            minimumTrackTintColor='#fff'
                            maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
                            thumbStyle={styles.thumb}
                            trackStyle={styles.track}
                        />
                    </View>
                </View>

            </View>
            <View style={[styles.grid_row, { height: '40%' }]}>
                <View style={[styles.progressLevelDuration, {}]}>
                    <Text style={styles.progressLabelText}>{elapsed}</Text>
                    <View style={[styles.progressLavelController]}>
                        <View style={[styles.progressLavelControllerContainer]} >
                            <View style={[{ flex: 1, }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onBack()
                                    }}
                                    style={styles.buttonController}
                                >
                                    <Icon
                                        name={'skip-previous'}
                                        color={'#fff'}
                                        size={responsiveFontSize(1.5)}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[{ flex: 1 }]}>
                                <TouchableOpacity
                                    style={styles.buttonController}
                                    onPress={() => { setPaused((!paused)) }}>
                                    <Icon style={styles.icon} color={'#fff'} name={(paused) ? 'pause' : 'play'} size={responsiveFontSize(2.5)} />
                                </TouchableOpacity>

                            </View>
                            <View style={[{ flex: 1 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        onForward()
                                    }}
                                    style={styles.buttonController}
                                >
                                    <Icon
                                        name={'skip-next'}
                                        color={'#fff'}
                                        size={responsiveFontSize(1.5)}
                                        style={styles.icon}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.progressLabelText}>{remaining}</Text>
                </View>
            </View>
            {track != undefined &&
                <Video
                    source={{ uri: `${ApiBase}${track.pathurl}` }}
                    style={{ display: 'none' }}
                    muted={false}
                    repeat={false}
                    onLoadStart={this.loadStart}
                    onLoad={setDuration}
                    onProgress={setTime}
                    paused={!paused}
                    resizeMode={"cover"}
                    volume={volume}
                    ref={ref => this.player = ref}
                    rate={1.0}
                    ignoreSilentSwitch={"ignore"}
                    playWhenInactive={true}
                    playInBackground={true}
                />
            }
        </View>
    )
}

export default ReproMusic;