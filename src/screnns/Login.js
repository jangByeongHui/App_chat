import React ,{useState, useRef,useEffect} from 'react';
import styled from 'styled-components/native';

import {Image, Input} from '../components';
import {images} from '../utils/Images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail,removeWhitespace } from '../utils/common';
import Button from '../components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

import {Alert} from 'react-native';
import {login} from '../utils/firebase';
const Container =styled.View`
    flex:1;
    align-items:center;
    justify-content:center;
    background-color:${({theme})=>theme.background};
    padding:0 20px;
    padding-top:${({insets:{top}})=>top}px;
    padding-bottom:${({insets:{bottom}})=>bottom}px;
`;

const ErrorText=styled.Text`
    align-items:flex-start;
    width:100%;
    height:20px;
    margin-bottom:10px;
    line-height:20px;
    color:${({theme}) => theme.errorText};
`;
//로그인 구현 
const Login =({navigation})=>{
    const insets=useSafeAreaInsets();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const passwordRef=useRef();
    const [errorMessage,setErrorMessage]=useState('');
    const [disabled,setDisabled]=useState(true);

    //email,password가 모두 있고 유효성 검사 통과시 로그인 버튼 활성화
    useEffect(()=>{
        setDisabled(!(email && password&& !errorMessage));
    },[email,password,errorMessage]);
    
    // 올바른 이메일 주소 확인 
    const _handleEmailChange=email=>{
        //공백 제거
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        
        setErrorMessage(
            validateEmail(changedEmail)?'':'Please verify your email.'
        );

    };
    //공백 제거
    const _handlePasswordChange = password=>{
        setPassword(removeWhitespace(password));
    };

    const _handleLoginButtonPress=async () =>{
        try{
            const user= await login({email,password});
            Alert.alert('로그인 성공',user.email);
        } catch(e){
            Alert.alert('로그인 실패',e.message)
        }
    };

    return(
        <KeyboardAwareScrollView
            contentContainerStyle={{flex:1}}
            extraScrollHeight={20}
        >
            <Container insets={insets}>
                <Image url={images.logo} imageStyle={{borderRadius:8}}/>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={_handleEmailChange}
                    onSubmitEditing={()=>passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={_handlePasswordChange}
                    onSubmitEditing={_handleLoginButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                
                
                <Button 
                    title="Login" 
                    onPress={_handleLoginButtonPress}
                    disabled={disabled}
                />
                <Button 
                    title="Sign up with email"
                    onPress={()=>navigation.navigate('Signup')}
                    isFilled={false}                
                />
                
            </Container>
        </KeyboardAwareScrollView>
    );

};

export default Login;