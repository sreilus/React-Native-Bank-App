import React, { Component } from 'react';
import {
    Image, StyleSheet, Dimensions, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, StatusBar, ToastAndroid, Text
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Input, Text as TextCmp } from '../components';
import { requiredText, tcText, phoneRegExp, onlyText, onlyTextError } from '../constants/strings';
import * as theme from '../constants/theme';
import DatePicker from 'react-native-datepicker'



const validationSchema = yup.object().shape({
    firstName: yup
        .string().matches(onlyText, onlyTextError)
        .label('firstName')
        .min(2, 'En az 2 karakter girmelisiniz!')
        .max(20, 'En fazla 20 karakter girebilirsiniz!')
        .required(requiredText),
    lastName: yup
        .string().matches(onlyText, onlyTextError)
        .label('lastNameName')
        .min(2, 'En az 2 karakter girmelisiniz!')
        .max(20, 'En fazla 20 karakter girebilirsiniz!')
        .required(requiredText),
    tcIdentityKey: yup
        .number()
        .label('tcIdentityKey')
        .moreThan(9999999999, tcText)
        .lessThan(100000000000, tcText)
        .required(requiredText),
    email: yup
        .string()
        .email("Lütfen geçerli bir email giriniz")
        .label('email')
        .required(requiredText),
    phone: yup
        .number()
        .label('phone')
        .moreThan(1000000000, phoneRegExp)
        .lessThan(999999999999, phoneRegExp)
        .required(requiredText),
    password: yup
        .string()
        .label('password')
        .min(1, 'En az 2 karakter girmelisiniz!')
        .max(20, 'En fazla 20 karakter girebilirsiniz!')
        .required(requiredText),
    birthday: yup
        .string()
        .label('birthday')
        .required(requiredText),
});

class Register extends Component {
    state = {
        active: null,
        birthday: '',
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

    onChangeTextTc = (Tc, formikProps) => {
        this.setState({
            tcIdentityKey: Tc
        });
    }

    onPress = (values) => {


        fetch('https://rugratswebapi.azurewebsites.net/api/register', {
            method: 'POST',
            body: JSON.stringify({
                TcIdentityKey: values.tcIdentityKey,
                userPassword: values.password,
                userName: values.tcIdentityKey,
                firstname: values.firstName,
                surname: values.lastName,
                dateOfBirth: values.birthday,
                phoneNumber: values.phone,
                eMail: values.email
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
            else if(deger == "2") {
                alert("Aynı emailde daha önce kayıt olmuş müşteri var!");
            }
            else if(deger == "3") {
                alert("Aynı TCno'da daha önce kayıt olmuş kullanıcı var!");
            }
            else if(deger == "4") {
                alert("18 yaşından küçükler kayıt olamaz!");
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
        let deger = '';
        return (

            <ImageBackground source={require('../assets/bgimage.jpg')} style={styles.backgroundImage}>
                <Formik initialValues={{ firstName: '', lastName: '', tcIdentityKey: 0, phone: 0, email: '', birthday: '', password: '' }}
                    onSubmit={(values, actions) => {
                        //alert(JSON.stringify(values.firstName));
                        this.onPress(values)
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
                                <TextCmp h3 style={{ marginBottom: 6 }}>
                                    KAYIT OL
                             </TextCmp>

                                <Block center style={{ marginTop: 25 }}>
                                    <Input
                                        full
                                        label="İsim"
                                        maxLength={20}
                                        autoCapitalize='sentences'
                                        style={{ marginBottom: 5 }}
                                        onChangeText={formikProps.handleChange("firstName")}
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.firstName}
                                    </Text>
                                    <Input
                                        full
                                        label="Soyisim"
                                        maxLength={20}
                                        autoCapitalize='sentences'
                                        style={{ marginBottom: 5 }}
                                        onChangeText={formikProps.handleChange("lastName")}
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.lastName}
                                    </Text>
                                    <Input
                                        full
                                        label="Tc Kimlik No"
                                        number
                                        maxLength={11}
                                        style={{ marginBottom: 5 }}
                                        onChangeText={formikProps.handleChange("tcIdentityKey")}
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.tcIdentityKey}
                                    </Text>
                                    <Input
                                        full
                                        email
                                        label="Email"
                                        maxLength={30}
                                        style={{ marginBottom: 5 }}
                                        onChangeText={formikProps.handleChange("email")}
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.email}
                                    </Text>
                                    <Input
                                        full
                                        phone
                                        label="Telefon"
                                        maxLength={10}
                                        style={{ marginBottom: 5 }}
                                        onChangeText={formikProps.handleChange("phone")}
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.phone}
                                    </Text>
                                    <Text style={{ marginBottom: 2 }}>
                                        Doğum Günü</Text>
                                    <DatePicker
                                        style={{ width: 200, marginLeft: 0, marginBottom: 5 }}
                                        date={formikProps.values.birthday}
                                        mode="date"
                                        placeholder="Tarih Seçiniz"
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
                                        onDateChange={formikProps.handleChange("birthday")}
                                    />
                                    <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.birthday}
                                    </Text>
                                    <Input
                                        full
                                        password
                                        label="Şifre"
                                        maxLength={30}
                                        style={{ marginBottom: 5 }}
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
                                        <TextCmp button >Kayıt Ol</TextCmp>
                                    </Button>
                                    <TextCmp paragraph color="gray">
                                        Zaten bir hesabın var mı? <TextCmp
                                            height={18}
                                            color="blue"
                                            onPress={() => navigation.navigate('Login')}>
                                            Giriş yap
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