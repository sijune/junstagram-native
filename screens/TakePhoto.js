import { Camera } from "expo-camera";
import { CameraType, FlashMode } from "expo-camera/build/Camera.types";
import React from "react";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  justify-content: space-around;
  padding: 0px 50px;
  align-items: center;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SliderContainer = styled.View``;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  border: 2px solid rgba(255, 255, 255, 0.8);
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 30px;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);

  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onZoomValueChange = (e) => {
    setZoom(e);
  };

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const photo = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
    }
  };
  const onCameraReady = () => setCameraReady(true);
  return (
    <Container>
      <StatusBar hidden={true} />
      <Camera
        type={cameraType}
        style={{ flex: 1 }}
        zoom={zoom}
        flashMode={flashMode}
        ref={camera}
        onCameraReady={onCameraReady}
      >
        <CloseButton onPress={() => navigation.navigate("Tabs")}>
          <Ionicons name="close" color="white" size={30} />
        </CloseButton>
      </Camera>
      <Actions>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 20 }}
            minimumValue={0}
            maximumValue={0.5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
        <ButtonsContainer>
          <TouchableOpacity onPress={onFlashChange}>
            <Ionicons
              color="white"
              size={30}
              name={
                flashMode === Camera.Constants.FlashMode.off
                  ? "flash-off"
                  : flashMode === Camera.Constants.FlashMode.on
                  ? "flash"
                  : flashMode == Camera.Constants.FlashMode.auto
                  ? "eye"
                  : ""
              }
            />
          </TouchableOpacity>
          <TakePhotoBtn onPress={takePhoto} />
          <TouchableOpacity onPress={onCameraSwitch}>
            <Ionicons
              color="white"
              size={30}
              name={
                cameraType === Camera.Constants.Type.front
                  ? "camera-reverse"
                  : "camera"
              }
            />
          </TouchableOpacity>
        </ButtonsContainer>
      </Actions>
    </Container>
  );
}
