import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    Home, Login, Signup, Splash, ProfileScreen, ShowFullImg, Chat, Select, ContactList, ChangeInfoProfile, InfoGuestUser
} from '../container';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
function TabContainer() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name='ContactList'
                component={ContactList}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="list-ul" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    headerLeft: null,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-alt" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name='ChangeInfoProfile'
                component={ChangeInfoProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user-cog" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

// ------------------------------------------------------------

const Stack = createStackNavigator();
function NavContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'
                screenOptions={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#006666' },
                    headerTintColor: 'black',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 25,
                    },
                }}>

                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='Signup'
                    component={Signup}
                    options={{
                        headerLeft: null,
                        title: 'Đăng kí',
                        headerTintColor: 'white'
                    }}
                />

                <Stack.Screen
                    name='Home'
                    component={TabContainer}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='Chat'
                    component={Chat}
                    options={{ headerBackTitle: null, }}
                />

                <Stack.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{ headerLeft: null, }}
                />

                <Stack.Screen
                    name='Select'
                    component={Select}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='ShowFullImg'
                    component={ShowFullImg}
                    options={{
                        headerBackTitle: null,
                        headerTintColor: 'white'
                    }}
                />

                <Stack.Screen
                    name='InfoGuestUser'
                    component={InfoGuestUser}
                    options={{ headerBackTitle: null, }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavContainer;

