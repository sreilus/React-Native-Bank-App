import React from "react";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';

import { Dimensions } from "react-native";

import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import {
    ProfileScreen,
    MessageScreen,
    ActivityScreen,
    ListScreen,
    ReportScreen,
    StatisticScreen,
    SignOutScreen
} from "./Screens";

import Login from "./Screens/Login";

import Home from "./Screens/HomeScreen";

import Register from "./Screens/Deneme";

import Hidden from "./Screens/Hidden";

import SideBar from "./components/SideBar";

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: Login,
        }
    }
);

LoginStack.navigationOptions = ({ navigation }) => {
    
       let drawerLockMode = 'locked-closed';
    return {
        drawerLockMode,
    };
};

const RegisterStack = createStackNavigator(
    {
        Register: {
            screen: Register,
        }
    }
);

RegisterStack.navigationOptions = ({ navigation }) => {
    
       let drawerLockMode = 'locked-closed';
    return {
        drawerLockMode,
    };
};

const DrawerNavigator = createDrawerNavigator(
    {Login: {
        screen: LoginStack,
        navigationOptions: {
            title: "EmptyScr",
            drawerLabel: <Hidden />
        }
    },
        Register: {
        screen: RegisterStack,
        navigationOptions: {
            title: "RegstScr",
            drawerLabel: <Hidden />
        }
    },
        
        
        Profil: {
            screen: ProfileScreen,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Feather name="user" size={16} color={tintColor} />
            }
        },
        DrawMoney: {
            screen: ActivityScreen,
            navigationOptions: {
                title: "Para Çek",
                drawerIcon: ({ tintColor }) => <MaterialIcons name="money-off" size={16} color={tintColor} />
            }
        },
        Activity: {
            screen: ActivityScreen,
            navigationOptions: {
                title: "Para Yatır",
                drawerIcon: ({ tintColor }) => <MaterialIcons name="attach-money" size={16} color={tintColor} />
            }
        },
        List: {
            screen: Home,
            navigationOptions: {
                title: "Hesaplarım",
                drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="account-details" size={16} color={tintColor} />
            }
        },
        Report: {
            screen: ReportScreen,
            navigationOptions: {
                title: "Havale",
                drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="bank-transfer" size={16} color={tintColor} />
            }
        },
        Message: {
            screen: MessageScreen,
            navigationOptions: {
                title: "Virman",
                drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="bank-transfer-out" size={16} color={tintColor} />
            }
        },
        Statistic: {
            screen: StatisticScreen,
            navigationOptions: {
                title: "Hgs İşlemlerie",
                drawerIcon: ({ tintColor }) => <MaterialCommunityIcons name="highway" size={16} color={tintColor} />
            }
        },
        SignOut: {
            screen: SignOutScreen,
            navigationOptions: {
                title: "Sign Out",
                drawerIcon: ({ tintColor }) => <Feather name="log-out" size={16} color={tintColor} />
            }
        }
    },
    {
        contentComponent: props => <SideBar {...props} />,

        drawerWidth: Dimensions.get("window").width * 0.65,
        hideStatusBar: true,

        contentOptions: {
            activeBackgroundColor: "rgba(212,118,207, 0.2)",
            activeTintColor: "#53115B",
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8
            },
            itemStyle: {
                borderRadius: 4
            }
        }
    }
);

export default createAppContainer(DrawerNavigator);
