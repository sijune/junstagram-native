import { gql, useLazyQuery } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import styled from "styled-components/native";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessagingContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const MessagingText = styled.Text`
  font-weight: 600;
  margin-top: 15px;
`;
const Input = styled.TextInput`
  background-color: rgb(219, 219, 219);
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
  color: black;
`;

export default function Search({ navigation }) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS); //첫 번째 인자는 trigger 역할
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="gray"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyType="search"
      returnKeyLabel="Search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 2,
    });
  }, []);
  const renderItem = ({ item: photo }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SearchPhoto", { photoId: photo.id })
        }
      >
        <Image
          source={{ uri: photo.file }}
          style={{ width: width / numColumns, height: width / numColumns }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        {loading ? (
          <MessagingContainer>
            <ActivityIndicator size="large" />
            <MessagingText>Searching...</MessagingText>
          </MessagingContainer>
        ) : null}
        {/* 검색했는지 안했는지 구분 */}
        {!called ? (
          <MessagingContainer>
            <MessagingText>Search by keyword</MessagingText>
          </MessagingContainer>
        ) : null}
        {/* 데이터 없는 경우 */}
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessagingContainer>
              <MessagingText>Search by keyword</MessagingText>
            </MessagingContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchPhotos}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
