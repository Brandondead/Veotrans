
import { Component } from 'react';
import { Image, ImageBackground, TouchableOpacity, View, NativeModules} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from "react-navigation";

import {OffScreen} from NativeModules;
import { connect } from 'react-redux';
import { changeLanguage, getSettings } from '../../../actions/SettingsActions';
import logo from '../../../assets/logo.png';
import { MenuButtons, ToolbarButton } from "../../../components/index";
import { strings } from '../../../utils/I18n';
import { styles } from './HomaPageStyle';

// TODO improve banner and bg defaults design

const Urlbg = 'http://ltimeadmin.com/uploads/data/video_img/bg.jpg';
const Urlbanner = 'http://ltimeadmin.com/uploads/data/video_img/banner.jpg';


class HomePage extends Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        wifi: true,
        settings: this.props.settings,
        bg: false,
        banner: true,
    };

    componentWillMount() {
        this.props.getSettings();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ settings: nextProps.settings });
    }

    componentDidMount() {
        const { navigation } = this.props;
    }

    componentWillUnmount() {

    }


    render() {
        const { language, bg, banner } = this.props;
        strings.setLanguage(language);
        const { theme } = this.state.settings;
        return (
            <LinearGradient style={styles.container} start={{ x: .5, y: .2 }} end={{ x: .5, y: 2.5 }} colors={['#112', theme]}>
                <View style={styles.gridItemUp}>
                    <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 35 }]}>
                        <View style={{ flex: 2, padding: 5 }}>
                            <Image
                                style={{ resizeMode: 'contain', height: '100%', flex: 2, justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}
                                source={logo}
                            />
                        </View>
                        <View style={[styles.toolbar, { paddingRight: 10, flex: 2, alignSelf: 'center', alignContent: 'center', alignItems: 'center' }]}>
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
                            <Icon name={this.state.wifi ? 'signal-wifi-4-bar' : 'signal-wifi-off'} color={'#fff'} size={responsiveFontSize(1.5)} style={{ marginLeft: 50, marginRight: 15 }} />
                        </View>
                    </View>
                    <View style={[styles.gridItemUpRight, styles.borderColor, styles.shadowEffect, styles.toolbar]}>
                        <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { this.props.navigation.navigate('Settings'); }}
                            style={[
                                { opacity: 0.9, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, width: '100%', height: '100%' },
                            ]}>
                            <Icon
                                name={'settings'}
                                color={'#fff'}
                                size={responsiveFontSize(1.5)}
                                style={styles.icon}
                            />

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.gridItemUp, styles.gridItemUp_2]}>
                    <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { alignContent: 'center', alignItems: 'center', }]}>
                        <View style={[styles.options, { justifyContent: 'center', flex: 1, alignSelf: 'center' }]}>
                            <MenuButtons
                                style={styles.option}
                                title={strings.movies}
                                icon={'video-vintage'}
                                onPress={() => {
                                    this.props.navigation.navigate('Movies');
                                }}
                            />
                            <MenuButtons
                                style={styles.option}
                                title={strings.music}
                                icon={'music'}
                                onPress={() => {
                                    this.props.navigation.navigate('Musics');
                                }}
                            />
                            <MenuButtons
                                style={[styles.option]}
                                title={strings.about}
                                icon={'video'}
                                onPress={() => { this.props.navigation.navigate('Videos') }}
                            />
                        </View>

                    </View>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={[styles.gridItemUpRight_2, styles.borderColor, styles.shadowEffect, { backgroundColor: theme }]}
                        source={{ uri: Urlbg }}
                    />
                </View>
                <ImageBackground
                    resizeMode='cover'
                    style={[styles.gridItemUp, styles.borderColor, styles.gridItemUp_3, styles.shadowEffect, { backgroundColor: theme }]}
                    source={{ uri: Urlbanner }}
                />
            </LinearGradient>
        )
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