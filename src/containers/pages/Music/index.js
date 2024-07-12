import { PureComponent } from 'react';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import { TopIndex } from '../../../components';

import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { styles } from './styles';

import axios from 'axios';
import { connect } from 'react-redux';
import { changeLanguage, getSettings } from '../../../actions/SettingsActions';

const Urlbg = 'http://ltimeadmin.com/uploads/data/video_img/bg.jpg';
const Urlbanner = 'http://ltimeadmin.com/uploads/data/video_img/banner.jpg';

class MusicPage extends PureComponent {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
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
        return (
            <LinearGradient style={styles.container} start={{ x: .5, y: .2 }} end={{ x: .5, y: 2.5 }} colors={['#112', "#999"]}>
                <TopIndex title={'Videos'} navigation={this.props.navigation} />
                <View style={[styles.glass, { flex: 7 }, styles.borderRadius, styles.conten, styles.center]}>
                    <View style={[styles.column, styles.borderRadius, styles.glass, { flex: 1.2, marginRight: responsiveFontSize(.5), }]}>

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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MusicPage));
