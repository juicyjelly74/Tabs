import { Action } from 'redux';
import { CHANGE_SHARED_TEXT_ACTION } from '../constants';

export interface ChangeSharedTextAction extends Action { type: typeof CHANGE_SHARED_TEXT_ACTION, text: string }

export type KnownAction = ChangeSharedTextAction;