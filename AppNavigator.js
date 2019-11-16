import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Index from './app/index';
import Home from './Screens/HomeScreen';
import AccountList from './Screens/AccountList';
import Register from '..//React-Native-Bank-App/Screens/Register';
import Deneme from '..//React-Native-Bank-App/Screens/Deneme';
import Login from '..//React-Native-Bank-App/Screens/Login';
import YupTest from '..//React-Native-Bank-App/Screens/YupTest';

const RootStack = createStackNavigator(
    {
        Index: { screen: Index },
        Home: { screen: Home },
        AccountList: {screen: AccountList},
        Register: {screen: Register},
        Deneme: {screen: Deneme},
        Login: {screen: Login},
        YupTest: {screen: YupTest}
    },
    {
        initialRouteName: 'Login'
    }
);

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;