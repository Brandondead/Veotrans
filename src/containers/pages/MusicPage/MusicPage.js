import { Component } from 'react';


import axios from 'axios';
import React from 'react';
import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import VerticalSlider from 'react-native-vertical-slider-smartlife'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { getSettings } from '../../../actions/SettingsActions';
import { TopIndex } from '../../../components';
import { strings } from '../../../utils/I18n';
import { styles } from './MusicPageStyle';
import ReproMusic from './ReproMusic';

const Urlbg = 'http://ltimeadmin.com/uploads/data/video_img/bg.jpg';
const Urlbanner = 'http://ltimeadmin.com/uploads/data/video_img/banner.jpg';
const API = `http://ltimeadmin.com/api/audio/getAudioList`;
const ApiBase = 'http://ltimeadmin.com/';


const minutesAndSeconds = (value, length) => (
    new Date(value * 1000).toISOString().substr(length > 3600 ? 11 : 14, length > 3600 ? 8 : 5)
);




class MusicPage extends Component {




    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            datos: [],
            totalLength: 1,
            track: 0,
            currentPosition: 0,
            selectedItem: null,
            currentIndex: 0,
            volume: .8,
            paused: true,
            settings: this.props.settings,
        }
    }
    fetchdata = async () => {
        const category = [
            { category: 'A' },
            { category: 'B' },
            { category: 'C' },
            { category: 'D' },
            { category: 'E' },
            { category: 'F' },
            { category: 'G' },
            // Agrega más URLs según sea necesario
        ];
        let updatedDataSource = [];
        try {
            const requests = category.map(item => axios.post(API, item, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            }));
            const responses = await Promise.all(requests);
            const results = responses.map(response => response.data.data);
            updatedDataSource = [].concat(...results);
            console.log("datos: " + updatedDataSource)
            this.setState({ datos: updatedDataSource })
        } catch (err) {
            console.log(err);
        }
    }


    componentWillMount() {
        this.props.getSettings()
    }

    componentDidMount() {
        this.setState({ paused: true })
        this.fetchdata()
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ settings: nextProps.settings });
    }

    getItemCount = () => this.state.datos.length;
    getItem = (data, index) => ({
        id: `${index}`,
        pathurl: data[index].pathurl,
        name: data[index].name,
    });

    Item = ({ title, index }) => {
        const { currentIndex, track } = this.state
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({ track: index })
                }
                }
                style={[
                    styles.item, styles.borderColor, index === "" + currentIndex && { backgroundColor: '#ffffff4f' },
                    index === "" + track && { backgroundColor: '#4fffff6f' }
                ]}
            >
                <Text style={[styles.title, { color: '#fff' }]}>{title}</Text>
            </TouchableOpacity>
        )
    }

    getItemLayout = (data, index) => {
        return {
            length: 50, // Altura de cada elemento de la lista
            offset: 50 * index, // Cálculo del desplazamiento para cada elemento de la lista
            index, // Índice del elemento en la lista
        };
    };
    setDuration(data) {
        this.setState({
            totalLength: Math.floor(data.duration)
        });
    }

    setTime(data) {
        this.setState({ currentPosition: Math.floor(data.currentTime) });
    }
    render() {
        const { theme } = this.state.settings
        const { totalLength, currentPosition, paused, datos, currentIndex, track, volume } = this.state;
        const elapsed = minutesAndSeconds(currentPosition, totalLength);
        const remaining = minutesAndSeconds(totalLength - currentPosition, totalLength);
        const virtualizedListRef = React.createRef();
        return (
            <LinearGradient style={[styles.container]} start={{ x: 0, y: .2 }} end={{ x: .1, y: 2.5 }} colors={['#112', theme]} >
                <View style={{ width: '100%', height: '15%' }}><TopIndex navigation={this.props.navigation} title={strings.music} /></View>
                <View style={[styles.gridItemUp, styles.gridItemUp_2]}>
                    <View style={[styles.gridItemUpLeft, { flex: 4, position: 'relative', padding: 0, flexDirection: 'column' }]}>
                        <View style={[styles.gridItemUpLeft, { flex: 4, position: 'relative', marginBottom: responsiveFontSize(.3) }]}>
                            <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 1.35, padding: 0, flexDirection: 'column' }]}>
                                <View style={[styles.grid_row, { flex: 2, backgroundColor: '#556', }]}>
                                    <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => {
                                        if (currentIndex > 0) {
                                            this.setState({ currentIndex: currentIndex - 1 })
                                            i = currentIndex - 1;
                                            virtualizedListRef.current.scrollToIndex({
                                                animated: true,
                                                index: i,
                                            });
                                            console.log("Seleccionado: " + currentIndex)
                                        }
                                    }}
                                        style={[
                                            { opacity: 0.9, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, width: '100%', height: '100%' },
                                        ]}>
                                        <Icon
                                            name={'menu-up'}
                                            color={'#fff'}
                                            size={responsiveFontSize(4)}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.grid_row, { flex: 3, backgroundColor: '#5f5', marginVertical: 5 }]}>
                                    <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { this.setState({ track: currentIndex }) }}
                                        style={[
                                            { opacity: 0.9, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, width: '100%', height: '100%' },
                                        ]}>
                                        <Icon
                                            name={'play'}
                                            color={'#fff'}
                                            size={responsiveFontSize(3)}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.grid_row, { flex: 2, backgroundColor: '#556', }]}>
                                    <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => {
                                        if (currentIndex < this.getItemCount() - 1) {
                                            this.setState({ currentIndex: currentIndex + 1 })
                                            i = currentIndex + 1;
                                            virtualizedListRef.current.scrollToIndex({
                                                index: i,
                                                animated: true,
                                            });
                                            console.log("Seleccionado: " + currentIndex)
                                        }
                                    }}
                                        style={[
                                            { opacity: 0.9, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, width: '100%', height: '100%' },
                                        ]}>
                                        <Icon
                                            name={'menu-down'}
                                            color={'#fff'}
                                            size={responsiveFontSize(4)}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.gridItemUpLeft, { flex: 7, marginRight: 0, flexDirection: 'row' }]}>
                                <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 7 }]}>
                                    <SafeAreaView style={{ with: '100%', height: '100%', flex: 1 }}>
                                        <VirtualizedList
                                            data={datos}
                                            ref={virtualizedListRef}
                                            renderItem={({ item }) => <this.Item title={item.name} index={item.id} />}
                                            keyExtractor={item => item.id}
                                            initialNumToRender={10}
                                            getItemCount={this.getItemCount}
                                            getItem={this.getItem}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </SafeAreaView>
                                </View>
                                <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 1, flexDirection: 'column', marginRight: 0, justifyContent: 'center', alignItems: 'center' }]}>
                                  
                                        <Icon name='volume-high' size={responsiveFontSize(2.5)} color={'#fff'} style={{ marginBottom: responsiveFontSize(1.5) }} />
                                        <VerticalSlider
                                            value={volume}
                                            disabled={false}
                                            min={0}
                                            max={1}
                                            onChange={(value) => {
                                                this.setState({ volume: value })
                                            }}
                                            width={30}
                                            height={200}
                                            step={.0002}
                                            borderRadius={5}
                                            minimumTrackTintColor={theme}
                                            maximumTrackTintColor={'#5556'}
                                        />
                                </View>
                            </View>
                        </View>
                        {datos.length > 0 &&
                            <ReproMusic track={(track != null && datos[track])} onChange={(index) => { this.setState({ track: index }) }} id={track} limit={datos.length} volum={volume} />
                        }
                    </View>
                    <ImageBackground
                        resizeMode={'cover'}
                        style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { backgroundColor: theme, flex: 3, position: 'relative', padding: 0, marginRight: 0 }]}
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

    //Metodos
    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    }
}

//Funciones


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

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);