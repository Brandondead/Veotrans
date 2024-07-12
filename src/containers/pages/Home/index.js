import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PureComponent } from 'react/cjs/react.production.min';
import logo from '../../../assets/logo.png';

const Urlbg = 'http://ltimeadmin.com/uploads/data/video_img/bg.jpg';
const Urlbanner = 'http://ltimeadmin.com/uploads/data/video_img/banner.jpg';


import { NativeModules } from 'react-native';
const OffScreen = NativeModules.OffScreen;
import axios from 'axios';
import { withNavigation } from "react-navigation";
import { connect } from 'react-redux';
import { changeLanguage, getSettings } from '../../../actions/SettingsActions';
import { ActionButton, MenuButtons, ToolbarButton } from '../../../components/common/buttons/Buttons';
import { strings } from '../../../utils/I18n';
import { styles } from './styles';


class HomePage extends PureComponent {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            wifi: false,
            settings: this.props.settings,
            bg: false,
            banner: false,
        };
    }

    componentWillMount() {
        this.fetchDataImagenes();
        this.props.getSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ settings: nextProps.settings });
    }

    componentDidMount() {
        const { navigation } = this.props;
    }


    render() {
        const { banner, bg } = this.state
        const { language } = this.props
        strings.setLanguage(language);
        const { theme } = this.state.settings;
        return (
            <LinearGradient style={styles.container} start={{ x: .5, y: .2 }} end={{ x: .5, y: 2.5 }} colors={['#112', theme]}>
                <View style={[styles.conten, styles.row, { flex: 1, }]}>
                    <View style={[styles.borderRadius, styles.row, styles.glass, { flex: 6, padding: responsiveFontSize(.3) }]}>
                        <View style={[{ flex: 1, padding: responsiveFontSize(.3), alignContent: 'center', justifyContent: 'center', alignItems: 'center' }]}>
                            <Image source={logo} resizeMode='center' style={{ height: '100%', width: '61%' }} />
                        </View>
                        <View style={[styles.row, { flex: 1, padding: responsiveFontSize(.3), alignContent: 'center', justifyContent: 'center', alignItems: 'center' }]}>
                            <ToolbarButton
                                title={'ES'}
                                toggable={true}
                                disabled={strings.getLanguage() === 'es'}
                                onPress={() => {
                                    this.props.changeLanguage('es');
                                }}
                            />
                            <ToolbarButton
                                title={'EN'}
                                disabled={strings.getLanguage() === 'en'}
                                toggable={true}
                                onPress={() => {
                                    this.props.changeLanguage('en');
                                }}
                            />
                        </View>
                        <View style={[styles.row, { flex: 1, padding: responsiveFontSize(.3), alignContent: 'center', justifyContent: 'flex-end', alignItems: 'flex-end' }]}>
                            <Icon name={this.state.wifi ? 'wifi' : 'wifi-off'} color={'#fff'} size={responsiveFontSize(1.6)} style={{ marginLeft: 50, marginRight: 15 }} />
                        </View>
                    </View>
                    <View style={[styles.borderRadius, styles.row, styles.glass, { flex: .5, marginLeft: responsiveFontSize(.5), }]}>
                        <ActionButton icon={'cog'} onPress={() => { this.props.navigation.navigate('Settings') }} />
                    </View>
                    <View style={[styles.borderRadius, styles.row, styles.glass, { flex: .5, marginLeft: responsiveFontSize(.5), }]}>
                        <ActionButton icon={'power'} onPress={() => {
                            OffScreen.turnOffScreen(
                                (error) => {
                                    console.error('Error turning off screen:', error);
                                },
                                (success) => {
                                    console.log('Success:', success);
                                }
                            );
                        }} />
                    </View>
                </View>
                <View style={[styles.conten, styles.row, { flex: 5, }]}>
                    <View style={[styles.column, styles.borderRadius, styles.glass, { flex: 1.2, marginRight: responsiveFontSize(.5), }]}>
                        <View style={[styles.options, { justifyContent: 'center', flex: 1, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }]}>
                            <MenuButtons
                                style={styles.option}
                                title={strings.movies}
                                icon={'movie-open'}
                                onPress={() => { this.props.navigation.navigate('Movies') }}
                            />
                            <MenuButtons
                                style={styles.option}
                                title={strings.music}
                                icon={'music'}
                                onPress={() => { this.props.navigation.navigate('Musics') }}
                            />
                            <MenuButtons
                                style={[styles.option]}
                                title={strings.videos}
                                icon={'video'}
                                onPress={() => { this.props.navigation.navigate('Videos'); }}
                            />
                        </View>
                        {/* <View style={[styles.options, { justifyContent: 'center', flex: 1, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }]}>
                            <MenuButtons
                                style={styles.option}
                                title={strings.games}
                                icon={'controller-classic'}
                                onPress={() => {
                                    this.props.navigation.navigate('Movies');
                                }}
                            />
                            <MenuButtons
                                style={styles.option}
                                title={strings['book-play']}
                                icon={'book-play'}
                                onPress={() => {
                                    this.props.navigation.navigate('Musics');
                                }}
                            />
                        </View> */}
                    </View>
                    <View style={[styles.row, styles.borderRadius, { flex: 1 }]}>
                        <ImageBackground source={bg ? { uri: Urlbg } : require('../../../assets/bg.jpeg')} resizeMode='cover' style={{ flex: 1 }} />
                    </View>
                </View>
                <ImageBackground source={banner ? { uri: Urlbanner } : require('../../../assets/banner.jpg')} resizeMode={'cover'} style={[styles.conten, styles.borderRadius, { flex: 1.5, }]}></ImageBackground>
            </LinearGradient>
        )
    }

    fetchDataImagenes() {
        axios.get(Urlbg, { responseType: 'arraybuffer' })
            .then(response => {
                const contentType = response.headers['content-type'];
                if (contentType.includes('image/jpeg')) {
                    console.log('Es un archivo jpg');
                    this.setState({ bg: true, wifi: true });
                } else {
                    console.log('No es un archivo jpg');
                    // Aquí puedes manejar cualquier otro tipo de archivo
                }
            })
            .catch(error => {
                console.log('Error al obtener el archivo:', error);
            });
        axios.get(Urlbanner, { responseType: 'arraybuffer' })
            .then(response => {
                const contentType = response.headers['content-type'];
                if (contentType.includes('image/jpeg')) {
                    console.log('Es un archivo jpg');
                    this.setState({ banner: true, wifi: true });
                } else {
                    console.log('No es un archivo jpg');
                    // Aquí puedes manejar cualquier otro tipo de archivo
                }
            })
            .catch(error => {
                console.log('Error al obtener el archivo:', error);
            });
    }
}

function mapStateToProps(state) {
    return {
        settings: state.settingsReducer.settings,
        language: state.settingsReducer.language,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeLanguage: (language) => dispatch(changeLanguage(language)),
        getSettings: () => dispatch(getSettings())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HomePage));