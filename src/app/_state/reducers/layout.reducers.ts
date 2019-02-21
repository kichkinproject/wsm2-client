import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';
import { Role } from '../../models/role';

export interface State {
  layoutLoaded: boolean;
  config: any;
  header: string;
  current_user: Role;
}

export const initialState: State = {
  layoutLoaded: false,
  config: null,
  header: 'Менеджер сценариев',
  current_user: null,
};

export function reducer(state = initialState, action: LayoutActions): State {
  switch (action.type) {
    case LayoutActionTypes.LayoutAction: {
      return state;
    }

    case LayoutActionTypes.LayoutSetConfig: {
      return { ...state, config: action.payload };
    }

    case LayoutActionTypes.LayoutLoaded: {
      return { ...state, layoutLoaded: true };
    }

    case LayoutActionTypes.LayoutSetHeader: {
      return { ...state, header: action.payload };
    }

    case LayoutActionTypes.LayoutSetUser: {
      return { ...state, current_user: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const GetConfig = (state: State) => state.config;
export const GetLoaded = (state: State) => state.layoutLoaded;
export const GetCurrentUser = (state: State) => state.current_user;
export const GetHeader = (state: State) => state.header;
