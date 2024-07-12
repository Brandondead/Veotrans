import axios from 'axios';
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { getSettings } from '../../../actions/SettingsActions';
import { ActivityIndicator, ImageBackground, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import { withNavigation } from 'react-navigation';
import { TopIndex } from '../../../components';
import SeekBar from '../../../components/common/controllers/SeekBar';
import PlayControls from '../MoviePage/PlayControls';
import { styles } from './styles';


const UrlapiAds = 'http://ltimeadmin.com/api/Advertising/getAdlist';
const Urlapibase = 'http://ltimeadmin.com/'


class VideoPage extends PureComponent {
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
      select: null,
      showControls: false,
      isLoading: true,
      duration: 0,
      volume: .8,
      videos: [],
      settings: this.props.settings
    };
  }

  componentDidMount() {
    this.props.getSettings();
    const id = setInterval(() => {
      this.fetchData(id);
    }, 5000);
  }

   componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ settings: nextProps.settings });
    }

  componentWillUnmount() {
    clearInterval(this.fetchIntervalId);
    StatusBar.setHidden(true);
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

  fetchData(id) {
    axios
      .get(UrlapiAds, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        this.setState({
          videos: response.data.data,
          isLoading: false,
        });
        clearInterval(id);
      })
      .catch(() => { });
  }

  renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => { this.setState({ select: item, paused: false }) }}>
      <ImageBackground
        source={require('../../../assets/logo.png')}
        resizeMode="center"
        style={[styles.itemContainer, { backgroundColor: '#999' }]}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCode}>#{index}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  render() {
    const { videos, isLoading, select } = this.state;
    const { theme } = this.state.settings;
    if (select !== null) {
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
              onEnd={() => { this.setState({ select: null }) }}
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
      <LinearGradient
        style={styles.container}
        start={{ x: 0.5, y: 0.2 }}
        end={{ x: 0.5, y: 2.5 }}
        colors={['#002', theme]}
      >
        <TopIndex title={'Videos'} navigation={this.props.navigation} />
        <View style={[styles.glass, { flex: 7 }, styles.borderRadius, styles.conten, styles.center]}>
          {!isLoading && videos !== null && (
            <FlatGrid
              itemDimension={responsiveFontSize(15)}
              items={videos}
              style={styles.gridView}
              renderItem={this.renderItem}
            />
          )}
          {isLoading && <ActivityIndicator size={'200%'} color={theme}/>}
        </View>
      </LinearGradient>
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
