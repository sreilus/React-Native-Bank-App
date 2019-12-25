import React, { Component } from 'react';
import {
    Image, StyleSheet, Picker, KeyboardAvoidingView, StatusBar, ToastAndroid, Text, Alert
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Input, Text as TextCmp } from '../components';
import { requiredText, tcText, phoneRegExp, onlyText, onlyTextError } from '../constants/strings';
import * as theme from '../constants/theme';




const validationSchema = yup.object().shape({
    age: yup
        .number()
        .label('Age')
        .moreThan(18, "18 yaşından küçüklere kredi verilemez!")
        .lessThan(121, "120 yaşından büyüklere kredi verilemez!")
        .required(requiredText),
    creditAmount: yup
        .number()
        .label('Credit Amount')
        .moreThan(0.09, "0.1 den büyük olmalı!")
        .lessThan(1000000, "1 Milyon ₺'deb fazla kredi çekebilirsiniz!")
        .required(requiredText),
    numberOfCredits: yup
        .number()
        .label('Number of Credits')
        .moreThan(0.09, "0.1 den büyük olmalı!")
        .lessThan(100, "En fazla 100 değeri girebilirsiniz!")
        .required(requiredText),
});

export default class CreditTransactions extends Component {

    constructor() {
        super();
        this.state = {
            result: 5,
            isLoading: false,
            homeState:0,
            telephone:0
        }
    }



    getCredit = async (values) => {
        let url = 'https://rugratswebapi.azurewebsites.net/api/hgs/getcredit';
        console.log('url: ' + url)
        this.setState({
            isLoading: true
        })
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                krediMiktari: values.creditAmount,
                yas: values.age,
                evDurumu: this.state.homeState,
                aldigi_kredi_sayi: values.numberOfCredits,
                telefonDurumu: this.state.telephone
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(json => {
            this.setState({
                result: json
            });
            console.log(this.state.result);

        }).finally(() => {
            this.setState({
                isLoading: false
            });
            let deger = '' + this.state.result;
            if (deger == "1") {
                Alert.alert("Maalesef Kredi Verilemez!");
            }
            else if (deger == "0") {
                Alert.alert("Kredi Verileblir!");
            }
            else {
                alert("Kimlik No veya Şifre Hatalı!");
            }
            // console.log("finally " + this.state.accounts[0].accountNo)
        })
            .catch((error) => {
                console.error(error);
            });;

    }

    render() {
        return (
            <Formik initialValues={{ age: '', creditAmount: '',numberOfCredits:0 }}
                onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values.firstName));
                    this.getCredit(values);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 1000);

                }}

                validationSchema={validationSchema}>
                {formikProps => (
                    <KeyboardAwareScrollView style={{ marginVertical: 40 }} behavior="padding" enabled>
                        <Block center>
                            <Block center style={{ marginTop: 25 }}>
                                <Input
                                    full
                                    number
                                    label="Yaş"
                                    maxLength={3}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                    onChangeText={formikProps.handleChange("age")}
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.age}
                                </Text>
                                <Input
                                    full
                                    number
                                    label="Kredi Miktarı"
                                    onChangeText={formikProps.handleChange("creditAmount")}
                                    maxLength={10}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.creditAmount}
                                </Text>
                                <Input
                                    full
                                    number
                                    label="Daha Önce Aldığınız Kredi sayısı"
                                    onChangeText={formikProps.handleChange("numberOfCredits")}
                                    maxLength={10}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.numberOfCredits}
                                </Text>
                                <TextCmp style={{  marginBottom: 2 }}>
                                    Ev Durumu
                                </TextCmp>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ homeState: itemValue })
                                    }>
                                    <Picker.Item label="Ev Sahibi" value="1" />
                                    <Picker.Item label="Kiracı" value="0" />
                                </Picker>
                                <TextCmp style={{  marginBottom: 2 }}>
                                    Telefon Durumu
                                </TextCmp>
                                <Picker
                                    selectedValue={this.state.language}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ telephone: itemValue })
                                    }>
                                    <Picker.Item label="Var" value="1" />
                                    <Picker.Item label="Yok" value="0" />
                                </Picker>
                                <Button
                                    full
                                    style={{ marginBottom: 12 }}
                                    onPress={formikProps.handleSubmit}
                                >
                                    <TextCmp button >Kredi Hesapla</TextCmp>
                                </Button>
                            </Block>
                        </Block>
                    </KeyboardAwareScrollView>
                )}
            </Formik>
        )
    }
}

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