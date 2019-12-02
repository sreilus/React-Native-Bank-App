import React, { Component } from 'react'
import {
    Text,
    View,
    Alert,
    Button,
    AsyncStorage,
    ToastAndroid
} from 'react-native'

onBackPress = () => {
    Alert.alert(
        'Confirm exit',
        'Do you want to exit App?',
        [
            { text: 'CANCEL', style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    const { navigate } = this.props.navigation;
                    navigate('Login');
                }
            }
        ]
    );

    return true;
}

export default class SignOut extends Component {

    onBackPress = () => {
        Alert.alert(
            'Çıkış Yap',
            'Çıkış Yapmak İstiyor Musunuz?',
            [
                { text: 'Hayır', style: 'cancel' },
                {
                    text: 'Evet', onPress: () => {
                        this._logOut();
                    }
                }
            ]
        );

        return true;
    }

    componentWillMount = () => {
        //this.onBackPress()
    };

    _logOut = async () => {
        await AsyncStorage.removeItem("isLoggedIn");
        ToastAndroid.show("Çıkış Yapıldı!",ToastAndroid.SHORT);
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Button title="Oturumu Kapat" onPress={this.onBackPress}></Button>
            </View>
        )
    }
}
