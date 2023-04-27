/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from 'react';

const mergeRefs = (...refs: any[]) => (node: any) => {
  refs.forEach((ref) => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref !== null) {
      ref.current = node;
    } else {

    }
  });
};

const useMergeRefs = (...refs: any[]) => useMemo(() => mergeRefs(...refs), refs);

export { mergeRefs };
export default useMergeRefs;
