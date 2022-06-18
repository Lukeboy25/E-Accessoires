import { FC, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages = 1,
  onPageChange,
}) => {
  useEffect(() => {
    onPageChange(currentPage);
  }, [totalPages, currentPage]);

  const onNextClick = () => onPageChange(currentPage + 1);
  const onPrevClick = () => onPageChange(currentPage - 1);

  return (
    <View style={styles.pagination}>
      {currentPage > 1
        && (
        <View style={styles.leftArrowContainer}>
          <MaterialIcons
            style={styles.previousIcon}
            onPress={onPrevClick}
            name="keyboard-arrow-left"
            color="white"
            size={30}
          />
          <Text onPress={onPrevClick} style={styles.paginateText}>{currentPage - 1}</Text>
        </View>
        )}
      {totalPages > currentPage
        && (
        <View style={styles.rightArrowContainer}>
          <Text onPress={onNextClick} style={styles.paginateText}>{currentPage + 1}</Text>
          <MaterialIcons
            style={styles.nextIcon}
            onPress={onNextClick}
            name="keyboard-arrow-right"
            color="white"
            size={30}
          />
        </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  leftArrowContainer: {
    flexDirection: 'row',
    width: 50,
    backgroundColor: '#2194f3',
    borderRadius: 25,
    paddingRight: 10,
  },
  rightArrowContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    width: 50,
    backgroundColor: '#2194f3',
    borderRadius: 25,
    paddingLeft: 10,
  },
  paginateText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#fff',
  },
  previousIcon: {
    flex: 1,
  },
  nextIcon: {
    flex: 1,
  },
});

export default Pagination;
