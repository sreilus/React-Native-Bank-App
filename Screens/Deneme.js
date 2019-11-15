import React, { Component } from 'react';
import {
    Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ImageBackground
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text, Input } from '../components';
import * as theme from '../constants/theme';
import { Header } from 'react-navigation-stack';

const { height } = Dimensions.get('window');

class Register extends Component {
    state = {
        active: null,
    }

    static navigationOptions = {
        title: 'Sign Up',
        header: null
    };

    handleType = id => {
        const { active } = this.state;
        this.setState({ active: active === id ? null : id });
    }

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
            <ImageBackground source={require('../assets/bgimage.jpg')} style= {styles.backgroundImage}>
            <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                <Block center middle style={{ marginBottom: 0, marginTop: 20 }}>
                    <Image
                        source={require('../assets/rgbank.png')}
                        style={{ height: 120, width: 300 }}
                    />
                </Block>
                <Block center>
                    <Text h3 style={{ marginBottom: 6 }}>
                        SIGN UP
                    </Text>
                   
                    <Block center style={{ marginTop: 25 }}>
                        <Input
                            full
                            label="Full name"
                            style={{ marginBottom: 25 }}
                        />
                        <Input
                            full
                            email
                            label="Email address"
                            style={{ marginBottom: 25 }}
                        />
                        <Input
                            full
                            password
                            label="Password"
                            style={{ marginBottom: 25 }}
                        />

                        <Button
                            full
                            style={{ marginBottom: 12 }}
                            onPress={() => navigation.navigate('Overview')}
                        >
                            <Text button>Sign Up</Text>
                        </Button>
                        <Text paragraph color="gray">
                            Already have an account? <Text
                                height={18}
                                color="blue"
                                onPress={() => navigation.navigate('Login')}>
                                Sign in
              </Text>
                        </Text>
                    </Block>
                </Block>
            </KeyboardAwareScrollView>
            </ImageBackground>
        )
    }
}

export default Register;

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