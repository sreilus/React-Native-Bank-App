import React, { Component } from 'react';
import {
    Image, StyleSheet, AsyncStorage, ImageBackground,Text,ToastAndroid
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text as TextCmp, Input } from '../components';
import * as theme from '../constants/theme';
import { requiredText, tcText } from '../constants/strings';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    tcIdentityKey: yup
        .number()
        .label('tcIdentityKey')
        .moreThan(9999999999, tcText)
        .lessThan(100000000000, tcText)
        .required(requiredText),
    password: yup
        .string()
        .label('password')
        .min(1, 'En az 2 karakter girmelisiniz!')
        .max(20, 'En fazla 20 karakter girebilirsiniz!')
        .required(requiredText),
});


class Login extends React.Component {
    
    state = {
        active: null,
        tcIdentityKey: 0,
        password: ''
    }
    
    componentDidMount(){
        
    }

    static navigationOptions = {
        title: 'Sign Up',
        header: null
    };

    handleType = id => {
        const { active } = this.state;
        this.setState({ active: active === id ? null : id });
    }

    _login = async()=>{
        
        await AsyncStorage.setItem('isLoggedIn','1');
        this.props.navigation.navigate('List');
        ToastAndroid.show("Giriş Yapıldı!",ToastAndroid.SHORT);
    }

    onPress = async(values) => {
        console.log(values);
        await fetch('https://rugratswebapi.azurewebsites.net/api/login', {
            method: 'POST',
            body: JSON.stringify({
                TcIdentityKey: values.tcIdentityKey,
                userPassword: values.password
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
                AsyncStorage.setItem('isLoggedIn',values.tcIdentityKey);
                this.setTcNo(values.tcIdentityKey);
                navigate('List', { tcNumber: values.tcIdentityKey });
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
                <Formik initialValues={{ tcIdentityKey: 0, password: '' }}
                    onSubmit={(values, actions) => {
                        //alert(JSON.stringify(values.firstName));
                        this.onPress(values)
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 1000);
                        
                    }}              
                    validationSchema={validationSchema}>
                        {formikProps => (
                <KeyboardAwareScrollView style={{ marginVertical: 40 }} showsVerticalScrollIndicator={false}>
                    <Block center middle style={{ marginBottom: 20, marginTop: 20 }}>
                        <Image
                            source={require('../assets/rgbank.png')}
                            style={{ height: 120, width: 300 }}
                        />
                    </Block>
                    <Block center>
                        <TextCmp h3 style={{ marginBottom: 6 }}>
                            GİRİŞ YAP
                    </TextCmp>

                        <Block center style={{ marginTop: 25 }}>
                            <Input
                                full
                                label="Tc Kimlik No"
                                number
                                maxLength={11}
                                style={{ marginBottom: 5 }}
                                //defaultValue='11111111111' 
                                onChangeText={formikProps.handleChange("tcIdentityKey")}
                            />
                            <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.tcIdentityKey}
                                    </Text>
                            <Input
                                full
                                password
                                label="Şİfre"
                                maxLength={30}
                                style={{ marginBottom: 5 }}
                                //defaultValue='1' 
                                onChangeText={formikProps.handleChange("password")}
                            />
                            <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.password}
                                    </Text>
                            <Button
                                full
                                style={{ marginBottom: 12 }}
                                onPress={formikProps.handleSubmit}
                            >
                                <TextCmp button>Giriş Yap</TextCmp>
                            </Button>
                            <TextCmp paragraph color="gray">
                                Kayıtlı değil misin? <TextCmp
                                    height={18}
                                    color="blue"
                                    onPress={() => navigation.navigate('Register')}>
                                    Kayıt Ol
                            </TextCmp>
                            </TextCmp>
                        </Block>
                    </Block>
                </KeyboardAwareScrollView>
                        )}
                </Formik>
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