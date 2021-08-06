import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import ChannelCreation from './ChannelCreation';

const Container =styled.View`
    flex:1;
    background-color:${({theme})=>theme.background};
`;

const Channel=()=>{
    return(
        <Container>
            <Text style={{fontSize:24}}>Channel</Text>
        </Container>
    );
};

export default Channel;