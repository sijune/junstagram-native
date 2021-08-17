import React from "react";
import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 100%;
  height: 100px;
`;

const CreateAccount = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 13px 10px;
  margin-top: 20px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <CreateAccount
        disabled={false}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <CreateAccountText>Create New Account</CreateAccountText>
      </CreateAccount>
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </Container>
  );
}
