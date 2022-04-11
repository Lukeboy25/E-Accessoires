import React, {
  forwardRef, ForwardRefExoticComponent, ReactElement, RefAttributes,
} from 'react';
import {
  View, Text, TextInput,
} from 'react-native';
import { DeleteIcon, SearchIcon } from '../../components/icons';
import { HTMLInputProps } from '../../components/Input/Input';

// @ts-ignore
import styles from './SearchInput.scss';

export interface SearchInputProps extends Omit<HTMLInputProps, 'onChange'> {
  value: string;
  label: string;
  hideLabel?: boolean;
  icon?: string;
  hideIcon?: boolean;
  onChange: (value: string) => void;
  className?: string;
  onDeleteIconPress: () => void;
}

type SearchInputWithRefProps = SearchInputProps & RefAttributes<HTMLInputElement>;

const SearchInput: ForwardRefExoticComponent<SearchInputWithRefProps> = forwardRef(({
  value,
  label,
  hideLabel = false,
  hideIcon = false,
  onChange,
  className = '',
  onDeleteIconPress,
}): ReactElement => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <View aria-label={hideLabel ? label : undefined} style={styles[`search-input ${className}`]}>
      {!hideLabel && <Text>{label}</Text>}

      <View style={styles['search-input__wrapper']}>
        <TextInput value={value} onChangeText={handleChange} style={styles['search-input__input']} />
        <DeleteIcon onPress={onDeleteIconPress} style={{ padding: 20, marginVertical: 5, }} />
      </View>
    </View>
  );
});

export default SearchInput;
