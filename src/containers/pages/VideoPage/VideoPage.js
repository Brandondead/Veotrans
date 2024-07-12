import React, { Component } from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import { getSettings } from '../../../actions/SettingsActions';
import { TopIndex } from '../../../components';

import axios from 'axios';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import SeekBar from '../../../components/common/controllers/SeekBar';

import { strings } from '../../../utils/I18n';
import PlayControls from '../MoviePage/PlayControls';
import { styles } from './VideoPageStyle';
const Urlapibase = 'http://ltimeadmin.com/'
const UrlapiAds = 'http://ltimeadmin.com/api/Advertising/getAdlist'
class VideoPage extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            totalLength: 1,
            currentPosition: 0,
            progress: 0,
            showControls: false,
            isLoading: true,
            duration: 0,
            volume: .8,
            videos: [],
            settings: this.props.settings
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ settings: nextProps.settings });
    }

    componentWillMount() {
        this.props.getSettings();
        axios.get(UrlapiAds, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(response => {
            this.setState({
                videos: response.data.data,
                isLoading: false,
                select: null,
            });
            clearInterval(id);

        }).catch(() => {
            this.setState({ isLoading: true });
        })
    }

    toggleControls() {
        let state = this.state;
        state.showControls = !state.showControls;
        if (state.showControls) {
            this.setControlTimeout();
        }
        else {
            this.clearControlTimeout();
        }
        this.setState(state);
    }

    setDuration(data) {
        this.setState({
            totalLength: Math.floor(data.duration),
            audioTracks: data.audioTracks.map(track => track.language),
            textTracks: data.textTracks.map(track => track.language)
        });
    }

    setTime(data) {
        this.setState({ currentPosition: Math.floor(data.currentTime) });
    }

    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    }

    onRewind() {
        if (this.state.currentPosition > 10) {
            this.seek(this.state.currentPosition - 10);
        } else {
            this.refs.audioElement.seek(0);
            this.setState({
                currentPosition: 0,
            });
        }
    }

    onForward() {
        if (this.state.totalLength - this.state.currentPosition > 10) {
            this.seek(this.state.currentPosition + 10);
        } else {
            this.seek(this.state.totalLength);
        }
    }
    _onScreenTouch() {
        this.toggleControls();
    }
    _hideControls() {
        if (this.mounted) {
            let state = this.state;
            state.showControls = false;
            this.setState(state);
        }
    }

    setControlTimeout() {
        this.controlTimeout = setTimeout(() => {
            this._hideControls();
        }, 10000);
    }

    clearControlTimeout() {
        clearTimeout(this.controlTimeout);
    }

    resetControlTimeout() {
        this.clearControlTimeout();
        this.setControlTimeout();
    }

    renderItem = ({ item, index }) => {
        const { theme } = this.state.settings;
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {this.setState({select: item, paused: false})}}>
                <View style={styles.itemContainer}>
                    <View style={styles.albumInfo}>
                        <View style={{ aspectRatio: 14 / 9, width: '100%', backgroundColor: theme, alignContent: 'center', alignItems: 'center', justifyContent: 'center', opacity: .8 }}>
                            <Text style={{ color: '#fff', fontSize: responsiveFontSize(2) }}>{index}</Text>
                        </View>
                        <Text style={styles.itemName} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>);
    }

    render() {
        const { select, videos } = this.state;
        if (select != null) {
            return (
                <TouchableWithoutFeedback style={styles.playerContainer} onPress={this._onScreenTouch.bind(this)}>
                    <View style={styles.mainView}>
                        <Video
                            source={{
                                uri: `${Urlapibase}${select.dirname}/${select.basename}`
                            }}
                            ref="audioElement"
                            resizeMode="cover"
                            paused={this.state.paused}
                            muted={false}
                            repeat={false}
                            onLoadStart={this.loadStart}
                            onLoad={this.setDuration.bind(this)}
                            onProgress={this.setTime.bind(this)}
                            onEnd={() => { this.setState({select: null})}}
                            onError={(err) => { console.log(err) }}
                            volume={this.state.volume}
                            style={styles.fullScreen}
                            selectedAudioTrack={this.state.selectedAudioTrack}
                            selectedTextTrack={this.state.selectedTextTrack}
                        />
                        {
                            this.state.showControls &&
                            <View style={styles.fullScreen}>

                                <View style={styles.navBar}>
                                    <View style={styles.backButton}>
                                        <TouchableOpacity activeOpacity={0.8}
                                            onPress={() => {
                                                this.setState({ select: null, paused: true, currentPosition: 0 })
                                            }}
                                            style={{ width: '100%', height: '100%', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon
                                                name={`chevron-left`}
                                                color={'#ffffff'}
                                                size={responsiveFontSize(2)}
                                                style={{ paddingLeft: 5 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.movieLogo}>
                                        {

                                        }
                                    </View>
                                </View>

                                <View style={styles.bigPlayButton}>

                                    {
                                        this.state.paused ?
                                            <TouchableOpacity onPress={() => this.setState({ paused: false })}>
                                                <Icon color={'#ffffff'} name={'play-circle-outline'} size={140} />
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => this.setState({ paused: true })}>
                                                <Icon color={'#ffffff'} name={'pause-circle-outline'} size={140} />
                                            </TouchableOpacity>
                                    }
                                </View>

                                <View style={styles.controlBarContainer}>
                                    <View style={styles.controlsContainer}>
                                        <View style={styles.padded} />
                                        <View style={styles.controlBar}>
                                            <View style={[styles.seekBar, { paddingTop: responsiveFontSize(.5) }]}>
                                                <SeekBar onSeek={this.seek.bind(this)}
                                                    trackLength={this.state.totalLength}
                                                    onSlidingStart={() => this.setState({ paused: true })}
                                                    currentPosition={this.state.currentPosition}
                                                />
                                            </View>
                                            <View style={styles.controls}>
                                                <View style={styles.mainControls}>
                                                    <PlayControls onPressPlay={() => this.setState({ paused: false })}
                                                        onPressPause={() => this.setState({ paused: true })}
                                                        onBack={this.onRewind.bind(this)}
                                                        onForward={this.onForward.bind(this)}
                                                        paused={this.state.paused} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return (
            <View style={[{ backgroundColor: '#202124' }, styles.container]}>
                <TopIndex navigation={this.props.navigation} title={strings.about} />
                <FlatGrid
                    itemDimension={240}
                    items={videos}
                    style={styles.gridView}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        settings: state.settingsReducer.settings
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSettings: () => dispatch(getSettings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);