import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe from "../../hooks/useMe";

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const Data = styled.View``;
const Username = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  margin-top: 2px;
  font-weight: 500;
`;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;

export default function RoomItem({ users, unreadTotal, id }) {
  const { data: meData } = useMe();
  const navigation = useNavigation();
  const talkingTo = users.find(
    (user) => user.username !== meData?.me?.username
  );
  const goToRoom = () =>
    navigation.navigate("Room", {
      id,
      talkingTo,
    });

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.username}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal > 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
