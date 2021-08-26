import React from "react";
import { useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
`;
const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  font-size: 16px;
  margin-right: 17px;
`;

export default function SelectPhoto({ navigation }) {
  const { width } = useWindowDimensions();
  const numColumns = 4;
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");

  //사진가져오기
  const getPhotos = async () => {
    //if (ok) { //ok라는 state를 함수 내에서 접근하면 문제가 발생할 수 있다.
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0].uri);
    //}
  };
  //권한체크
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };

  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const HeaderRight = () => (
    <TouchableOpacity>
      <HeaderRightText> Next </HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: width }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
