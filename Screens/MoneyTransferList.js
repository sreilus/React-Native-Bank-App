import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    FlatList,
    BackHandler,
    Alert,
    Button,
    TouchableWithoutFeedback,
    AsyncStorage,
} from 'react-native';
import { Dimensions } from "react-native";
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton
} from 'react-native-modals';
import { requiredText, tcText } from '../constants/strings';

import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from '../components';


renderRow = ({ item }) => {
    return (
        <View>
            <Text>{item.accountNo}</Text>
        </View>
    )
}


const validationSchema = yup.object().shape({
    balance: yup
        .number()
        .label('balance')
        .moreThan(0.09, "0.1 den büyük olsun")
        .lessThan(999999, "küçük yap")
        .required(requiredText),
    receiverAccountNo: yup
        .number()
        .label('accountNo')
        .min(99999999999999, 'En az 13 haneli girmelisiniz!')
        .max(9999999999999999, 'En fazla 20 karakter girebilirsiniz!')
        .required(requiredText),
});

export default class MoneyTranferList extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            accounts: [{ accountNo: 555, balance: 50 }],
            isLoading: true,
            tcNumber: this.getTc(),
            result: 0,
            selectedAccountNo: 0,
            defaultAnimationModal: false,
            isFetching: false,
            moneyTranferList: [{
                receiverAccountNo: "111111111111001",
                senderAccountNo: "111111111111001",
                transferType: "Para Çekme",
                amount: 102.0000,
                statement: "",
                realizationTime: "2019-12-11T09:35:12.483"
            }]
        };
    }

    getTc = async () => {
        const deger = await AsyncStorage.getItem('TcNo');
        { console.log('ddddd:  ' + deger) }
        this.setState({
            tcNumber: deger
        })
    }

    listAccounts = () => {
        const tc = this.getTc();
        this.setState({
            isLoading: false
        });
        if (this.setState.tcNumber !== null) {
            console.log('tc: ' + tc)
            let url = 'https://rugratswebapi.azurewebsites.net/api/account/' + this.state.tcNumber;
            console.log('url: ' + url)
            this.setState({
                isLoading: true
            })
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);
                    this.setState({
                        accounts: responseJson
                    }, function () {
                        // console.log("yenii--- " + this.state.accounts[0].accountNo)
                    });

                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                    // console.log("finally " + this.state.accounts[0].accountNo)
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        else {
            Alert.alert("Lütfen Giriş Yapınız!");
        }
        this.setState({
            isFetching: false,
        });
    }

    getMoneyTransfers = (accountNo) => {
        let url = 'https://rugratswebapi.azurewebsites.net/api/MoneyTransfers/getTransferList/' + accountNo;
        console.log('url: ' + url)
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                console.log("veri : " + responseJson);
                this.setState({
                    moneyTranferList: responseJson
                }, function () {
                });

            }).finally(() => {

                // console.log("finally " + this.state.accounts[0].accountNo)
            })
            .catch((error) => {
                console.error(error);
            });

        this.setState({
            isFetching: false,
        });
    }

    onRefresh = async () => {
        this.setState({
            isFetching: true,
        });
        this.listAccounts();
    }

    componentWillMount() {
        console.log('ccccc:  ' + AsyncStorage.getItem('isLoggedIn'))
        let deger = AsyncStorage.getItem('isLoggedIn')
        if (!(deger > 0)) {
            console.log('ife girdi');
            AsyncStorage.removeItem("isLoggedIn");
        }
    }

    componentDidMount = () => {
        { console.log('ddddd:  ' + AsyncStorage.getItem('isLoggedIn')) }
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.setState({
            tcNumber: this.getTc().finally(() => {
                this.listAccounts();
            })
        });

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onPressTrannsfers = (accountNo) => {
        this.setState({
            defaultAnimationModal: true,
            selectedAccountNo: accountNo
        })
        this.getMoneyTransfers(accountNo);
    }


    onBackPress = () => {
        Alert.alert(
            'Uygulammayı Kapat',
            'Uygulamadan Çıkmak İstiyor Musunuz?',
            [
                { text: 'Hayır', style: 'cancel' },
                {
                    text: 'EVet', onPress: () => {
                        BackHandler.exitApp()
                    }
                }
            ]
        );

        return true;
    }

    static navigationOptions = {
        title: 'Hesap Listesi',
    };
    render() {
        if (this.state.isLoading === false) {
            return (
                <View style={styles.container}>
                    <Text style={{ marginTop: 5, marginBottom: 5, fontSize: 18, marginLeft: Dimensions.get("window").width * 0.25 }}>Hesap Hareketleri</Text>

                    <FlatList
                        data={this.state.accounts}
                        refreshing={this.state.isFetching}
                        onRefresh={() => this.onRefresh()}
                        renderItem={({ item }) =>

                            <TouchableWithoutFeedback style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>

                                <View style={styles.view}>
                                    <Text >Hesap No: {item.accountNo}</Text>
                                    <Text >Para Miktarı: {item.balance} ₺</Text>
                                    <View style={styles.item}>
                                        <Button title="Hesap Hareketleri" onPress={() => this.onPressTrannsfers(item.accountNo)}></Button>
                                    </View>
                                </View>

                            </TouchableWithoutFeedback>
                        }
                    />
                    <Formik initialValues={{ balance: 0, receiverAccountNo: '', statement: "" }}
                        onSubmit={(values, actions) => {
                            this.makeHavale(values.balance, values.receiverAccountNo, values.statement);

                            setTimeout(() => {
                                actions.setSubmitting(false);
                            }, 1000);

                        }}
                        validationSchema={validationSchema}>
                        {formikProps => (
                            <Modal
                                width={0.9}
                                visible={this.state.defaultAnimationModal}
                                rounded
                                style={{marginTop:60}}
                                actionsBordered
                                onTouchOutside={() => {
                                    //this.setState({ defaultAnimationModal: false });
                                }}
                                modalTitle={
                                    <ModalTitle
                                        title="Hesap Özeti"
                                        align="left"
                                    />
                                }
                                footer={
                                    <ModalFooter>
                                        <ModalButton
                                            text="KAPAT"
                                            bordered
                                            onPress={() => {
                                                this.setState({ defaultAnimationModal: false });
                                            }}
                                            key="button-1"
                                        />

                                    </ModalFooter>
                                }
                            >
                                <ModalContent
                                    style={{ backgroundColor: '#fff' }}
                                >
                                    <ScrollView>
                                    <Button title="Kapat" style={{marginTop:30}} onPress={() => this.setState({
                                            defaultAnimationModal: false
                                        })}></Button>
                                        <FlatList
                                            data={this.state.moneyTranferList}
                                            renderItem={({ item }) =>

                                                <TouchableWithoutFeedback style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                }}>

                                                    <View style={styles.view}>
                                                        <Text >Alıcı: {item.receiverAccountNo}</Text>
                                                        <Text >Gönderen: {item.senderAccountNo} </Text>
                                                        <Text >Transfer Türü: {item.transferType}</Text>
                                                        <Text >Para Miktarı: {item.amount} ₺</Text>
                                                        <Text >Açıklama: {item.statement}</Text>
                                                        <Text >Tarih: {item.realizationTime}</Text>
                                                    </View>

                                                </TouchableWithoutFeedback>
                                            }
                                        />
                                        

                                    </ScrollView>
                                </ModalContent>
                            </Modal>
                        )}
                    </Formik>
                </View>
            );
        }
        return (
            <View>
                {console.log('hhhhhhh:  ' + AsyncStorage.getItem('isLoggedIn'))}
                <Text style={{ marginTop: 25 }}>Yükleniyor Lütfen Bekleyiniz...</Text>
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    view: {
        backgroundColor: '#cfcfcf',
        borderRadius: 50,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        fontSize: 32,
    },
});