import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function LogIn({ navigation }) {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
  };
  useEffect(() => {
    register("username");
    register("password");
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        placeholderTextColor="gray"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => setValue("username", text)} //useEffect에 있는 변수와 이름이 일치해야 함
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="gray"
        returnKeyType="done"
        last={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)} //useEffect에 있는 변수와 이름이 일치해야 함
      />
      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}
