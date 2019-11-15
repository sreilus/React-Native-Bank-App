import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, ToastAndroid, TouchableOpacity, StatusBar } from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { Formik } from 'formik';
import * as yup from 'yup';

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');



const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .label('Name')
    .min(2, 'En az 2 karakter')
    .max(5, 'max 5 karakter'),
});

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };



  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class MusicApp extends Component {

  static navigationOptions = {
    title: 'Welcome',
    header: null

  };
  constructor(props) {
    super(props);

    this.state = {
      TcIdentityKey: '',
      Password: '',
      dataSource: null,
      isLoading: true,
      resultt: null
    }

    this.buttonOpacity = new Value(1);


    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }

  onChangeTextTc = (TcIdentityKey) => {
    this.setState({ TcIdentityKey });
  }

  onChangeTextPass = (Password) => {
    this.setState({ Password });
  }

  onPress = () => {

    fetch('https://rugratswebapi.azurewebsites.net/api/login', {
      method: 'POST',
      body: JSON.stringify({
        TcIdentityKey: this.state.TcIdentityKey,
        userPassword: this.state.Password
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
        navigate('Home', { tcNumber: this.state.TcIdentityKey });
        ToastAndroid.show("Giriş Başarılı!", ToastAndroid.SHORT);
      }
      else {
        //ToastAndroid.show("Kimlik No veya Şifre Hatalı!", ToastAndroid.SHORT);
        alert("Kimlik No veya Şifre Hatalı!");
      }
    });

    /* formData.append('key1', 'value');
     formData.append('key2', 'value');*/
  };



  componentDidMount = () => {
    StatusBar.setHidden(true);
    /*fetch('https://bankappcorewebapirugrats.azurewebsites.net/api/user/2')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });*/

  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Formik initialValues={{ name: '' }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}>
        {formikProps => (
          <KeyboardAvoidingView
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
            behavior="padding"
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'flex-end'
              }}
            >
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFill,
                  transform: [{ translateY: this.bgY }]
                }}
              >
                <Svg height={height + 50} width={width}>
                  <ClipPath id="clip">
                    <Circle r={height + 50} cx={width / 2} />
                  </ClipPath>
                  <Image
                    href={require('../assets/img_bank.jpg')}
                    width={width}
                    height={height + 50}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clip)"
                  />
                </Svg>
              </Animated.View>
              <View style={{ height: height / 3, justifyContent: 'center' }}>
                <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                  <Animated.View
                    style={{
                      ...styles.signInButton,
                      opacity: this.buttonOpacity,
                      transform: [{ translateY: this.buttonY }]
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
                  </Animated.View>
                </TapGestureHandler>
                <TouchableOpacity onPress={() => navigate('Register', { name: 'Jack' })}>
                  <Animated.View
                    style={{
                      ...styles.button,
                      backgroundColor: '#2E71DC',
                      opacity: this.buttonOpacity,
                      transform: [{ translateY: this.buttonY }]
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                      SIGN IN WITH FACEBOOK
            </Text>
                  </Animated.View>
                </TouchableOpacity>
                <Animated.View style={{
                  zIndex: this.textInputZindex,
                  opacity: this.textInputOpacity,
                  transform: [{ translateY: this.textInputY }],
                  height: height / 3,
                  ...StyleSheet.absoluteFill,
                  top: null,
                  justifyContent: 'center'
                }}>

                  <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                    <Animated.View style={styles.closeButton}>
                      <Animated.Text style={{
                        fontSize: 15, transform: [
                          { rotate: concat(this.rotateCross, 'deg') }]
                      }}>
                        X
                </Animated.Text>
                    </Animated.View>
                  </TapGestureHandler>

                  <TextInput
                    placeholder="TC IDENTITY KEY"
                    style={styles.textInput}
                    maxLength={11}
                    keyboardType='numeric'
                    placeholderTextColor="black"
                    TcIdentityKey={this.state.TcIdentityKey}
                    onChangeText={this.onChangeTextTc}
                  />
                  <Text style={{ color: 'white', marginLeft: 42 }}>{formikProps.errors.name}</Text>
                  <TextInput
                    placeholder="PASSWORD"
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholderTextColor="black"
                    onChangeText={this.onChangeTextPass}
                    Password={this.state.Password}
                  />
                  <TouchableOpacity onPress={this.onPress}>
                    <Animated.View style={styles.signInButton}>
                      <Text styles={{ fontSize: 20, fontWeight: 'bold' }}>
                        SIGN IN
              </Text>
                    </Animated.View>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}
export default MusicApp;

class DetailScreen extends React.Component {

  // create the title for the screen
  static navigationOptions = {
    title: "Details"
  }

  // create constructor to get access to props
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Detail Screen Stack Navigation Sample</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
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
  },
  closeButton: {
    height: 40, width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 3,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
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
