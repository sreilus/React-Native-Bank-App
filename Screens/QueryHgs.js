import React, { Component } from 'react';
import {
    StyleSheet, Text, Alert, TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button, Block, Input, Text as TextCmp } from '../components';
import { requiredText, tcText, phoneRegExp, onlyText, onlyTextError } from '../constants/strings';
import * as theme from '../constants/theme';
import { FontAwesome5 } from "@expo/vector-icons";


const validationSchema = yup.object().shape({
    hgsNo: yup
        .number()
        .label('Credit Amount')
        .moreThan(999, "1000'den büyük olmalı!")
        .lessThan(1000000, "En fazla 1 Milyon girebilirsiniz!")
        .required(requiredText),
});

export default class QueryHgs extends Component {

    constructor() {
        super();
        this.state = {
            hgsUser: [{ Id: 1, hgsNo: 1000, balance: 500 }],
            isLoading: false,
            status:100
        }
    }
    
    getHgsUser = async (values) => {
        let sayi=5;
        let url = 'https://rugratswebapi.azurewebsites.net/api/hgs/'+values.hgsNo;
        await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            sayi=response.status;
            if (sayi != 200) {
               alert("Hgs Hesabı Bulunamadı!")
            }
            return response.json()
        }).then(json => {
            console.log("status: "+sayi)
            if (sayi == 200) {
                this.setState({
                    hgsUser: json
                }, function () {
                   alert("Hgs Bakiyesi: "+this.state.hgsUser.balance+' ₺ ');
                });
            }
            else {
                alert("Hgs Hesabı Bulunamadı");
            }
            
        }).finally(() => {

        })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <Formik initialValues={{ hgsNo: '' }}
                onSubmit={(values, actions) => {
                    //alert(JSON.stringify(values.firstName));
                    this.getHgsUser(values);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 1000);

                }}

                validationSchema={validationSchema}>
                {formikProps => (
                    <KeyboardAwareScrollView style={{ marginVertical: 40 }} behavior="padding" enabled>
                        <TouchableOpacity
                            style={{ alignItems: "flex-start", marginTop: 5, marginLeft: 16 }}
                            onPress={this.props.navigation.openDrawer}
                        >
                            <FontAwesome5 name="bars" size={24} color="#161924" />
                        </TouchableOpacity>
                        <Block center>
                            <Block center style={{ marginTop: 25 }}>
                                <Input
                                    full
                                    number
                                    label="Hgs No Giriniz"
                                    maxLength={10}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                    onChangeText={formikProps.handleChange("hgsNo")}
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                    {formikProps.errors.hgsNo}
                                </Text>
                                <Button
                                    full
                                    style={{ marginBottom: 12 }}
                                    onPress={formikProps.handleSubmit}
                                >
                                    <TextCmp button >Hgs Bakiyesi Sorgula</TextCmp>
                                </Button>
                                <TextCmp style={{ marginTop: 5 }}>
                                    {this.state.result}
                                </TextCmp>
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