export const generateQueryHighlight = (label: string, query?: string): [string, string, string] => {
  if (!query) return [label, '', ''];

  const cleanLabel = label.toLowerCase();
  const cleanQuery = query.toLowerCase();

  const [start = ''] = cleanLabel.split(cleanQuery);
  const startIndex = start.length;
  const endIndex = start.length + query.length;

  return [
    label.slice(0, startIndex),
    label.slice(startIndex, endIndex),
    label.slice(endIndex),
  ];
};
