import React, {
    useEffect,
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
                        color={'white'}
                        size={30}
                    />
                    <Text onPress={onPrevClick} style={styles.paginateText}>{page - 1}</Text>
                 </View>
            }
            {totalPages > page &&
                <View style={styles.rightArrowContainer}>
                    <Text onPress={onNextClick} style={styles.paginateText}>{page + 1}</Text>
                    <MaterialIcons
                        style={styles.nextIcon}
                        onPress={onNextClick}
                        name='keyboard-arrow-right'
                        color={'white'}
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
    }
});

export default Pagination;
