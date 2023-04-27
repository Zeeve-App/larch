import { useState } from 'react';

export type CopyContent = string | null;
export type CopyFn = (text: string) => Promise<boolean>;

const useCopyToClipboard = (): [CopyContent, CopyFn] => {
  const [copiedText, setCopiedText] = useState<CopyContent>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      throw new Error('Clipboard not supported');
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
};

export default useCopyToClipboard;
