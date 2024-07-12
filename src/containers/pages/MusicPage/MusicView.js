import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import axios from 'axios';
import { ActivityIndicator, TouchableOpacity, VirtualizedList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Slider from 'react-native-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { SafeAreaView, withNavigation } from 'react-navigation';
import logo from '../../../assets/logo.png';
import image2 from '../../../assets/undraw_happy_music_g6wc.png';
import { strings } from '../../../utils/I18n';
import { styles } from './MusicPageStyle';

const urlBase = 'http://ltimeadmin.com';
const API = `http://ltimeadmin.com/api/audio/getAudioList`;

const minutesAndSeconds = (value, length) => (
    new Date(value * 1000).toISOString().substr(length > 3600 ? 11 : 14, length > 3600 ? 8 : 5)
);

const MusicView = ({ navigation, theme }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState('');
    const [totalLength, setTotalLength] = useState(1);
    const [currentPosition, setCurrentPosition] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [track, setTrack] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);

    const fetchdata = async () => {
        
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
        for (let i = 0; i < category.length; i++) {
            await axios.post(API, category[i], {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                updatedDataSource = [...updatedDataSource, ...response.data.data];
                console.log("fetch "+ updatedDataSource);
                setDataSource(updatedDataSource);
            }).catch((err) => console.log(err));
        }

    }
    useEffect(() => {
        fetchdata();
    }, []);


    const virtualizedListRef = React.createRef();


    const SelectTrack = (index) => {
        if (index => 0 && index <= dataSource.length - 1) {
            setTrack(index);
            setPlaying(true);
        }
    }

    const scrollUp = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            virtualizedListRef.current.scrollToIndex({
                animated: true,
                index: currentIndex - 1,
            });
            console.log("Seleccionado: " + currentIndex)
        }
    };

    const scrollDown = () => {
        if (currentIndex < getItemCount() - 1) {
            setCurrentIndex(currentIndex + 1);
            virtualizedListRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
            });
            console.log("Seleccionado: " + currentIndex)
        }
    };
    const playAudio = async (index) => {
        setPlaying(false)
        setCurrentPosition(0);
        setPlaying(true);
    };


    const getItem = (data, index) => ({
        id: `${index}`,
        pathurl: data[index].pathurl,
        name: data[index].name,
    });

    const getItemCount = () => dataSource.length;
    const setDuration = data => {
        setTotalLength(Math.floor(data.duration));
    };

    const setTime = data => {
        setCurrentPosition(Math.floor(data.currentTime));
    };

    const Item = ({ title, index }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    SelectTrack(Number(index));
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


    const onSlidingStart = () => {
        setPlaying(false);
    };

    const onSlidingComplete = value => {
        setCurrentPosition(value);
        this.player.seek(value)
        setPlaying(true);
    };

    const loadingcomponent = () => {
        return (
            <View style={[styles.gridItemUp, styles.gridItemUp_2, { justifyContent: 'center', alignContent: 'center' }]}>

                <ActivityIndicator size={'large'} color={'#fff'} />
                <Text style={{ width: '100%', textAlign: 'center', color: '#fff', marginTop: 10, fontSize: responsiveFontSize(2) }}>{error}</Text>

            </View>
        )
    }

    const principalComponent = () => {
        console.log("DataSource: " + dataSource);
        return (
            <View style={[styles.gridItemUp, styles.gridItemUp_2]}>
                <View style={[styles.gridItemUpLeft, { flex: 4, position: 'relative', padding: 0 }]}>
                    <View style={[styles.grid_row, { height: '60%' }]}>
                        <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 1, padding: 0 }]}>
                            <View style={[styles.grid_row, { height: '31%', backgroundColor: '#556', }]}>
                                <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { scrollUp() }}
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
                            <View style={[styles.grid_row, { height: '35%', backgroundColor: '#5f5', marginVertical: 5 }]}>
                                <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => {
                                    if (track != currentIndex) {
                                        setCurrentPosition(0)
                                        SelectTrack(currentIndex);
                                        setPlaying(true);
                                    } else {
                                        setPlaying(!playing);
                                    }

                                }}
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
                            <View style={[styles.grid_row, { height: '33%', backgroundColor: '#556', }]}>
                                <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { scrollDown() }}
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
                        <View style={[styles.gridItemUpLeft, { flex: 6, marginRight: 0 }]}>
                            <View style={[styles.grid_row, styles.borderColor, styles.shadowEffect, { height: '20%' }]}>
                            </View>
                            <SafeAreaView style={[styles.grid_row, styles.borderColor, styles.shadowEffect, { height: '80%', marginTop: 5, flex: 1 }]}>
                                <VirtualizedList
                                    ref={virtualizedListRef}
                                    data={dataSource}
                                    renderItem={({ item }) => <Item title={item.name} index={item.id} />}
                                    keyExtractor={item => item.id}
                                    initialNumToRender={4}
                                    getItemCount={getItemCount}
                                    getItem={getItem}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </SafeAreaView>
                        </View>
                    </View>
                    <View style={[styles.grid_row, styles.borderColor, styles.shadowEffect, { height: '40%', marginTop: 20, padding: 5 }]}>
                        {/*Controlles de Musica*/}
                        <View style={[styles.grid_row, { height: '22%', marginBottom: 5, paddingHorizontal: 10 }]}>
                            <Text style={styles.progressLabelTitle}>{ }</Text>
                        </View>
                        <View style={[styles.grid_row, { height: '30%', marginBottom: 5 }]}>
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
                        <View style={[styles.grid_row, { height: '40%' }]}>
                            <View style={[styles.progressLevelDuration, {}]}>
                                <Text style={styles.progressLabelText}>{elapsed}</Text>
                                <View style={[styles.progressLavelController]}>
                                    <View style={[styles.progressLavelControllerContainer]} >
                                        <View style={[{ flex: 1, }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    var i = track - 1;
                                                    console.log("prev: " + i)
                                                    if (i != -1) {
                                                        SelectTrack(i);
                                                    }
                                                }}
                                                style={styles.buttonController}
                                            >
                                                <Icon
                                                    name={'skip-previous'}
                                                    color={'#fff'}
                                                    size={responsiveFontSize(2)}
                                                    style={styles.icon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[{ flex: 1 }]}>
                                            <TouchableOpacity
                                                style={styles.buttonController}
                                                onPress={() => { setPlaying(!playing) }}>
                                                <Icon style={styles.icon} color={'#fff'} name={playing ? 'pause' : 'play'} size={responsiveFontSize(3.5)} />
                                            </TouchableOpacity>

                                        </View>
                                        <View style={[{ flex: 1 }]}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    var i = (track) + 1;
                                                    if (i < dataSource.length) {
                                                        SelectTrack(i)
                                                    }
                                                }}
                                                style={styles.buttonController}
                                            >
                                                <Icon
                                                    name={'skip-next'}
                                                    color={'#fff'}
                                                    size={responsiveFontSize(2)}
                                                    style={styles.icon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.progressLabelText}>{remaining}</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={[styles.gridItemUpLeft, { flex: 2, position: 'relative', padding: 0, marginRight: 0 }]}>
                    <View style={[styles.grid_row, styles.borderColor, styles.shadowEffect, { height: '40%' }]}>
                        <View style={[styles.grid_row, { height: '70%', width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }]}>
                            <Icon
                                name={'music'}
                                color={'#fff'}
                                size={responsiveFontSize(5)}
                                style={styles.icon}
                            />
                        </View>
                        <View style={[styles.grid_row, { height: '30%', }]}>
                            <View style={[styles.containerVlumController]}>
                                <TouchableOpacity style={styles.mute} activeOpacity={0.8} onPress={() => { if (volume > 0) { setVolume(volume - 0.1) } }}>
                                    <Icon style={{ color: "#fff" }} name={'volume-minus'} size={responsiveFontSize(2)} />
                                </TouchableOpacity>
                                <Slider
                                    maximumValue={1}
                                    step={0.1}
                                    value={volume}
                                    style={styles.slider}
                                    onSlidingStart={(value) => { setVolume(value) }}
                                    onSlidingComplete={(value) => { setVolume(value) }}
                                    minimumValue={0}
                                    minimumTrackTintColor='#fff'
                                    maximumTrackTintColor='rgba(255, 255, 255, 0.14)'
                                    thumbStyle={styles.thumbVolumen}
                                    trackStyle={styles.trackVolumen}
                                />
                                <TouchableOpacity style={styles.mute} activeOpacity={0.8} onPress={() => { if (volume != 1) { setVolume(volume + 0.1) } }}>
                                    <Icon style={{ color: "#fff" }} name={'volume-plus'} size={responsiveFontSize(2)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.grid_row, styles.borderColor, styles.shadowEffect, { height: '60%', marginTop: 20 }]}>
                        <Image
                            style={{ resizeMode: 'cover', height: '100%', width: '100%', flex: 2, justifyContent: 'center', alignItems: 'center' }}
                            source={image2}
                        />
                    </View>
                </View>
                {track != null &&
                    <Video
                        source={{ uri: `${Reprodu}${dataSource[track].genero}/${dataSource[track].repro}` }}
                        style={{ display: 'none' }}
                        muted={false}
                        repeat={false}
                        onLoadStart={this.loadStart}
                        onLoad={setDuration}
                        onProgress={setTime}
                        paused={!playing}
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


    const elapsed = minutesAndSeconds(currentPosition, totalLength);
    const remaining = minutesAndSeconds(totalLength - currentPosition, totalLength);
    return (

        <LinearGradient style={[styles.container]} start={{ x: 0, y: .2 }} end={{ x: .1, y: 2.5 }} colors={['#112', theme]} >
            <View style={styles.gridItemUp}>
                <View style={[styles.gridItemUpLeft, styles.borderColor, styles.shadowEffect, { flex: 3 }]}>
                    <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { navigation.goBack() }}
                        style={[
                            { opacity: 0.9, justifyContent: 'center', alignContent: 'center', alignSelf: 'center', flex: 1, width: '100%', height: '100%' },
                        ]}>
                        <Icon
                            name={'chevron-left'}
                            color={'#fff'}
                            size={responsiveFontSize(2)}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.gridItemUpRight, styles.borderColor, styles.shadowEffect, styles.toolbar, { flex: 30, padding: 5 }]}>
                    <Text style={{ flex: 2, textAlign: 'center', fontSize: responsiveFontSize(2), fontFamily: 'sans-serif', fontWeight: 'bold', color: '#fff' }}>
                        {strings.music}
                    </Text>
                    <Image
                        style={{ resizeMode: 'contain', height: '100%', flex: 2, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}
                        source={logo}
                    />
                </View>
            </View>
            {principalComponent()}
        </LinearGradient >
    )
}

function pad(n, width, z = 0) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default (withNavigation(MusicView));