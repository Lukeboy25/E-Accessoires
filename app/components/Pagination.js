import React, {
    useEffect,
    useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Pagination = ({
    onPageChange,
    defaultPage = 1,
    totalPages = 1,
}) => {
    const [page, setPage] = useState(defaultPage);

    useEffect(() => {
        onPageChange(page);
    }, [page]);

    const onNextClick = () => setPage(page + 1);
    const onPrevClick = () => setPage(page - 1);

    return (
        <View style={styles.pagination}>
            {page > 1 &&
                <MaterialIcons
                    style={styles.previousIcon}
                    onPress={onPrevClick}
                    name='keyboard-arrow-left'
                    color={'black'}
                    size={30}
                />
            }
            {totalPages > page && 
                <MaterialIcons
                    style={styles.nextIcon}
                    onPress={onNextClick}
                    name='keyboard-arrow-right'
                    color={'black'}
                    size={30}
                />
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
    },
    previousIcon: {
    },
    nextIcon: {
        marginLeft: 'auto',
        alignSelf: 'flex-end',
    }
});

export default Pagination;
