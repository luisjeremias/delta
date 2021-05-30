
import React, {useState, useEffect } from 'react';
import {Text,StatusBar} from 'react-native';
import styled from 'styled-components/native';
import Header from './src/components/Header';
import Body from './src/components/Body';

const Page = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export default () =>{
  const [isEnabled, setIsEnabled] = useState(false);
 
return (
  <Page>
    <Header isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
    <Body isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
  </Page>
);
} 