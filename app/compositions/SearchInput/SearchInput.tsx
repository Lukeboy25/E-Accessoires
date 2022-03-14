import React, {
  ChangeEvent,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
} from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { SearchIcon } from '../../components/icons';
import { HTMLInputProps } from '../../components/Input/Input';

import styles from './SearchInput.scss';

export interface SearchInputProps extends Omit<HTMLInputProps, 'onChange'> {
    label: string;
    hideLabel?: boolean;
    icon?: string;
    hideIcon?: boolean;
    onChange: (value: string) => void;
    className?: string;
}

type SearchInputWithRefProps = SearchInputProps & RefAttributes<HTMLInputElement>;

const SearchInput: ForwardRefExoticComponent<SearchInputWithRefProps> = forwardRef(({
  label,
  hideLabel = false,
  hideIcon = false,
  onChange,
  className = '',
  ...inputProps
}): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => (
    onChange(event.currentTarget.value)
  );

  return (
    <View
      aria-label={hideLabel ? label : undefined}
      style={styles[`search-input ${className}`]}
    >
      {!hideLabel && (
        <Text>
            {label}
        </Text>
      )}

      <View style={styles['search-input__wrapper']}>
        {!hideIcon && (
        <View style={styles['search-input__icon-wrapper']}>
          <SearchIcon className="search-input__icon" />
        </View>
        )}

        <TextInput
          onChange={() => handleChange}
          style={styles['search-input__input']}
        />
      </View>
    </View>
  );
});

export default SearchInput;
