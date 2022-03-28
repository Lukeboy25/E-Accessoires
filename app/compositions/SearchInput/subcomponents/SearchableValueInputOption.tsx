import React, { FC, ReactElement } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { generateQueryHighlight } from '../../../helpers/string';
import { SearchableOption } from '../../types';

import styles from './SearchableValueInputOption.scss';

interface SearchableValueInputOptionProps {
    option: SearchableOption;
    query?: string;
    onSelect: (fieldOfStudy: SearchableOption) => void;
    className?: string;
}

const SearchableValueInputOption: FC<SearchableValueInputOptionProps> = ({
  option,
  query,
  onSelect,
  className = '',
}): ReactElement => {
  const [labelStart, labelHighlight, labelEnd] = generateQueryHighlight(option.label, query);

  const handleClick = (): void => onSelect(option);

  return (
    <View style={styles[`searchable-value-input-option ${className}`]}>
      <TouchableOpacity
        onPress={handleClick}
        style={styles['searchable-value-input-option__button']}
      >
        {query ? (
          <Text style={styles['searchable-value-input-option__label']}>
            {labelStart}
            <Text style={styles['searchable-value-input-option__query']}>
              {labelHighlight}
            </Text>
            {labelEnd}
          </Text>
        ) : (
          <Text style={styles['searchable-value-input-option__label']}>
            {option.label}
          </Text>
        )}

        {option.secondaryLabel && (
        <Text style={styles['searchable-value-input-option__secondary-label']}>
          {option.secondaryLabel}
        </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchableValueInputOption;
