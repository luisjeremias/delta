import React, {useState,useEffect} from 'react';
import {  StyleSheet, Alert } from 'react-native';
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import styled from 'styled-components/native';


const BodyLight = styled.View`
  padding: 14px;
  display: flex;
  height: 100%;
  align-items: center;
  background-color: #f5f5f5;
`;
const BodyBlack = styled.View`
  padding: 14px;
  display: flex;
  height: 100%;
  align-items: center;
  background-color: rgb(21, 25, 31);
`;
const TextLight = styled.Text`
font-size:19px;
color:#444;
font-weight:bold;
margin-bottom:5px;
`;
const TextBlack = styled.Text`
  font-size: 19px;
  color: #ddd;
  font-weight: bold;
  margin-bottom: 5px;
`;
const InputLight = styled.TextInput`
  width: 85%;
  height: 45px;
  border: 1px solid #000;
  border-radius: 5px;
  padding:5px;
  color:#444;
  font-size:19px;
  text-align:center;
  font-weight:bold;
  background-color:transparent;
  margin-bottom: 15px;
`;
const InputBlack = styled.TextInput`
  width: 85%;
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px;
  color: #ddd;
  font-size: 19px;
  text-align: center;
  font-weight: bold;
  background-color: transparent;
  margin-bottom: 15px;
`;
const ButtonContainer = styled.View`
width:100%;
display:flex;
margin-bottom:5px;
justify-content:center;
align-items:center;
flex-direction:column;
`;
const ButtonLight = styled.TouchableOpacity`
  width: 85%;
  border-radius:4px;
  display: flex;
  margin-bottom: 9px;
  justify-content: center;
  align-items: center;
  padding:10px;
  border: 1px solid #444;
`;
const ButtonBlack = styled.TouchableOpacity`
  width: 85%;
  border-radius: 4px;
  display: flex;
  margin-bottom: 9px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
`;
const TextButtonLight = styled.Text`
  font-size: 19px;
  margin-bottom: 5px;
  color:#444;
  font-weight:bold;
`;
const TextButtonBlack = styled.Text`
  font-size: 19px;
  margin-bottom: 5px;
  color: #ddd;
  font-weight: bold;
`;

const BoxLight = styled.View`
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-top: 50px;
`;


const BoxBlack = styled.View`
  background-color: #161f2d;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-top: 50px;
`;


