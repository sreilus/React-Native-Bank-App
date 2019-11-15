import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
import Animated, { Easing } from 'react-native-reanimated';


class Register extends Component {
    static navigationOptions = {
        title: 'Welcome'
    };
    constructor(props) {
        super(props)
        this.state = { date: "2016-05-15" }
    }
    render() {
        return (
            <ScrollView scrollEventThrottle={16}>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        placeholder="Firstname"
                        style={styles.textInput}
                        maxLength={20}
                        placeholderTextColor="gray"
                    />
                    <TextInput
                        placeholder="Surname"
                        style={styles.textInput}
                        maxLength={20}
                        placeholderTextColor="gray"
                    />
                    <TextInput
                        placeholder="TC IDENTITY KEY"
                        style={styles.textInput}
                        maxLength={11}
                        keyboardType='numeric'
                        placeholderTextColor="gray"
                    />
                    <TextInput
                        placeholder="E-Mail"
                        style={styles.textInput}
                        maxLength={40}
                        placeholderTextColor="gray"
                    />
                    <TextInput
                        placeholder="Phone"
                        style={styles.textInput}
                        keyboardType='numeric'
                        format
                        maxLength={15}
                        placeholderTextColor="gray"
                    />
                    <Text style={{ marginLeft: 160, marginTop: 10 }}>
                        Birthday</Text>
                    <DatePicker
                        style={{ width: 200, marginLeft: 80 }}
                        date={this.state.date}
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
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.textInput}
                        maxLength={40}
                        secureTextEntry={true}
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity onPress={this.onPress}>
                        <Animated.View style={styles.signInButton}>
                            <Text styles={{ fontSize: 20, fontWeight: 'bold' }}>
                                SIGN IN
                             </Text>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        marginTop: 10,
        paddingLeft: 10,
        marginVertical: 5,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    signInButton: {
        backgroundColor: '#33FF6D',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3,
      }
});

export default Register;