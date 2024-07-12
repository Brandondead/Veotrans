import { Component } from 'react';
import { createAppContainer, createStackNavigator, withNavigation } from 'react-navigation';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import {
    HomePage,
    MoviePage,
    MusicPage,
    SettingsPage,
    VideoPage,
    WelcomePage
} from './containers/';

import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SyncStorage from 'sync-storage';

class Switcher extends Component {
    static navigationOptions = {
        header: null,
    };

    async componentDidMount(){
        StatusBar.setHidden(true)
        SyncStorage.init().then(()=>{
            const settings = SyncStorage.get('settings');
            setTimeout(SplashScreen.hide, 2000);
            if(settings){
                this.props.navigation.navigate('Welcome')
            } else {
                this.props.navigation.navigate('Settings')
            }
        });
        hideNavigationBar();
    }

    render() {
        return null;
    }
}


const x = withNavigation(Switcher);

const AppNavigator = createAppContainer(createStackNavigator({
    Switcher: { screen: Switcher },
    Home: { screen: HomePage },
    Musics: { screen: MusicPage },
    Movies: { screen: MoviePage },
    Settings: { screen: SettingsPage },
    Videos: { screen: VideoPage},
    Welcome: {screen: WelcomePage},
}, {
    initialRouteName: 'Switcher',
}));

export default AppNavigator;

