// eslint-disable-next-line import/no-extraneous-dependencies
import { ViewUpdate } from '@codemirror/view';

export interface Statistics {
  /** Get the number of lines in the editor. */
  lineCount: number;
  /** total length of the document */
  length: number;
}
export declare const getStatistics: (view: ViewUpdate) => Statistics;
