import axios from 'axios';
import React, { Component } from 'react';
import { Image, StatusBar, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
import Video from 'react-native-video';
import { withNavigation } from 'react-navigation';
import { ActionButton } from '../../../components';
import { styles } from './styles';
import { ActivityIndicator } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Urlapibase = 'http://ltimeadmin.com/';
const UrlapiAds = 'http://ltimeadmin.com/api/Advertising/getAdlist';

class WelcomePage extends Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            totalLength: 1,
            currentPosition: 0,
            paused: false,
            isLoading: true,
            visible: false,
            video: null,
        }
    }

    componentDidMount() {
        KeepAwake.activate();
        StatusBar.setHidden(true);
        this.fetchDataTimeout = setTimeout(() => {
            if (this.state.isLoading) {
                this.setState({ visible: true });
            }
        }, 65000);
        this.fetchDataInterval = setInterval(() => {
            this.fetchData();
        }, 1000);
    }

    componentWillUnmount() {
        KeepAwake.deactivate();
        clearInterval(this.fetchDataInterval);
        clearTimeout(this.fetchDataTimeout);
    }

    fetchData() {
        axios
            .get(UrlapiAds, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                const randomNum = Math.floor(Math.random() * response.data.data.length);
                console.log('Random number: ' + randomNum);
                if (randomNum < 0 || randomNum >= response.data.length) {
                    this.setState({ isLoading: true });
                } else {
                    this.setState({
                        video: response.data.data[randomNum],
                        isLoading: false,
                    });
                    clearInterval(this.fetchDataInterval);
                    clearTimeout(this.fetchDataTimeout);
                }
            })
            .catch(() => {
                this.setState({ isLoading: true });
            });
    }

    setDuration = (data) => {
        this.setState({
            totalLength: Math.floor(data.duration),
        });
    };

    setTime = (data) => {
        if (this.state.totalLength <= data.currentTime) {
            if (!this.state.paused) {
                this.props.navigation.navigate('Home');
            }
        }
    };

    render() {
        const { isLoading, video, visible, paused } = this.state;

        const videoSource = { uri: `${Urlapibase}${video?.dirname}/${video?.basename}` };

        return (
            <View style={styles.mainContainer}>
                {!isLoading && <Video
                    source={videoSource}
                    ref={'audioElement'}
                    repeat={false}
                    paused={false}
                    resizeMode={'contain'}
                    onLoad={this.setDuration.bind(this)}
                    onProgress={this.setTime.bind(this)}
                    onEnd={()=> this.props.navigation.navigate('Home')}
                    onError={()=> this.props.navigation.navigate('Home')}
                    volume={.8}
                    style={styles.backgroundVideo}
                />
                }
                {isLoading && (
                    <View style={[styles.logo]}>
                        {visible && (
                            <View style={styles.button}>
                                <ActionButton icon={'cog'} onPress={()=>this.props.navigation.navigate('Settings')} />
                            </View>
                        )}
                        <ActivityIndicator size={'750%'} color={'#fff'} style={{ position: 'absolute',}}/>
                        <Image source={require('../../../assets/logo.png')} />
                    </View>
                )}
            </View>
        );
    }
}
export default withNavigation(WelcomePage)