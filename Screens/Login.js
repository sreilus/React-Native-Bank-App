import React, { Component } from 'react';
import {
    Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ImageBackground
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text, Input } from '../components';
import * as theme from '../constants/theme';
import { Header } from 'react-navigation-stack';

const { height } = Dimensions.get('window');

class Login extends Component {
    state = {
        active: null,
        tcIdentityKey: 0,
        password: ''
    }

    static navigationOptions = {
        title: 'Sign Up',
        header: null
    };

    handleType = id => {
        const { active } = this.state;
        this.setState({ active: active === id ? null : id });
    }

    onPress = () => {

        fetch('https://rugratswebapi.azurewebsites.net/api/login', {
            method: 'POST',
            body: JSON.stringify({
                TcIdentityKey: this.state.tcIdentityKey,
                userPassword: this.state.password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                resultt: json
            });
            console.log(this.state.resultt);
            let deger = '' + this.state.resultt;
            const { navigate } = this.props.navigation;

            if (deger == "1") {
                navigate('Home', { tcNumber: this.state.tcIdentityKey });
                ToastAndroid.show("Giriş Başarılı!", ToastAndroid.SHORT);
            }
            else {
                alert("Kimlik No veya Şifre Hatalı!");
            }
        });
    };


    render() {
        const { navigation } = this.props;
        const { active } = this.state;

        const adminIcon = (
            <Image
                source={require('../assets/images/icons/energy.png')}
                style={{ height: 16, width: 14 }}
            />
        );

        const operatorIcon = (
            <Image
                source={require('../assets/images/icons/message.png')}
                style={{ height: 14, width: 14 }}
            />
        );

        const checkIcon = (
            <Image
                source={require('../assets/images/icons/check.png')}
                style={{ height: 18, width: 18 }}
            />
        );

        return (
            <ImageBackground source={require('../assets/bgimage.jpg')} style={styles.backgroundImage}>
                <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                    <Block center middle style={{ marginBottom: 20, marginTop: 20 }}>
                        <Image
                            source={require('../assets/rgbank.png')}
                            style={{ height: 120, width: 300 }}
                        />
                    </Block>
                    <Block center>
                        <Text h3 style={{ marginBottom: 6 }}>
                            SIGN IN
                    </Text>

                        <Block center style={{ marginTop: 25 }}>
                            <Input
                                full
                                label="Tc Identity Key"
                                number
                                maxLength={11}
                                style={{ marginBottom: 25 }}
                                onChangeText={(tcIdentityKey) => { this.setState({ tcIdentityKey: tcIdentityKey }) }}
                            />
                            <Input
                                full
                                password
                                label="Password"
                                maxLength={30}
                                style={{ marginBottom: 25 }}
                                onChangeText={(password) => { this.setState({ password: password }) }}
                            />

                            <Button
                                full
                                style={{ marginBottom: 12 }}
                                onPress={this.onPress}
                            >
                                <Text button>Sign In</Text>
                            </Button>
                            <Text paragraph color="gray">
                                Aren't you registered? <Text
                                    height={18}
                                    color="blue"
                                    onPress={() => navigation.navigate('Deneme')}>
                                    Sign Up
                            </Text>
                            </Text>
                        </Block>
                    </Block>
                </KeyboardAwareScrollView>
            </ImageBackground>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 5,
        backgroundColor: theme.colors.white,
    },
    backgroundImage: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
    },
    active: {
        borderColor: theme.colors.blue,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: theme.colors.lightblue,
        shadowRadius: 3,
        shadowOpacity: 1,
    },
    icon: {
        flex: 0,
        height: 48,
        width: 48,
        borderRadius: 48,
        marginBottom: 15,
        backgroundColor: theme.colors.lightblue
    },
    check: {
        position: 'absolute',
        right: -9,
        top: -9,
    }
})