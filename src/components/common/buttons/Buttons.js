import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { actionButtonStyles, menuButtonStyles, toolbarButtonStyles } from './ButtonStyle';



export const ToolbarButton = ({ title, icon = null, disabled = false, toggable = false, onPress, style }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={onPress}

            style={[
                { opacity: toggable ? disabled ? 0.9 : 0.3 : disabled ? 0.3 : 0.9 },
                toolbarButtonStyles.button, style
            ]}>
                {!icon ? null : <Icon
                    name={icon}
                    color={'#fff'}
                    size={25}
                    style={toolbarButtonStyles.icon}
                />}
                <Text style={toolbarButtonStyles.title}>{title}</Text>
            

        </TouchableOpacity >
    );
};

export const MenuButtons = ({ title, icon = null, disabled, onPress, style }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={onPress} style={[{ opacity: disabled ? 0.5 : 0.8 }, menuButtonStyles.button, style]}>

            <View style={{ flex: 3, alignItems: 'center' }}>
                {!icon ? null : <Icon
                    name={icon}
                    color={'#fff'}
                    size={responsiveFontSize(1.5)}
                    style={menuButtonStyles.icon}
                />}
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={menuButtonStyles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export const ActionButton = ({ icon, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={actionButtonStyles.button}>
            <Icon
                name={icon}
                color={'#fff'}
                size={responsiveFontSize(2)}
                style={actionButtonStyles.icon}
            />
        </TouchableOpacity>
    );
};

export const GenresButton = ({ title, icon = null, onPress, style }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}

            style={[{
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,  // To cover the full height of par // Border COlor
                borderRadius: 20,  // To give shadow effect inside the container
                // For centering the items
                elevation: 2
            },
                style
            ]}>

            {!icon ? null : <Icon
                name={icon}
                color={'#fff'}
                size={responsiveFontSize(2.5)}
            />}
            <Text style={toolbarButtonStyles.title}>{title}</Text>

        </TouchableOpacity >
    );
};

