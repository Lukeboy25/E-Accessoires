import React, {
    FC,
    ReactElement,
    useRef,
    useState,
} from 'react';

import { SafeAreaView, View } from 'react-native';

import SearchInput, { SearchInputProps } from '../SearchInput/SearchInput';
import SearchableValueInputOption from '../SearchInput/subcomponents/SearchableValueInputOption';
import { SearchableOption } from '../types';
import { createCustomOption, searchOptionsOnQuery } from './helpers';

// @ts-ignore
import styles from './SearchableValueInput.scss';

interface SearchableValueInputProps extends Omit<SearchInputProps, 'onChange'> {
    isSearchable?: boolean;
    options: SearchableOption[];
    resultLimit?: number;
    onChange: (option: SearchableOption) => void;
    inputClassName?: string;
    inputWrapperClassName?: string;
    listClassName?: string;
    onDeleteIconPress: () => void;
}

const SearchableValueInput: FC<SearchableValueInputProps> = ({
    isSearchable,
    options,
    resultLimit = 10,
    onChange,
    inputClassName = '',
    listClassName = '',
    onDeleteIconPress,
    ...inputProps
}): ReactElement => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<SearchableOption[]>([]);

    const resultListRef = useRef<HTMLUListElement>(null);

    const handleChange = (value: string): void => {
        onChange(createCustomOption(value));

        if (isSearchable) {
            setSearchQuery(value);
            setSearchResults(searchOptionsOnQuery(options, value, resultLimit));
        }
    };

    const handleClick = (option: SearchableOption): void => {
        onChange(option);
        setSearchResults([]);
    };

    const handleDeleteIconPress = () => {
        if (searchQuery !== '') {
            setSearchResults([]);
            setSearchQuery('');
            onDeleteIconPress();
        }
    };

    return (
        <SafeAreaView style={styles['searchable-value-input']}>
            <View style={styles['searchable-value-input']}>
                <SearchInput
                    {...inputProps}
                    onChange={handleChange}
                    className={inputClassName}
                    onDeleteIconPress={handleDeleteIconPress}
                />

                {searchResults.length > 0 && (
                    <View ref={() => resultListRef} style={styles[`searchable-value-input__result-list ${listClassName}`]}>
                        {searchResults.map((option) => (
                            <SearchableValueInputOption
                                key={option.id}
                                option={option}
                                searchQuery={searchQuery}
                                onSelect={handleClick}
                                className="searchable-value-input__result-option"
                            />
                        ))}
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SearchableValueInput;
