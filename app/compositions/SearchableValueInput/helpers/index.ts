import { retrieveUniqueValues } from '../../../helpers/array';
import { SearchableOption } from '../../types';

export const createCustomOption = (label: string): SearchableOption => ({ id: '', label });

export const searchOptionsOnQuery = (options: SearchableOption[], query: string, limit: number): SearchableOption[] => {
  try {
    if (query === '') return [];

    const cleanQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const searchQuery = new RegExp(cleanQuery, 'i');

    const labelResults = options.filter((item) => item.label.match(searchQuery))
      .sort((result, comparisonResult) => {
        const queryIndex = result.label.toLowerCase().indexOf(cleanQuery.toLowerCase());
        const comparisonQueryIndex = comparisonResult.label.toLowerCase().indexOf(cleanQuery.toLowerCase());

        return queryIndex - comparisonQueryIndex;
      });
    const secondaryLabelResults = options.filter((item) => item?.secondaryLabel?.match(searchQuery));

    const combinedResults = retrieveUniqueValues([...labelResults, ...secondaryLabelResults]);

    return combinedResults.slice(0, limit);
  } catch {
    return [];
  }
};
