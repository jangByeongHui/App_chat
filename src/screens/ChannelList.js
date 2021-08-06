import React from 'react';
import styled from 'styled-components/native';
import { Text,Button } from 'react-native';

const Container=styled.View`
    flex:1;
    background-color:${({theme})=>theme.background};
`

const ChannelList=({navigation})=>{
    return(
        <Container>
            <Text style={{fontSize:24}}>대화방</Text>
            <Button
                title="채널 생성"
                onPress={()=>navigation.navigate('Channel Creation')}
            />
        </Container>
    );
};

export default ChannelList