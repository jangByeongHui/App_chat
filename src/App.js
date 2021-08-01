import React,{useState} from 'react';
import {StatusBar,Image} from 'react-native';
import AppLoading from 'expo-app-loading';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import {theme} from './theme';
import Navigation from './navigations';
import{images} from './utils/Images';
const cacheImages=images=>{
    return images.map(image=>{
        if(typeof image==='string'){
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts=fonts=>{
    return fonts.map(font=>Font.loadAsync(font));
}


const App=()=>{
    const [isReady,setIsReady]=useState(false);

    const _loadAssets=async()=>{
        //이미지 파일
        const imageAssets=cacheImages([require('../assets/splash.png'),...Object.values(images)]);
        //폰트
        const fontAssets=cacheFonts([]); 

        await Promise.all([...imageAssets,...fontAssets]);
    };
/*
    return(
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content"/>
            <Navigation/>
        </ThemeProvider>
        
    );
*/
    return isReady ? (
        <ThemeProvider theme={theme}>
            <StatusBar barStyle="dark-content"/>
            <Navigation/>
        </ThemeProvider>
        

    ) : (
        <AppLoading
            startAsync={_loadAssets}
            onFinish={()=>setIsReady(true)}
            onError={console.warn}
        />
    );

};

export default App;