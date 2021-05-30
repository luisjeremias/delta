import { CheckBox } from 'native-base';
import React, { useState, useEffect } from "react";
import {  StatusBar, StyleSheet } from "react-native";
import styled from 'styled-components/native';
import Logolight from '../../assets/logo.png';
import Logoblack from "../../assets/logo_black.png";

const HeaderLight = styled.View`
width:100%;
height:60px;
margin-top: ${(props) => props.status}px;
background-color: rgb(250, 250, 250);
display: flex;
align-items: center;
justify-content: center;

`;

//rgb(41, 51, 65);
const HeaderBlack = styled.View`
width:100%;
height:60px;
margin-top: ${(props) => props.status}px;
background-color:#161f2d ; 
display: flex;
align-items: center;
justify-content: center;
flex-direction:row;


elevation: 5;
`;
const Image = styled.Image`
width:100px;
`;
const Toggle = styled.Switch`
width:40px;
position:absolute;
right:0;
margin-right:15px;

`;


export default ({ isEnabled, setIsEnabled }) => {

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const Themes = () => {
    if (isEnabled) {
      return (
        <HeaderBlack
          style={styles.Headerblack}
          status={StatusBar.currentHeight}
        >
          <Image source={Logoblack} resizeMode="center" />
          <Toggle
            trackColor={{ false: "rgb(46, 45, 45);", true: "rgb(46, 45, 45);" }}
            thumbColor={isEnabled ? "#ddd" : "rgb(253 179 11)"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </HeaderBlack>
      );
    } else {
      return (
        <HeaderLight style={styles.Headerlight} status={StatusBar.currentHeight}>
          <Image source={Logolight} resizeMode="center" />
          <Toggle
            trackColor={{ false: "rgb(46, 45, 45);", true: "rgb(46, 45, 45);" }}
            thumbColor={isEnabled ? "#ddd" : "rgb(253 179 11)"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </HeaderLight>
      );
    }
  };
  return Themes();
};

const styles = StyleSheet.create({
  Headerlight: {
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.38,
    elevation: 5,
  },
  Headerblack: {
    shadowColor: "#f5f5f5",
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.38,
    elevation: 5,
  },
});
