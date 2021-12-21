import React, {
    useEffect,
    useState,
} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Pagination = ({
    onPageChange,
    page,
    totalPages = 1,
}) => {
    useEffect(() => {
        onPageChange(page);
    }, [totalPages, page]);

    const onNextClick = () => onPageChange(page + 1);
    const onPrevClick = () => onPageChange(page - 1);
    
    return (
        <View style={styles.pagination}>
            {page > 1 &&
                <View style={styles.leftArrowContainer}>
                    <MaterialIcons
                        style={styles.previousIcon}
                        onPress={onPrevClick}
                        name='keyboard-arrow-left'
                        color={'black'}
                        size={30}
                    />
                    <Text>{page - 1}</Text>
                 </View>
            }
            {totalPages > page &&
                <View style={styles.rightArrowContainer}>
                    <Text onPress={onNextClick} style={styles.nextText}>{page + 1}</Text>
                    <MaterialIcons
                        style={styles.nextIcon}
                        onPress={onNextClick}
                        name='keyboard-arrow-right'
                        color={'black'}
                        size={30}
                    />
                </View> 
            }
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
        flex: 1,
    },
    leftArrowContainer: {
        flexDirection: 'row',
    },
    previousIcon: {
    },
    rightArrowContainer: {
        marginLeft: 'auto',
        alignSelf: 'flex-end',
        flexDirection: 'row',
    },  
    nextText: {
        justifyContent: 'center',
    },
    nextIcon: {
        alignItems: 'center',
    }
});

export default Pagination;
