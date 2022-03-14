import React, { FC, ReactElement } from 'react';
import { Button, FlatList, StyleSheet } from 'react-native';
import { generateQueryHighlight } from '../../../helpers/string';
import { SearchableOption } from '../../types';

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
    <FlatList style={styles[`searchable-value-input-option ${className}`]}>
      <Button
        title={option.label}
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
      </Button>
    </FlatList>
  );
};

const styles = StyleSheet.create({
  'searchable-value-input-option__button': {
  },
});

export default SearchableValueInputOption;
