import React,{useState,useRef,useEffect}from 'react';
import styled from 'styled-components/native';
import { Image,Input,Button } from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace, validateEmail } from '../utils/common';
import {images} from '../utils/Images';
import {Alert} from 'react-native';
import {signup} from '../utils/firebase';
import { ProgressContext, ProgressProvider } from '../contexts';
import { useContext } from 'react/cjs/react.development';

const Container=styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
    background-color:${({theme})=>theme.background};
    padding:40px 20px;
`;
const ErrorText=styled.Text`
    align-items:flex-start;
    width:100%;
    height:20px;
    margin-bottom:10px;
    line-height:20px;
    color:${({theme})=>theme.errorText};

`;

const Signup=()=>{
    const {spinner}=useContext(ProgressContext);
    const [photoUrl,setPhotoUrl]=useState(images.photo);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordConfirm,setPasswordConfirm]=useState('');
    const [errorMessage,setErrorMessage]=useState('');
    const [disabled,setDisabled]=useState(true);

    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const didMountRef=useRef();

    useEffect(()=>{
        if(didMountRef.current)
        {
            let _errorMessage='';
            if(!name){
                _errorMessage='이름을 입력하세요.';  
            } else if(!validateEmail(email)){
                _errorMessage='이메일을 다시 확인하세요';
            } else if(password.length<6){
                _errorMessage='비밀번호는 7글자 이상이어야 합니다.';
            } else if(password!==passwordConfirm){
                _errorMessage='비밀번호가 맞지 않습니다';
            } else{
                _errorMessage='';
            }
            setErrorMessage(_errorMessage);
        } else {
            didMountRef.current=true;
        }
        
    },[name,email,password,passwordConfirm])

    useEffect(()=>{
        setDisabled(
            !(name&&email&&password&&passwordConfirm&&!errorMessage)
        );
    },[name,email,password,passwordConfirm,errorMessage]);

    const _handleSignButtonPress= async()=>{
        try{
            spinner.start();
            const user = await signup({email,password,name,photoUrl});
            console.log(user);
            Alert.alert('회원가입이 완료되었습니다.',user.email);
        } catch(e){
            Alert.alert('회원가입 실패',e.message);
        } finally{
            spinner.stop();
        }
    };

    return(
        <KeyboardAwareScrollView extraScrollHeight={20}>
            <Container>
                <Image 
                    rounded 
                    url={photoUrl} 
                    showButton
                    onChangeImage={url=>setPhotoUrl(url)}
                />
                <Input
                    label="Name"
                    value={name}
                    onChangeText={text=>setName(text)}
                    onSubmitEditing={()=>{
                        setName(name.trim());
                        emailRef.current.focus();
                    }}
                    onBlur={()=>setName(name.trim())}
                    placeholder="이름"
                    returnKeyType="next"
                />
                <Input
                    ref={emailRef}
                    label="Email"
                    value={email}
                    onChangeText={text=>setEmail(removeWhitespace(text))}
                    onSubmitEditing={()=>passwordRef.current.focus()}
                    placeholder="이메일"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={text=>setPassword(removeWhitespace(text))}
                    onSubmitEditing={()=>passwordConfirmRef.current.focus()}
                    placeholder="새 비밀번호"
                    returnKeyType="done"
                    isPassword
                />
                <Input
                    ref={passwordConfirmRef}
                    label="Password Confirm"
                    value={passwordConfirm}
                    onChangeText={text=>setPasswordConfirm(removeWhitespace(text))}
                    onSubmitEditing={_handleSignButtonPress}
                    placeholder="새 비밀번호 재입력"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="Signup"
                    onPress={_handleSignButtonPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );

};

export default Signup;