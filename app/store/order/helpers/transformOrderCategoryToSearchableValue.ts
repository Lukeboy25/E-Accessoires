import { SearchableOption } from '../../../compositions/types/index';

export const transformOrderCategoriesToSearchableValue = (value: string, index: string): SearchableOption => ({ id: index, label: value });
