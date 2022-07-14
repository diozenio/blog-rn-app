import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

const Home = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<FormData>([]);
  async function handleFetchCards() {
    try {
      var response = await AsyncStorage.getItem("@blog:messages");
      const data = response ? JSON.parse(response) : {};
      setMessages(data);
      console.log(messages);
      
    } catch (e) {
      console.log("Erro no fetch");
      console.log(e);
    }
  }

  useEffect(() => {
    handleFetchCards();
  }, []);
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Tweet"
        onPress={() => navigation.navigate("CreateMessage")}
      />
    </View>
  );
};

export default Home;