export default ({ isEnabled, setIsEnabled }) =>{
  let [ShowComment, setShowModelComment] = useState(false);
  let [animateModal, setanimateModal] = useState(false);

  let [a,setA] = useState("");
  let [b,setB] = useState("");
  let [c,setC] = useState("");

  let [result,setResult] = useState(0);
  let [xum,setUm] = useState(0);
  let [xdois,setDois] = useState(0);


  const handleCalcular = () =>{
     if (a == "") {
       Alert.alert("Espacos Vazios", "Coloque o valor de a");
       return false;
     }
     if (b == '') {
       Alert.alert("Espacos Vazios", "Coloque o valor de b");
       return false;
     }
      if (c == "") {
        Alert.alert("Espacos Vazios", "Coloque o valor de c");
        return false;
      }
    a = parseFloat(a.trim());
    b = parseFloat(b.trim());
    c = parseFloat(c.trim());
    let regex = /^[0-9]+$/;
   
    if (regex.test(a) || regex.test(b) || regex.test(c)) {
      let preResult = eval(b * b - 4 * a * c);
      let XumXdois = Math.sqrt(preResult);
      let preXUM = -b + XumXdois;
      let preXDOIS = -b - XumXdois;
      setResult(preResult);
      setUm(preXUM / (2 * a));
      setDois(preXDOIS / (2 * a));

      setShowModelComment(true);
    }else{
       Alert.alert("Erro", "Voce deve colocar apenas numeros!", [
         {
           text: "Cancelar",
           onPress: () => handleReset(),
           style: "cancel",
         },
       ]);
       return false;
    }
    
  }
 const handleReset = () =>{
   setA("");
   setB("");
   setC("");
    setResult(0);
    setUm(0);
    setDois(0);

    setShowModelComment(false);
    setanimateModal(false)
 }
const bodyTheme = () =>{
  if(isEnabled){
    return (
      <BodyBlack>
        <TextBlack>Coloque o valor do a:</TextBlack>
        <InputBlack
          placeholder="-1"
          placeholderTextColor="#b9b7b7"
          value={a}
          onChangeText={(e) => setA(e)}
        />
        <TextBlack>Coloque o valor do b:</TextBlack>
        <InputBlack
          value={b}
          placeholder="+4"
          placeholderTextColor="#b9b7b7"
          onChangeText={(e) => setB(e)}
        />
        <TextBlack>Coloque o valor do c:</TextBlack>
        <InputBlack
          placeholder="-3"
          placeholderTextColor="#b9b7b7"
          value={c}
          onChangeText={(e) => setC(e)}
        />
        <ButtonContainer>
          <ButtonBlack
            onPress={a || b || c ? handleCalcular : handleReset}
            activeOpacity={0.5}
          >
            <TextButtonBlack>Calcular</TextButtonBlack>
          </ButtonBlack>
          <ButtonBlack
            onPress={() => {
              handleReset();
            }}
            activeOpacity={0.5}
          >
            <TextButtonBlack>Resetar</TextButtonBlack>
          </ButtonBlack>
        </ButtonContainer>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-1277586617494646/9259440907"
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError}
        />

        <SwipeUpDownModal
          modalVisible={ShowComment}
          PressToanimate={animateModal}
          //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
          ContentModal={
            <BoxBlack>
              <TextBlack style={stylesBlack.title}>
                Valor do Delta: {result}
              </TextBlack>
              <TextBlack style={stylesBlack.title}>
                Valor do X1: {xum}
              </TextBlack>
              <TextBlack style={stylesBlack.title}>
                Valor do X2: {xdois}
              </TextBlack>
            </BoxBlack>
          }
          cont
          HeaderStyle={stylesBlack.headerContent}
          ContentModalStyle={stylesBlack.Modal}
          HeaderContent={
            <TextBlack style={stylesBlack.title}>Calculo</TextBlack>
          }
          onClose={() => {
            setShowModelComment(false);
            setanimateModal(false);
            handleReset();
          }}
        />
      </BodyBlack>
    );

  }else{
    return (
      <BodyLight>
        <TextLight>Coloque o valor do a:</TextLight>
        <InputLight
          placeholder="-1"
          placeholderTextColor="rgb(104, 104, 104)"
          value={a}
          onChangeText={(e) => setA(e)}
        />
        <TextLight>Coloque o valor do b:</TextLight>
        <InputLight
          placeholder="+4"
          placeholderTextColor="rgb(104, 104, 104)"
          value={b}
          onChangeText={(e) => setB(e)}
        />
        <TextLight>Coloque o valor do c:</TextLight>
        <InputLight
          placeholder="-3"
          placeholderTextColor="rgb(104, 104, 104)"
          value={c}
          onChangeText={(e) => setC(e)}
        />
        <ButtonContainer>
          <ButtonLight
            onPress={a || b || c ? handleCalcular : handleReset}
            activeOpacity={0.5}
          >
            <TextButtonLight>Calcular</TextButtonLight>
          </ButtonLight>
          <ButtonLight
            onPress={() => {
              handleReset();
            }}
            activeOpacity={0.5}
          >
            <TextButtonLight>Resetar</TextButtonLight>
          </ButtonLight>
        </ButtonContainer>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-1277586617494646/9259440907"
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={this.bannerError}
        />
        <SwipeUpDownModal
          modalVisible={ShowComment}
          PressToanimate={animateModal}
          //if you don't pass HeaderContent you should pass marginTop in view of ContentModel to Make modal swipeable
          ContentModal={
            <BoxLight>
              <TextLight style={styles.title}>
                Valor do Delta: {result}
              </TextLight>
              <TextLight style={styles.title}>Valor do X1: {xum}</TextLight>
              <TextLight style={styles.title}>Valor do X2: {xdois}</TextLight>
            </BoxLight>
          }
          cont
          HeaderStyle={styles.headerContent}
          ContentModalStyle={styles.Modal}
          HeaderContent={<TextLight style={styles.title}>Calculo</TextLight>}
          onClose={() => {
            setShowModelComment(false);
            setanimateModal(false);
            handleReset();
          }}
        />
      </BodyLight>
    );
  }
}
return (
bodyTheme()
);
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 405,
    backgroundColor: "#F5F5F5",
    borderBottomStartRadius: 10,
  },
  headerContent: {
    marginTop: 405,
  },
  paddingT: {
    marginTop: 10,
  },
  title: {
    borderTopColor: "#444",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
    marginBottom: 7,
  },
  Modal: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 405,
  },
});


const stylesBlack = StyleSheet.create({
  containerHeader: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 405,
    backgroundColor: "#161f2d",
    borderBottomStartRadius: 10,
  },
  headerContent: {
    marginTop: 405,
  },
  paddingT: {
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 23,
    marginBottom: 7,
    color:'#f5f5f5'
  },
  Modal: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#161f2d",
    marginTop: 405,
  },
});
