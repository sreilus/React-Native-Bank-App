import React, { Component } from 'react';
import {
    Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, StatusBar, ToastAndroid
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Text, Input } from '../components';
import * as theme from '../constants/theme';
import DatePicker from 'react-native-datepicker'



const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .label('Name')
        .min(2, 'En az 2 karakter')
        .max(5, 'max 5 karakter'),
});

class Register extends Component {
    state = {
        active: null,
        birthday: "1998-03-26",
        firstName: '',
        surname: '',
        tcIdentityKey: 0,
        email: '',
        phone: 0,
        password: ''
    }

    static navigationOptions = {
        title: 'Sign Up',
        header: null
    };

    componentDidMount = () => {
        StatusBar.setHidden(true);
    }

    onChangeTextTc=(Tc,formikProps)=>{
        this.setState({
            tcIdentityKey: Tc
        });
        formikProps.handleChange("name");
    }

    onPress = () => {

        fetch('https://rugratswebapi.azurewebsites.net/api/register', {
            method: 'POST',
            body: JSON.stringify({
                TcIdentityKey: this.state.tcIdentityKey,
                userPassword: this.state.password,
                userName: this.state.tcIdentityKey,
                firstname: this.state.firstName,
                surname: this.state.surname,
                dateOfBirth: this.state.birthday,
                phoneNumber: this.state.phone,
                eMail: this.state.email
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
                ToastAndroid.show("Kayıt Başarılı!", ToastAndroid.SHORT);
                navigate('Login');
            }
            else {
                alert(deger);
            }
        });
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

            <ImageBackground source={require('../assets/bgimage.jpg')} style={styles.backgroundImage}>
                <Formik initialValues={{ name: '' }}
                    onSubmit={(values, actions) => {
                        alert(JSON.stringify(values));
                        setTimeout(() => {
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    validationSchema={validationSchema}>
                        {formikProps => (
                <KeyboardAwareScrollView style={{ marginVertical: 40 }} behavior="padding" enabled>
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
                                label="First Name"
                                maxLength={20}
                                autoCapitalize='sentences'
                                style={{ marginBottom: 25 }}
                                onChangeText={(firstName) => { this.setState({ firstName: firstName }) }}
                            />
                            <Input
                                full
                                label="Last Name"
                                maxLength={20}
                                autoCapitalize='sentences'
                                style={{ marginBottom: 25 }}
                                onChangeText={(surname) => { this.setState({ surname: surname }) }}
                            />
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
                                email
                                label="Email address"
                                maxLength={30}
                                style={{ marginBottom: 25 }}
                                onChangeText={(email) => { this.setState({ email: email }) }}
                            />
                            <Input
                                full
                                phone
                                label="Phone"
                                maxLength={16}
                                style={{ marginBottom: 25 }}
                                onChangeText={(phone) => { this.setState({ phone: phone }) }}
                            />
                            <Text style={{ marginBottom: 10 }}>
                                Birthday</Text>
                            <DatePicker
                                style={{ width: 200, marginLeft: 0, marginBottom: 20 }}
                                date={this.state.birthday}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1916-05-01"
                                maxDate="2001-11-15"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ birthday: date }) }}
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
                        )}
                </Formik>
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