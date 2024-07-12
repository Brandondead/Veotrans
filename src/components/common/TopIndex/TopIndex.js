import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import logo from '../../../assets/logo.png';
import { styles } from "./TopIndexStyles";



export const TopIndex = ({ title, navigation }) => {
    return (
        <View style={[styles.container]}>
            <View style={[styles.glass, styles.borderRadius, styles.center, { flex: 3 }]}>
                <TouchableOpacity activeOpacity={0.5} disabled={false} onPress={() => { navigation.goBack() }}
                    style={[{ flex: 1 }, styles.center]}>
                    <Icon
                        name={'chevron-left'}
                        color={'#fff'}
                        size={responsiveFontSize(2)}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.glass, styles.borderRadius, styles.glass, styles.conten, { flex: 30, flexDirection: 'row', padding: 5, justifyContent: 'space-between' }]}>
                <Text style={[styles.center, { flex: 1 },]}>
                    {title}
                </Text>
                <Image
                    style={[styles.center, { flex: 1 }]}
                    resizeMode="center"
                    source={logo}
                />
            </View>
        </View>
    );
};


