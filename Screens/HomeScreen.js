import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  BackHandler,
  Alert,
  ListView,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import { Dimensions } from "react-native";


renderRow = ({ item }) => {
  return (
    <View>
      <Text>{item.accountNo}</Text>
    </View>
  )
}


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      accounts: [{accountNo:555, balance:50}],
      isLoading: true,
      tcNumber: (navigation.getParam('tcNumber', 'NO-ID')),
      result: 0
    };
  }

  listAccounts = () => {
    this.setState({
      isLoading: false
    });
    if (this.state.tcNumber !== null) {
      console.log('tc: ' + this.state.tcNumber)
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
  }

  componentWillMount() {
    console.log('ccccc:  '+AsyncStorage.getItem('isLoggedIn'))
    let deger=AsyncStorage.getItem('isLoggedIn')
    if(!(deger >0))
    {
      console.log('ife girdi');
      AsyncStorage.removeItem("isLoggedIn");
    }
  }

  componentDidMount = () => {
    {console.log('ddddd:  '+AsyncStorage.getItem('isLoggedIn'))}
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.setState({
      tcNumber: this.props.navigation.getParam('tcNumber', 'NO-ID')
    });
    this.listAccounts();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  closeAnAccount = async (accountNo) => {
    if (this.state.tcNumber !== null) {
      console.log('tc: ' + this.state.tcNumber)
      let url = 'https://rugratswebapi.azurewebsites.net/api/account/closeAccount';
      console.log('url: ' + url)
      this.setState({
        isLoading: true
      })
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          accountNo: accountNo,
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
          Alert.alert("Hesap Başarıyla Kapatıldı!");
          this.listAccounts();
        }
        else if (deger == "2") {
          Alert.alert("Hesabınızda Para Olduğu İçin Hesap Kapatılamadı!");
        }
        else {
          console.log("kapatt : " + deger)
          alert("Hesap Kapatma İşlemi Başarısız Oldu!");
        }
        // console.log("finally " + this.state.accounts[0].accountNo)
      })
        .catch((error) => {
          console.error(error);
        });;
    }
    else {
      Alert.alert("Lütfen Giriş Yapınız!");
    }
  }


  openAnAccount = async () => {
    if (this.state.tcNumber !== null) {
      console.log('tc: ' + this.state.tcNumber)
      let url = 'https://rugratswebapi.azurewebsites.net/api/account/openAnAccount';
      console.log('url: ' + url)
      this.setState({
        isLoading: true
      })
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          TcIdentityKey: this.state.tcNumber,
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
          Alert.alert("Hesap Başarıyla Açıldı!");
          this.listAccounts();
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
    else {
      Alert.alert("Lütfen Giriş Yapınız!");
    }
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
          <Text style={{ marginTop: 5, marginBottom: 5, fontSize: 18, marginLeft: Dimensions.get("window").width * 0.38 }}>Hesap Listesi</Text>
          <Button title="Hesap Aç" onPress={this.openAnAccount} style={{ marginBottom: 50, marginLeft: 100, marginRight: 100, }}></Button>

          <FlatList
            data={this.state.accounts}
            renderItem={({ item }) =>

              <TouchableWithoutFeedback style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

                <View style={styles.view}>
                  <Text >Hesap No: {item.accountNo}</Text>
                  <Text >Para Miktarı: {item.balance} ₺</Text>
                  <View style={styles.item}>
                    <Button title="Detaylar" onPress={() => this.setState({
                      tcNumber: this.props.navigation.getParam('tcNumber', 'NO-ID')
                    })}></Button>
                  </View>
                  <View style={styles.item}>
                    <Button title="Hesabı Kapat" onPress={() => this.closeAnAccount(item.accountNo)}></Button>
                  </View>
                </View>

              </TouchableWithoutFeedback>
            }
          />
        </View>
      );
    }
    return (
      <View>
         {console.log('hhhhhhh:  '+AsyncStorage.getItem('isLoggedIn'))}
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
    backgroundColor: 'gray',
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;