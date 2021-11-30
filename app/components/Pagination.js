import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';;
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Pagination = ({
    page,
    onPreviousPage,
    onNextPage,
}) => {
    console.log(page);
    const [pageNumber, setPageNumber] = useState(page);
    
    const onPreviousClick = () => {
        setPageNumber(pageNumber - 1);
        onPreviousPage();
    }

    const onNextClick = () => {
        setPageNumber(pageNumber + 1);
        onNextPage();
    }

  return (
    <View style={styles.pagination}>
        { page > 1 && 
            <MaterialIcons
            style={styles.previousIcon} 
            onPress={() => onPreviousClick()} 
            name='keyboard-arrow-left' 
            color={'black'} 
            size={30} 
            />
        }
        <MaterialIcons
          style={styles.nextIcon} 
          onPress={() => onNextClick()} 
          name='keyboard-arrow-right' 
          color={'black'} 
          size={30} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  previousIcon: {
  },
  nextIcon: {
    marginLeft: 'auto',
    alignSelf: 'flex-end',
  }
});

export default Pagination;
