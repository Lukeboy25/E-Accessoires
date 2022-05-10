import React, {
  forwardRef, 
  ForwardRefExoticComponent,
  ReactElement, 
  RefAttributes,
} from 'react';
import { View, Text, TextInput } from 'react-native';
import { DeleteIcon } from '../../components/icons';
import { HTMLInputProps } from '../../components/Input/Input';

// @ts-ignore
import styles from './SearchInput.scss';

export interface SearchInputProps extends Omit<HTMLInputProps, 'onChange'> {
  value: string;
  label: string;
  onChange: (value: string) => void;
  className?: string;
  onDeleteIconPress: () => void;
}

type SearchInputWithRefProps = SearchInputProps & RefAttributes<HTMLInputElement>;

const SearchInput: ForwardRefExoticComponent<SearchInputWithRefProps> = forwardRef(({
  value,
  label,
  onChange,
  className = '',
  onDeleteIconPress,
}): ReactElement => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <View aria-label={label} style={styles[`search-input ${className}`]}>
      <View style={styles['search-input__wrapper']}>
        <TextInput placeholder={label} value={value} onChangeText={handleChange} style={styles['search-input__input']} />
        <DeleteIcon onPress={onDeleteIconPress} style={{ padding: 20, marginVertical: 5, }} />
      </View>
    </View>
  );
});

export default SearchInput;
