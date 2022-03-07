import React, {
  FC, ReactElement, useState,
} from 'react';
import {
  View, StyleSheet, Text, SafeAreaView,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

interface SearchPickerProps {
  searchValue: string;
  orderCategories: string[];
}

const SearchPicker: FC<SearchPickerProps> = ({ orderCategories }): ReactElement => {
  const [searchValueState, setSearchValueState] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const transformOrderCategoriesToItems = () => orderCategories.map((orderCategory: string, index: number) => ({ id: index, name: orderCategory }));

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.container}>
        <SearchableDropdown
          onItemSelect={(item) => alert(JSON.stringify(item))}
          containerStyle={{ padding: 10 }}
          onRemoveItem={(item, index) => {
            const items = selectedItems.filter((sitem) => sitem.id !== item.id);
            setSelectedItems(items);
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#fff',
            borderColor: '#fff',
            borderRadius: 3,
          }}
          itemTextStyle={{ color: '#222' }}
        // itemsContainerStyle={{ maxHeight: 140 }}
          items={transformOrderCategoriesToItems()}
          defaultIndex={2}
          resetValue={false}
          textInputProps={
              {
                placeholder: 'Zoek op categorie',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: 'white',
                  borderRadius: 5,
                },
                onTextChange: (text) => setSearchValueState(text),
              }
            }
          listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    paddingVertical: 10,
  },
});

export default SearchPicker;
