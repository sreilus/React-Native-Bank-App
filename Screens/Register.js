import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, ScrollView,Button } from 'react-native'
import DatePicker from 'react-native-datepicker'


class Register extends Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null

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
                    <Button  title="Press me"></Button>
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
    }
});

export default Register;