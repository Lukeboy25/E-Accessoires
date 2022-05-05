import React, {
  FC, 
  ReactElement, 
  useEffect, 
  useRef, 
  useState,
} from 'react';
import { SafeAreaView, View } from 'react-native';
import useHandleClickOutside from '../../hooks/useHandleClickOutside';
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
  const defaultFocusIndex = -1;

  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchableOption[]>([]);
  const [focusIndex, setFocusIndex] = useState<number>(defaultFocusIndex);

  const searchableValueInputRef = useRef<HTMLDivElement>(null);
  const resultListRef = useRef<HTMLUListElement>(null);

  const clearResults = (): void => {
    setSearchResults([]);
    setFocusIndex(defaultFocusIndex);
  };

  useHandleClickOutside(searchableValueInputRef, clearResults);

  useEffect((): void => {
    if (resultListRef.current && focusIndex >= 0) {
      const buttons = resultListRef.current.querySelectorAll('button');
      buttons[focusIndex].focus();
    }
  }, [focusIndex, resultListRef]);

  const handleChange = (value: string): void => {
    onChange(createCustomOption(value));

    if (isSearchable) {
      setQuery(value);
      setSearchResults(searchOptionsOnQuery(options, value, resultLimit));
      setFocusIndex(defaultFocusIndex);
    }
  };

  const handleClick = (option: SearchableOption): void => {
    onChange(option);
    clearResults();
  };

  return (
    <SafeAreaView style={styles['searchable-value-input']}>
      <View style={styles['searchable-value-input']}>
        <SearchInput
          {...inputProps}
          onChange={handleChange}
          className={inputClassName}
          onDeleteIconPress={onDeleteIconPress}
        />

        {searchResults.length > 0 && (
          <View ref={() => resultListRef} style={styles[`searchable-value-input__result-list ${listClassName}`]}>
            {searchResults.map((option) => (
              <SearchableValueInputOption
                key={option.id}
                option={option}
                query={query}
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
