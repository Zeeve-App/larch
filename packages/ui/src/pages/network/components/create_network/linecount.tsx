import { EditorSelection, SelectionRange } from '@codemirror/state';
import { ViewUpdate } from '@codemirror/view';
export interface Statistics {
  /** Get the number of lines in the editor. */
  lineCount: number;
  /** total length of the document */
  length: number;
  /** Get the proper [line-break](https://codemirror.net/docs/ref/#state.EditorState^lineSeparator) string for this state. */
 
}
export declare const getStatistics: (view: ViewUpdate) => Statistics;
