import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Input } from '../components';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-modals';
import { requiredText, tcText } from '../constants/strings';

import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        paddingLeft: 18,
        paddingRight: 18,
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
    customBackgroundModal: {
        opacity: 0.5,
        backgroundColor: '#000',
    },
});

const validationSchema = yup.object().shape({
    balance: yup
        .number()
        .label('balance')
        .moreThan(0.09, "0.1 den büyük olsun")
        .lessThan(999999, "küçük yap")
        .required(requiredText),
    accountNo: yup
        .number()
        .label('accountNo')
        .min(99999999999999, 'En az 13 haneli girmelisiniz!')
        .max(9999999999999999, 'En fazla 20 karakter girebilirsiniz!')
        .required(requiredText),
});

export default class ModalExample extends Component {
    state = {
        customBackgroundModal: false,
        defaultAnimationModal: false,
        swipeableModal: false,
        scaleAnimationModal: false,
        slideAnimationModal: false,
        bottomModalAndTitle: false,
        bottomModal: false,
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Button
                        title="Show Modal - Default Animation"
                        onPress={() => {
                            this.setState({
                                defaultAnimationModal: true,
                            });
                        }}
                    />

                    <Button
                        title="Show Modal - Swipeable Modal Animation"
                        onPress={() => {
                            this.setState({
                                swipeableModal: true,
                            });
                        }}
                    />

                    <Button
                        title="Show Modal - Scale Animation"
                        onPress={() => {
                            this.setState({
                                scaleAnimationModal: true,
                            });
                        }}
                    />

                    <Button
                        title="Show Modal - Slide Animation"
                        onPress={() => {
                            this.setState({
                                slideAnimationModal: true,
                            });
                        }}
                    />

                    <Button
                        title="Show Modal - Custom Background Style"
                        onPress={() => {
                            this.setState({
                                customBackgroundModal: true,
                            });
                        }}
                    />

                    <Button
                        title="Bottom Modal with Title"
                        onPress={() => {
                            this.setState({
                                bottomModalAndTitle: true,
                            });
                        }}
                    />

                    <Button
                        title="Bottom Modal without Title"
                        onPress={() => {
                            this.setState({
                                bottomModal: true,
                            });
                        }}
                    />
                </View>
                <Formik initialValues={{ balance: 0, accountNo: '' }}
                    onSubmit={(values, actions) => {
                        //alert(JSON.stringify(values.firstName));
                        alert(values)
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
                            actionsBordered
                            onTouchOutside={() => {
                                this.setState({ defaultAnimationModal: false });
                            }}
                            modalTitle={
                                <ModalTitle
                                    title="Havale Yap"
                                    align="left"
                                />
                            }
                            footer={
                                <ModalFooter>
                                    <ModalButton
                                        text="İPTAL"
                                        bordered
                                        onPress={() => {
                                            this.setState({ defaultAnimationModal: false });
                                        }}
                                        key="button-1"
                                    />
                                    <ModalButton
                                        text="GÖNDER"
                                        bordered
                                        onPress={() => {
                                            this.setState({ defaultAnimationModal: false });
                                        }}
                                        key="button-2"
                                    />
                                </ModalFooter>
                            }
                        >
                            <ModalContent
                                style={{ backgroundColor: '#fff' }}
                            >
                                <ScrollView>
                                <Input
                                    full
                                    number
                                    maxLength={30}
                                    label="Göndereceğiniz Hesap Numarası"
                                    onChangeText={formikProps.handleChange("accountNo")}
                                    style={{ marginBottom: 5, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.accountNo}
                                    </Text>
                                <Input
                                    full
                                    number
                                    label="Para Miktarı"
                                    onChangeText={formikProps.handleChange("balance")}
                                    maxLength={30}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                                <Text style={{ color: 'red', marginBottom: 2 }}>
                                        {formikProps.errors.balance}
                                    </Text>
                                    <Input
                                    full
                                    number
                                    label="Açıklama"
                                    onChangeText={formikProps.handleChange("balance")}
                                    maxLength={30}
                                    style={{ marginBottom: 10, width: 250, backgroundColor: '#cfcfcf' }}
                                //defaultValue='1'              
                                />
                            
                                    </ScrollView>
                            </ModalContent>
                        </Modal>
                        )}
                </Formik>
                <Modal
                    onDismiss={() => {
                        this.setState({ swipeableModal: false });
                    }}
                    width={0.9}
                    overlayOpacity={1}
                    visible={this.state.swipeableModal}
                    rounded
                    actionsBordered
                    onSwipeOut={() => {
                        this.setState({ swipeableModal: false });
                    }}
                    onTouchOutside={() => {
                        this.setState({ swipeableModal: false });
                    }}
                    swipeDirection={['down', 'up']}
                    modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                    modalTitle={
                        <ModalTitle
                            title="Swipeable Modal"
                        />
                    }
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                bordered
                                onPress={() => {
                                    this.setState({ swipeableModal: false });
                                }}
                                key="button-1"
                            />
                            <ModalButton
                                text="OK"
                                bordered
                                onPress={() => {
                                    this.setState({ swipeableModal: false });
                                }}
                                key="button-2"
                            />
                        </ModalFooter>
                    }
                >
                    <ModalContent
                        style={{ backgroundColor: '#fff', paddingTop: 24 }}
                    >
                        <Text>Swipeable</Text>
                        <Text>Swipe Up/Down</Text>
                    </ModalContent>
                </Modal>

                <Modal
                    onTouchOutside={() => {
                        this.setState({ scaleAnimationModal: false });
                    }}
                    width={0.9}
                    visible={this.state.scaleAnimationModal}
                    onSwipeOut={() => this.setState({ scaleAnimationModal: false })}
                    modalAnimation={new ScaleAnimation()}
                    onHardwareBackPress={() => {
                        console.log('onHardwareBackPress');
                        this.setState({ scaleAnimationModal: false });
                        return true;
                    }}
                    modalTitle={
                        <ModalTitle
                            title="Modal - Scale Animation"
                            hasTitleBar={false}
                        />
                    }
                    actions={[
                        <ModalButton
                            text="DISMISS"
                            onPress={() => {
                                this.setState({ scaleAnimationModal: false });
                            }}
                            key="button-1"
                        />,
                    ]}
                >
                    <ModalContent>
                        <Button
                            title="Show Modal - Default Animation"
                            onPress={() => {
                                this.setState({ defaultAnimationModal: true });
                            }}
                        />
                    </ModalContent>
                </Modal>

                <Modal
                    onDismiss={() => {
                        this.setState({ slideAnimationModal: false });
                    }}
                    onTouchOutside={() => {
                        this.setState({ slideAnimationModal: false });
                    }}
                    swipeDirection="down"
                    onSwipeOut={() => this.setState({ slideAnimationModal: false })}
                    visible={this.state.slideAnimationModal}
                    modalTitle={
                        <ModalTitle
                            title="Modal - Slide Animation"
                            hasTitleBar={false}
                        />
                    }
                    modalAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                >
                    <ModalContent>
                        <Text>Slide Animation</Text>
                    </ModalContent>
                </Modal>

                <Modal
                    onDismiss={() => {
                        this.setState({ customBackgroundModal: false });
                    }}
                    onTouchOutside={() => {
                        this.setState({ customBackgroundModal: false });
                    }}
                    zIndex={1000}
                    backgroundStyle={styles.customBackgroundModal}
                    modalStyle={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                    modalTitle={
                        <ModalTitle
                            title="Modal - Custom Background Style"
                            hasTitleBar={false}
                            textStyle={{ color: '#fff' }}
                        />
                    }
                    visible={this.state.customBackgroundModal}
                >
                    <View style={styles.dialogContentView}>
                        <Text style={{ color: '#fff' }}>Custom backgroundStyle</Text>
                    </View>
                </Modal>

                <Modal.BottomModal
                    visible={this.state.bottomModalAndTitle}
                    onTouchOutside={() => this.setState({ bottomModalAndTitle: false })}
                    height={0.5}
                    width={1}
                    onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
                    modalTitle={
                        <ModalTitle
                            title="Bottom Modal"
                            hasTitleBar
                        />
                    }
                >
                    <ModalContent
                        style={{
                            flex: 1,
                            backgroundColor: 'fff',
                        }}
                    >
                        <Text>
                            Bottom Modal with Title
            </Text>
                    </ModalContent>
                </Modal.BottomModal>

                <Modal.BottomModal
                    visible={this.state.bottomModal}
                    onTouchOutside={() => this.setState({ bottomModal: false })}
                // modalStyle={{  }}
                >
                    <ModalContent
                        style={{
                            backgroundColor: 'fff',
                            // height: '40%',
                        }}
                    >
                        <Text>
                            Bottom Modal without Title
            </Text>
                    </ModalContent>
                </Modal.BottomModal>
            </View>
        );
    }
}