import { useMediaQuery } from '.';

const useCompact = (compact?: boolean): boolean => (compact !== undefined ? compact : useMediaQuery('(max-width: 768px)'));

export default useCompact;
