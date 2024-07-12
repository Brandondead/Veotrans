
import axios from 'axios';
import equal from 'fast-deep-equal';
import { Component } from 'react';
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getSettings } from '../../../actions/SettingsActions';
import { TopIndex } from '../../../components';
import { Grid, Row, Col } from 'react-native-easy-grid'
import SeekBar from '../../../components/common/controllers/SeekBar';
import { strings } from '../../../utils/I18n';
import { styles } from './MoviePageStyle';
import PlayControls from './PlayControls';
import VerticalSlider from 'react-native-vertical-slider-smartlife';
import { GenresButton } from '../../../components/common/buttons/Buttons';
import DeviceBrightness from 'react-native-device-brightness';

const urlBase = 'http://ltimeadmin.com';
const API = `http://ltimeadmin.com/api/video/getVideoList`;
const Urlbg = 'http://ltimeadmin.com/uploads/data/video_img/bg.jpg';
const Urlbanner = 'http://ltimeadmin.com/uploads/data/video_img/banner.jpg';
function secondsToTime(time) {
    return ~~(time / 60) + ":" + (time % 60 > 10 ? "0" : "")
        + time % 60;
}

class MoviePage extends Component {
    static navigationOptions = {
        header: null,

    };
    constructor(props) {
        super(props);
        this.state = {
            totalLength: 1,
            currentPosition: 0,
            paused: false,
            progress: 0,
            showControls: false,
            duration: 0,
            volume: .67,
            select: null,
            genero: '',
            settings: this.props.settings,
            isSelectMovie: false,
            movie: null,
            dataSource: [],
            brightness: .88,
            Error: '',
            isLoading: true,
            selectedAudioTrack: {
                type: "index",
                value: 0
            },
            selectedTextTrack: {
                type: "disabled"
            }
        };
        this.controlTimeout = null;
    }
    componentWillMount() {
        this.props.getSettings();
        KeepAwake.activate();
    }

