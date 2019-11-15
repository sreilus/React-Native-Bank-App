import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Index from './app/index';
import Home from './Screens/HomeScreen';
import AccountList from './Screens/AccountList';
import Register from '..//React-Native-Bank-App/Screens/Register';

const RootStack = createStackNavigator(
    {
        Index: { screen: Index },
        Home: { screen: Home },
        AccountList: {screen: AccountList},
        Register: {screen: Register}
    },
    {
        initialRouteName: 'Index'
    }
);

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;