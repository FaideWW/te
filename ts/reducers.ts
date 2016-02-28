/**
 * Created by faide on 2016-02-27.
 */

import { CaretPosition, caret } from './actions.ts';
import { ADD_ROW, REM_ROW, ADD_CHARS, REM_CHARS, MOVE_CARET, MARK_SEL_START, UNMARK_SEL_START } from "./actions.ts";


interface State {}

export interface EditorState extends State {
    caret: CaretPosition;
    selectStart: CaretPosition;
    rows: Array<string>;
}

export const initialState : EditorState = {
    caret: caret(),
    selectStart: null,
    rows: [''],
};

export function editorApp(state : EditorState = initialState, action) : EditorState {
    let { row, offset } = caret();
    console.log(action.type);
    switch (action.type) {
        case ADD_ROW:
            return {
                caret: {
                    row: state.caret.row + 1,
                    offset: 0
                },
                selectStart: state.selectStart,
                rows: [ ...state.rows.slice(0, action.index), '', ...state.rows.slice(action.index) ],
            };
        case REM_ROW:
            return {
                caret: {
                    row: state.caret.row - 1,
                    offset: state.rows[action.index - 1].length
                },
                selectStart: state.selectStart,
                rows: [ ...state.rows.slice(0, action.index), ...state.rows.slice(action.index + 1) ],
            };
        case ADD_CHARS:
            row = action.position.row;
            offset = action.position.offset;
            return {
                caret: caret(state.caret.row, offset + action.str.length),
                selectStart: state.selectStart,
                rows: [
                    ...state.rows.slice(0, row),
                    state.rows[row].slice(0, offset) + action.str + state.rows[row].slice(offset),
                    ...state.rows.slice(row + 1),
                ],
            };
        case REM_CHARS:
            row = action.position.row;
            offset = action.position.offset;
            return {
                caret: caret(state.caret.row, Math.max(0, offset - action.count)),
                selectStart: state.selectStart,
                rows: [
                    ...state.rows.slice(0, row),
                    state.rows[row].slice(0, offset - action.count) + state.rows[row].slice(offset),
                    ...state.rows.slice(row + 1),
                ],
            };
        case MOVE_CARET:
            return {
                caret: action.caret,
                selectStart: state.selectStart,
                rows: state.rows,
            };
        case MARK_SEL_START:
            return {
                caret: state.caret,
                selectStart: caret(state.caret.row, state.caret.offset),
                rows: state.rows
            };
        case UNMARK_SEL_START:
            return {
                caret: state.caret,
                selectStart: null,
                rows: state.rows
            };
        default:
            return state;
    }
}