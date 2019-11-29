import React from 'react';
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
  TouchableWithoutFeedback
} from 'react-native';
import { Dimensions } from "react-native";


renderRow = ({ item }) => {
  return (
    <View>
      <Text>{item.accountNo}</Text>
    </View>
  )
}

var data = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      accounts: [],
      isLoading: true,
      tcNumber: (navigation.getParam('tcNumber', 'NO-ID'))
    };
  }


  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.setState({
      isLoading: false
    })
    /*if (this.state.tcNumber !== null) {
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
    }*/
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    Alert.alert(
      'Confirm exit',
      'Do you want to exit App?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
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
      { console.log("ife girdi" + this.state.isLoading) }
      { console.log("ife girdi--" + this.state.accounts) }
      return (
        <View style={styles.container}>
          <Text style={{marginTop:5,marginBottom:5, fontSize:18,marginLeft: Dimensions.get("window").width * 0.38}}>Hesap Listesi</Text>
          <Button title="Hesap Aç" onPress={() => alert("Hesap Açıldı")} style={{ marginBottom: 50, marginLeft: 100, marginRight: 100, }}></Button>

          <FlatList
            data={[{ accountNo: "3211321" }, { accountNo: "555555" }]}
            renderItem={({ item }) =>

              <TouchableWithoutFeedback style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>

                <View style={styles.item}>
                  <Text >ID: {item.accountNo}</Text>
                  <Button title="Detaylar" onPress={() => alert(item.accountNo)}></Button>
                  <Button title="Kapat" onPress={() => alert(item.accountNo)}></Button>
                </View>

              </TouchableWithoutFeedback>
            }
          />
        </View>
      );
    }
    return (
      <View>
        <Text>Hesaplar Yükleniyor...</Text>
      </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;