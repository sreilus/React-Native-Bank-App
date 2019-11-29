import React, { Component } from 'react'
import {
    Text,
    View,
    Alert,
    Button
} from 'react-native'

onBackPress = () => {
    Alert.alert(
        'Confirm exit',
        'Do you want to exit App?',
        [
            { text: 'CANCEL', style: 'cancel' },
            {
                text: 'OK', onPress: () => {
                    const { navigate } = this.props.navigation;
                    navigate('Login');
                }
            }
        ]
    );

    return true;
}

export default class SignOut extends Component {


    onBackPress = () => {
        Alert.alert(
            'Confirm exit',
            'Do you want to exit App?',
            [
                { text: 'CANCEL', style: 'cancel'},
                {
                    text: 'OK', onPress: () => {
                        const { navigate } = this.props.navigation;
                        navigate('Login');
                    }
                }
            ]
        );
    
        return true;
    }

    componentWillMount = () => {
        this.onBackPress()
    };

    render() {
        return (
            <View style={{ flex:1,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center'}}>
                <Button title="Oturumu Kapat"  onPress={()=> this.props.navigation.navigate("Login")}></Button>
            </View>
        )
    }
}
