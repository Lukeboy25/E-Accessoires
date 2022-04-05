import React, {
  forwardRef, ForwardRefExoticComponent, ReactElement, RefAttributes,
} from 'react';
import {
  View, Text, TextInput,
} from 'react-native';
import { SearchIcon } from '../../components/icons';
import { HTMLInputProps } from '../../components/Input/Input';

import styles from './SearchInput.scss';

export interface SearchInputProps extends Omit<HTMLInputProps, 'onChange'> {
  value: string;
  label: string;
  hideLabel?: boolean;
  icon?: string;
  hideIcon?: boolean;
  onChange: (value: string) => void;
  className?: string;
}

type SearchInputWithRefProps = SearchInputProps & RefAttributes<HTMLInputElement>;

const SearchInput: ForwardRefExoticComponent<SearchInputWithRefProps> = forwardRef(({
  value,
  label,
  hideLabel = false,
  hideIcon = false,
  onChange,
  className = '',
}): ReactElement => {
  const handleChange = (value2: string) => {
    onChange(value2);
  };

  return (
    <View aria-label={hideLabel ? label : undefined} style={styles[`search-input ${className}`]}>
      {!hideLabel && <Text>{label}</Text>}

      <View style={styles['search-input__wrapper']}>
        {!hideIcon && (
        <View style={styles['search-input__icon-wrapper']}>
          <SearchIcon className="search-input__icon" />
        </View>
        )}

        <TextInput value={value} onChangeText={handleChange} style={styles['search-input__input']} />
      </View>
    </View>
  );
});

export default SearchInput;
