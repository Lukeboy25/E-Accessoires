import React, { FC, ReactElement } from 'react';
import {
  View, StyleSheet, TextInput,
} from 'react-native';

interface SearchBarProps {
  searchValue: string;
  orderCategories: string[];
}

const SearchBar: FC<SearchBarProps> = ({ searchValue}): ReactElement => {
  const onValueChange = (value: string) => {
    
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        selectionColor="grey"
        onChangeText={onValueChange}
        value={searchValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
  },
  searchInput: {
    height: 40,
    margin: 12,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 2,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchBar;
