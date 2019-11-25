import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'

export default class EmptyScreen extends Component {
    static navigationOptions = {
        title: 'Sign Up',
        header: null
    };
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 10
            }}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#DDDDDD',
                        padding: 10
                    }} 
                >
                    <Button title="Tıkl3a" onPress={() => {this.props.navigation.navigate('DrawMoney')}}>
                    
                    </Button>
                </TouchableOpacity>
            </View>
        )
    }
}
