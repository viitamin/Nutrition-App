import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from "react-native";

import foodName from "../FoodName";

export default function Search({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (text) => {
    const filteredData = foodName.filter((item) => {
      return item.name.includes(text);
    });
    console.log(filteredData);
    setSearchText(text);
    setSearchResult(filteredData);
  };

  const handleTouch = (item) => {
    setSearchText(item.name);
    setSearchResult(item);
  };

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder={"찾으시는 음식을 입력하세요"}
        value={searchText}
        onChangeText={handleSearch}
      />

      <FlatList
        style={styles.flatList}
        data={searchResult}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTouch(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title={"확인"}
        onPress={() => {
          navigation.navigate("SearchAnalyzer", { item: searchResult.key });
          console.log(searchResult.key);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    height: 300,
  },
  searchBar: {
    fontSize: 20,
  },
});
