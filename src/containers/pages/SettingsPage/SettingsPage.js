
import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import OpenSettings from 'react-native-open-settings';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { getSettings, saveSettings } from '../../../actions/SettingsActions';
import { configStyles, styles } from './SettingsPageStyle';
// TODO improve banner and bg defaults design

class SettingsPage extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        locked: true,
        code: '',
        digitado: 0,
        
        value: 0,
        settings: this.props.settings
    };

    pinInput = React.createRef();

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

    VALID_CODE = "2854";

    button = (Number, value) => {
        const { digitado, code } = (this.state)
        return (
            <View style={[styles.containerPinDop]}>
                <TouchableOpacity
                    onPress={() => {
                        if (value === "check") {
                            if (code === this.VALID_CODE) {
                                this.setState({ value: 1 });
                                setTimeout(() => {
                                    this.setState({ locked: false });
                                }, 1000);
                            } else {
                                this.setState({ value: 2 });
                                setTimeout(() => {
                                    this.setState({ value: 0, code: '', digitado: 0, value: 0 });
                                }, 1000);
                            }
                        } else if (value === "" && digitado >= 0) {
                            this.setState({
                                digitado: digitado - 1,
                                code: code.substring(0, code.length - 1),
                            });
                        } else if (digitado < 4) {
                            this.setState({ digitado: digitado + 1, code: code + "" + value });
                        }
                    }}
                    style={styles.button}>
                    <Icon name={Number} size={responsiveFontSize(3)} color={"#9CCAFF"} />
                </TouchableOpacity>
            </View>
        )
    }

    buttonStyle = (color) => {
        const {theme} = this.state.settings;
        return (
            <TouchableOpacity
                disabled={theme === color}
                onPress={() => { this.setState({ settings: { ...this.state.settings, theme: color } }); }}
                style={[{ flex: 1, height: responsiveFontSize(2), width: responsiveFontSize(2), backgroundColor: color, margin: responsiveFontSize(0.5), borderRadius: responsiveFontSize(.5)}, theme === color && {opacity: 0.5}]}
            />
        )
    }


    lockScreen = () => {
        const { code, digitado, value } = this.state;
        const { configured } = this.props;

        return (
            <View style={{ flex: 1, paddingTop: 10,}}>
                <View style={{ flex: 3, flexDirection: 'row', paddingHorizontal: responsiveFontSize(15) }}>
                    <View style={styles.containerPinDop}><View style={[styles.pinDop, digitado > 0 && { backgroundColor: '#fff' }, value === 1 && { backgroundColor: '#0f0' }, value === 2 && { backgroundColor: '#f00' }]}><Text></Text></View></View>
                    <View style={styles.containerPinDop}><View style={[styles.pinDop, digitado > 1 && { backgroundColor: '#fff' }, value === 1 && { backgroundColor: '#0f0' }, value === 2 && { backgroundColor: '#f00' }]}></View></View>
                    <View style={styles.containerPinDop}><View style={[styles.pinDop, digitado > 2 && { backgroundColor: '#fff' }, value === 1 && { backgroundColor: '#0f0' }, value === 2 && { backgroundColor: '#f00' }]}></View></View>
                    <View style={styles.containerPinDop}><View style={[styles.pinDop, digitado > 3 && { backgroundColor: '#fff' }, value === 1 && { backgroundColor: '#0f0' }, value === 2 && { backgroundColor: '#f00' }]}></View></View>
                </View>
                <View style={{ flex: 6, justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
                    <View style={{ width: '40%', height: '100%', borderRadius: responsiveHeight(4), borderWidth: 1.5, borderColor: '#ffffff31', backgroundColor: '#99999928', elevation: 2,  marginTop: responsiveFontSize(-2) }}>
                        <View style={[styles.containerPinDop, { flexDirection: 'row' }]}>
                            {this.button('numeric-1', 1)}
                            {this.button('numeric-2', 2)}
                            {this.button('numeric-3', 3)}
                        </View>
                        <View style={[styles.containerPinDop, { flexDirection: 'row' }]}>
                            {this.button('numeric-4', 4)}
                            {this.button('numeric-5', 5)}
                            {this.button('numeric-6', 6)}
                        </View>
                        <View style={[styles.containerPinDop, { flexDirection: 'row' }]}>
                            {this.button('numeric-7', 7)}
                            {this.button('numeric-8', 8)}
                            {this.button('numeric-9', 9)}
                        </View>
                        <View style={[styles.containerPinDop, { flexDirection: 'row' }]}>
                            {this.button('check', "check")}
                            {this.button('numeric-0', 0)}
                            {this.button('keyboard-backspace', "")}
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    configScreen = () => {
        const {plates, bus, seat} = this.state.settings;
        const allSet = plates !== '' && bus !== '' && seat !== '';
        const { configured } = this.props;
        return (
            <View style={configStyles.mainContainer}>
                <View style={configStyles.inputContainer}>
                    <Icon style={configStyles.inputIcon} name={'numeric'} size={38} />
                    <Text style={configStyles.inputLabel}>Número de Placa</Text>

                    <TextInput
                        style={configStyles.input}
                        value={plates}
                        placeholder={'UBQ284'}
                        placeholderTextColor={'#999999'}
                        onChangeText={(text) => {
                            this.setState({settings: {...this.state.settings, plates: text}});
                        }}
                    />
                </View>
                <View style={configStyles.inputContainer}>
                    <Icon style={configStyles.inputIcon} name={'bus'} size={30} />
                    <Text style={configStyles.inputLabel}>Número de Bús</Text>

                    <TextInput
                        style={configStyles.input}
                        value={bus}
                        placeholder={'T345'}
                        placeholderTextColor={'#999999'}
                        onChangeText={(text) => {
                            this.setState({settings: {...this.state.settings, bus: text}});
                        }}
                    />
                </View>
                <View style={configStyles.inputContainer}>
                    <Icon style={configStyles.inputIcon} name={'sofa'} size={30} />
                    <Text style={configStyles.inputLabel}>Número de Asiento</Text>

                    <TextInput
                        style={configStyles.input}
                        value={seat}
                        placeholder={'T345'}
                        placeholderTextColor={'#999999'}
                        onChangeText={(text) => {
                            this.setState({settings: {...this.state.settings, seat: text}});
                        }}
                    />
                </View>
                <View style={configStyles.inputContainer}>
                    <Icon style={configStyles.inputIcon} name={'format-color-fill'} size={30} />
                    <Text style={configStyles.inputLabel}>Selecciona un Tema</Text>

                    <View
                        style={[configStyles.input, { backgroundColor: '#00000000' }]}>
                        <View style={{ width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            {this.buttonStyle('#D44300')}
                            {this.buttonStyle("#18CC00")}
                            {this.buttonStyle("#0066FF")}
                            {this.buttonStyle("#707062")}
                        </View>
                    </View>
                </View>


                <View style={{ position: 'absolute', width: '100%', height: '10%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: '#ffffff', fontSize: 24 }}>
                        <Icon style={{ color: "#fff", paddingTop: 10 }} name={'wifi'} size={30} />
                        <Text>&nbsp; SSID:{plates?plates:'???'}</Text>
                    </Text>
                </View>

                <TouchableOpacity
                    style={{ borderRadius: responsiveFontSize(3), width: responsiveFontSize(3), height: responsiveFontSize(3), backgroundColor: "#444", padding: responsiveFontSize(.3), position: 'absolute', bottom: responsiveFontSize(.5), left: responsiveFontSize(.5), alignItems: 'center' }}
                    onPress={() => {
                        OpenSettings.openSettings()
                    }}
                >
                    <Icon name='cogs' size={responsiveFontSize(2)} style={{ color: '#fff' }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ borderRadius: 10, backgroundColor: "#2A004A", padding: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    disabled={!allSet}
                    onPress={() => {
                        this.props.saveSettings(this.state.settings);
                    }}
                >
                    <Text style={{ fontSize: responsiveFontSize(1.5), color: "#9CCAFF", fontWeight: '600', textAlign: 'center' }}>GUARDAR CAMBIOS</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        const {theme} = this.props.settings;

        return (
            <LinearGradient style={styles.container} start={{ x: .5, y: 0 }} end={{ x: .5, y: 2.5 }} colors={['#112', theme]}>
                <View style={{ position: 'absolute', width: responsiveFontSize(4), height: responsiveFontSize(4), top: responsiveFontSize(1), left: responsiveFontSize(1), justifyContent: 'center', alignItems: 'center', borderRadius: responsiveFontSize(4), overflow: 'hidden' }}>
                    <TouchableOpacity style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Home'); }}
                    >
                        <Icon
                            name="close"
                            size={responsiveFontSize(3)}
                            color="#fff" />

                    </TouchableOpacity>
                </View>
                {this.state.locked ? this.lockScreen() : this.configScreen()}
            </LinearGradient>
        )
    }
}
function mapStateToProps (state) {
    const settings = state.settingsReducer.settings;
    return {
        configured: settings.plates !=='' && settings.bus !== '' && settings.seat !== '',
        settings: settings
    }
}

  const mapDispatchToProps = (dispatch) => ({
    getSettings: () => dispatch(getSettings()),
    saveSettings: (settings) => dispatch(saveSettings(settings))
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SettingsPage));