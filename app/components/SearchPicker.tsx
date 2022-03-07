import React, { FC, ReactElement, useState } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

interface SearchPickerProps {
  searchValue: string;
  orderCategories: string[];
}

const SearchPicker: FC<SearchPickerProps> = ({ orderCategories }): ReactElement => {
  const [selectedOption, setSelectedOption] = useState('Kies een categorie');

  const transformOrderCategoriesToItems = () => orderCategories.map((orderCategory: string, index: number) => ({ id: index, name: orderCategory }));

  return (
    <View style={styles.searchBar}>
      <SearchableDropdown
        onItemSelect={(item) => {
          const items = orderCategories;
          items.push(item);
          useState({ selectedItems: items });
        }}
        containerStyle={{ padding: 5 }}
        onRemoveItem={(item, index) => {
          const items = orderCategories.filter((sitem) => sitem.id !== item.id);
          useState({ selectedItems: items });
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        // itemsContainerStyle={{ maxHeight: 140 }}
        items={transformOrderCategoriesToItems()}
        defaultIndex={2}
        resetValue={false}
        textInputProps={
              {
                placeholder: 'Zoek op categorie',
                underlineColorAndroid: 'transparent',
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },
                onTextChange: (text) => alert(text),
              }
            }
        listProps={
              {
                nestedScrollEnabled: true,
              }
            }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    display: 'flex',
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});

export default SearchPicker;
