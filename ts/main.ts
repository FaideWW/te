/**
 * Created by faide on 2016-02-27.
 */

import '../css/normalize.css';
import '../css/skeleton.css';
import '../scss/main.scss'

import { createStore } from 'redux';
import { EditorState, initialState, editorApp } from './reducers.ts';
import { caret, addRow, removeRow, addChars, removeChars, moveCaret, markSelectionStart, unmarkSelectionStart} from "./actions.ts";
import { typeableKeys, untypeableKeys } from './keycodes.ts';


const store = createStore(editorApp, initialState);

store.subscribe(() => {
    console.log(store.getState().rows);
    renderEditor(store.getState());
});

const editorElement = document.getElementById('editor');

window.onkeydown = (e) => {
    const state = store.getState();
    const key = e.which;
    if (!untypeableKeys[key]) {
        let char = String.fromCharCode(key);

        if (e.shiftKey) {
            if (typeableKeys.shift[key]) {
                char = typeableKeys.shift[key];
            }
        } else {
            if (typeableKeys[key]) {
                char = typeableKeys[key];
            } else {
                char = char.toLowerCase();
            }
        }

        store.dispatch(addChars(state.caret, char));
    } else if (untypeableKeys[key]) {
        switch(untypeableKeys[key]) {
            case 'BACKSPACE':
                console.log(state.caret.offset);
                if (state.caret.offset === 0 && state.caret.row > 0) {
                    store.dispatch(removeRow(state.rows.length - 1));
                } else {
                    store.dispatch(removeChars(state.caret, 1));
                }
                e.preventDefault();
                break;
            case 'ENTER':
                store.dispatch(addRow(state.rows.length));
            default:
                break;
        }
    }
};

function renderEditor(state : EditorState) : void {
    const html = state.rows.reduce((html, row, rowNum) => html + `<p>
        ${(state.caret.row === rowNum ?
            (row.slice(0, state.caret.offset) + '<span class="caret-marker"></span>' + row.slice(state.caret.offset)) :row)
        || '&nbsp;'}
    </p>`);
    console.log(html);
    editorElement.innerHTML = html;
}

renderEditor(store.getState());