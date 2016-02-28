/**
 * Created by faide on 2016-02-27.
 */

export const ADD_CHARS : string = 'ADD_CHARS';
export const REM_CHARS : string = 'REM_CHARS';
export const MOVE_CARET : string = 'MOVE_CARET';
export const MARK_SEL_START : string = 'MARK_SEL_START';
export const UNMARK_SEL_START : string = 'UNMARK_SEL_START';

export const ADD_ROW : string = 'ADD_ROW';
export const REM_ROW : string = 'REM_ROW';

export interface CaretPosition {
    row : number;
    offset : number;
}

export function caret(row : number = 0, offset : number = 0) : CaretPosition {
    return { row, offset };
}

export function addChars(position : CaretPosition, str : string) {
    return { type: ADD_CHARS, position, str };
}

export function removeChars(position : CaretPosition, count  : number) {
    return { type: REM_CHARS, position, count };
}

export function moveCaret(position : CaretPosition) {
    return { type: MOVE_CARET, position };
}

export function markSelectionStart(position : CaretPosition) {
    return { type: MARK_SEL_START, position };
}

export function unmarkSelectionStart() {
    return { type: UNMARK_SEL_START };
}

export function addRow(index : number) {
    return { type: ADD_ROW, index };
}

export function removeRow(index : number) {
    return { type: REM_ROW, index };
}