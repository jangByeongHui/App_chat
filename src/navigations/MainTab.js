import React,{useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Profile,ChannelList} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

const Tab=createBottomTabNavigator();

const TabBarIcon=({focused,name})=>{
    const theme =useContext(ThemeContext);
    return(
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.themeActiveColor:theme.tabInactiveColor}
        />
    );
};

const MainTab=()=>{
    const theme = useContext(ThemeContext);

    return(
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor:theme.tabActiveColor,
                inactiveTintColor:theme.tabinactiveTintColor,
            }}
        >
            <Tab.Screen 
                name="대화방" 
                component={ChannelList}
                options={{
                    tabBarIcon:({focused})=>
                    TabBarIcon({
                        focused,
                        name:focused ? 'chat-bubble':'chat-bubble-outline',
                    }),
                }}
            />
            <Tab.Screen 
                name="프로필" 
                component={Profile}
                options={{
                    tabBarIcon:({focused})=>
                    TabBarIcon({
                        focused,
                        name:focused ? 'person':'person-outline',
                    }),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTab;