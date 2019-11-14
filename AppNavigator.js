import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Index from './app/index';
import Home from './Screens/HomeScreen';
import AccountList from './Screens/AccountList';

const RootStack = createStackNavigator(
    {
        Index: { screen: Index },
        Home: { screen: Home },
        AccountList: {screen: AccountList}
    },
    {
        initialRouteName: 'Index'
    }
);

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;