    componentWillUnmount() {
        this.setState({
            isLoading: true,
            dataSource: [],
            movie: null,
            select: null
        })
        KeepAwake.deactivate();
        DeviceBrightness.setBrightnessLevel(1)

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ settings: nextProps.settings });
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

    toggleMute() {
        this.setState({
            oldVolume: this.state.volume,
            volume: this.state.volume === 0 ? this.state.oldVolume : 0
        });
    }

    componentDidMount() {
        this.setState({ paused: false });
        this.mounted = true;
    }

    componentDidUpdate(prevProps) {
        if (!equal(this.props.tracks, prevProps.tracks)) {
            this.setState({ paused: false });
            return true;
        }
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

    onAudioSelect(event, index) {
        if (event !== 'itemSelected') return;
        this.setState({
            selectedAudioTrack: {
                type: "index",
                value: index
            }
        })
    }

    onTextSelect(event, index) {
        if (event !== 'itemSelected') return;
        this.setState({
            selectedTextTrack: {
                type: "index",
                value: index
            }
        })
    }

    _onScreenTouch() {
        this.toggleControls();
    }

    componentDidMount() {
        const { navigation } = this.props;
    }


    ButtonsGenres = () => {
        return (
            <Grid>
                <Col>
                    <Row style={{ paddingVertical: responsiveFontSize(.2) }}>
                        <GenresButton
                            title={'Accion'}
                            icon={'pistol'}
                            onPress={() => { this.setState({ select: { category: 'A' }, genero: 'Accion' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#FF2121' }} />
                        <GenresButton
                            title={'Estrenos'}
                            icon={'ticket'}
                            onPress={() => { this.setState({ select: { category: 'B' }, genero: 'Estrenos' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#2E7BFF' }} />

                    </Row>
                    <Row style={{ paddingVertical: responsiveFontSize(.2) }}>
                        <GenresButton
                            title={'Comedia'}
                            icon={'emoticon-lol'}
                            onPress={() => { this.setState({ select: { category: 'C' }, genero: 'Comedia' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#AE7100' }} />
                        <GenresButton
                            title={'Romance'}
                            icon={'heart'}
                            onPress={() => { this.setState({ select: { category: 'E' }, genero: 'Romance' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#EB18D9' }} />
                        <GenresButton
                            title={'Drama'}
                            icon={'drama-masks'}
                            onPress={() => { this.setState({ select: { category: 'D' }, genero: 'Drama' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#7964F1' }} />
                    </Row>
                    <Row style={{ paddingVertical: responsiveFontSize(.2) }}>
                        <GenresButton
                            title={'Animacion'}
                            icon={'animation'}
                            onPress={() => { this.setState({ select: { category: 'F' }, genero: 'Animacion' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#33ABAB' }} />
                        <GenresButton
                            title={'Documental'}
                            icon={'video-vintage'}
                            onPress={() => { this.setState({ select: { category: 'G' }, genero: 'Documental' }) }}
                            style={{ margin: responsiveFontSize(.2), backgroundColor: '#7AAC33' }} />
                    </Row>
                </Col>
            </Grid>
        )
    }

    renderItem = ({ item, index }) => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => { { this.setState({ movie: item.pathurl, isSelectMovie: true, paused: false }) } }} style={{ flex: 1 }}>
            <View style={[styles.albumInfo, { flex: 1 }]}>
                <View style={{ width: '100%', aspectRatio: 2 / 3, flex: 7 }}>
                    <View style={{ width: '100%', height: '100%', borderRadius: responsiveFontSize(1), overflow: 'hidden' }}>
                        <Image
                            resizeMode='stretch'
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                            source={{ uri: `${urlBase}${item.coverpath}` }} />
                    </View>
                </View>
                <View style={{ height: '20%', width: '100%', flex: 1, justifyContent: 'center', paddingHorizontal: responsiveFontSize(1) }}>
                    <Text style={[styles.itemName]} numberOfLines={2}>{item.name}</Text>

                </View>
            </View>
        </TouchableOpacity>
    )

    principalComponent = () => {
        const { select } = this.state
        const { theme } = this.state.settings;
        return (
            <View style={[{ height: '88%', width: '100%', padding: 0, flexDirection: 'column' }]}>
                <View style={[styles.gridItemUp, styles.gridItemUp_2, { height: '73%', margin: 0, paddingTop: 0, flexDirection: 'row' }]}>
                    {/** Buttons Genres*/}
                    <View style={[styles.gridItemUpLeft, { flex: 4, marginRight: 0, paddingBottom: responsiveFontSize(.4), height: '100%' }]}>
                        {select == null && this.ButtonsGenres()}
                        {select != null && this.GenreList()}
                    </View>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { backgroundColor: theme, height: '100%', flex: 3, position: 'relative', padding: 0, marginLeft: responsiveFontSize(.5), marginRight: 0 }]}
                        source={{ uri: Urlbg }}
                    />


                </View>
                <ImageBackground
                    resizeMode='cover'
                    style={[styles.gridItemUp, styles.borderColor, styles.gridItemUp_3, styles.shadowEffect, { backgroundColor: theme, height: '20%' }]}
                    source={{ uri: Urlbanner }}
                />
            </View>
        )
    }

    GenreList = () => {
        const { select, dataSource, isLoading, genero } = this.state;
        if (isLoading) {
            axios.post(API, select, {
                headers: { 'Content-Type': 'application/json' },
                'Accept': 'application/json',
            })
                .then((response) => {
                    console.log("Response : ", response.data.data);
                    if (!response.data.error) {
                        this.setState({ dataSource: response.data.data, isLoading: false });
                    } else {
                        alert(response.data.message);
                        this.setState({ isLoading: false });
                    }
                }).catch((error) => { console.log("Error : ", error) })
        }
        return (
            <View style={[styles.gridItemUpLeft, { flex: 4, marginRight: 0, padding: 0, height: '100%' }]}>
                <View style={[styles.gridItemUp, { height: '15%', marginBottom: 1 }]}>
                    <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 2, marginRight: responsiveFontSize(.5), marginLeft: 0 }]}>
                        <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { this.setState({ select: null, dataSource: [], isLoading: true }) }}
                            style={[
                                { opacity: 0.9, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, width: '100%', height: '100%' },
                            ]}>
                            <Icon
                                name={'backburger'}
                                color={'#fff'}
                                size={responsiveFontSize(2)}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.gridItemUpRight, styles.borderColor, styles.shadowEffect, styles.toolbar, { flex: 10 }]}>
                        <Text style={{ flex: 2, textAlign: 'right', fontSize: responsiveFontSize(1.4), fontFamily: 'sans-serif', color: '#fff', marginRight: '5%' }}>
                            {genero}
                        </Text>
                    </View>
                </View>
                <View style={[styles.gridItemUp, styles.shadowEffect, styles.borderColor, { height: '83%' }]}>
                    <View style={{ flex: 1, padding: responsiveFontSize(1), alignContent: 'center', alignItems: 'center' }}>
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={dataSource}
                            enableMomentum={true}
                            renderItem={this.renderItem}
                            initialNumToRender={10}
                            sliderWidth={responsiveWidth(100)}
                            inactiveSlideOpacity={0.1}
                            inactiveSlideScale={0.5}
                            itemWidth={responsiveWidth(25)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { theme } = this.state.settings;
        const { isSelectMovie, select, movie, totalLength, currentPosition, paused, volume, brightness } = this.state;
        const onSlidingStart = () => {
            this.setState({ paused: true })
        };

        const onSlidingComplete = value => {
            this.setState({ currentPosition: value, paused: false });
            this.player.seek(value)
        };
        if (isSelectMovie && movie != null) {
            const { width } = Dimensions.get('window');
            const height = width * .5625;
            DeviceBrightness.setBrightnessLevel(brightness)
            return (
                <TouchableWithoutFeedback style={styles.playerContainer} onPress={this._onScreenTouch.bind(this)}>
                    <View style={styles.mainView}>
                        <Video
                            source={{
                                uri: `${urlBase}${movie}`
                            }}
                            ref="audioElement"
                            resizeMode="cover"
                            paused={paused}
                            muted={false}
                            repeat={false}
                            onLoadStart={this.loadStart}
                            onLoad={this.setDuration.bind(this)}
                            onProgress={this.setTime.bind(this)}
                            onEnd={() => { this.setState({ isSelectMovie: false, paused: true, currentPosition: 0, position: 0 }) }}
                            onError={(err) => { console.log(err) }}
                            volume={volume}
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
                                                this.setState({ isSelectMovie: false, paused: true, currentPosition: 0 })
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

                                <View style={{
                                    flex: 1, flexDirection: 'row'
                                }}>
                                    <View style={styles.laterales}>
                                        <Icon name='brightness-7' size={responsiveFontSize(2.5)} color={'#fff'} style={{ marginBottom: responsiveFontSize(1.5) }} />

                                        <VerticalSlider
                                            value={brightness}
                                            disabled={false}
                                            min={0}
                                            max={1}
                                            onChange={(value) => {
                                                this.setState({ brightness: value })
                                            }}
                                            width={50}
                                            height={300}
                                            step={.005}
                                            borderRadius={5}
                                            minimumTrackTintColor={theme}
                                            maximumTrackTintColor={"#5556"}
                                        />
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
                                    <View style={styles.laterales} >
                                        <Icon name='volume-high' size={responsiveFontSize(2.5)} color={'#fff'} style={{ marginBottom: responsiveFontSize(1.5) }} />
                                        <VerticalSlider
                                            value={volume}
                                            disabled={false}
                                            min={0}
                                            max={1}
                                            onChange={(value) => {
                                                this.setState({ volume: value })
                                            }}
                                            width={50}
                                            height={300}
                                            step={.003}
                                            borderRadius={5}
                                            minimumTrackTintColor={theme}
                                            maximumTrackTintColor={'#5556'}
                                        />
                                    </View>
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
            <LinearGradient style={[styles.container]} start={{ x: 0, y: .2 }} end={{ x: .1, y: 2.5 }} colors={['#112', theme]} >
                <View style={{ width: '100%', height: '15%' }}><TopIndex navigation={this.props.navigation} title={strings.movie} /></View>
                {this.principalComponent()}

            </LinearGradient>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MoviePage));