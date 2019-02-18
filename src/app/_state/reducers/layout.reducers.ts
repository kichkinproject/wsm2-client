import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';
import { ToLink } from '../../models/to-link';
import { Role } from '../../models/role';
import { ThemeType } from '../../models/theme';

export interface State {
  layoutLoaded: boolean;
  config: any;
  header: string;
  current_user: Role;
  theme: string;
  goBack: ToLink;
  goNext: ToLink;
}

export const initialState: State = {
  layoutLoaded: false,
  config: null,
  header: 'Менеджер сценариев',
  current_user: null,
  theme: ThemeType.LIGHT,
  goBack: null,
  goNext: null
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

    case LayoutActionTypes.LayoutSetTheme: {
      return { ...state, theme: action.payload };
    }

    case LayoutActionTypes.LayoutSetGoBack: {
      return { ...state, goBack: action.payload };
    }

    case LayoutActionTypes.LayoutSetGoNext: {
      return { ...state, goNext: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const GetConfig = (state: State) => state.config;
export const GetLoaded = (state: State) => state.layoutLoaded;
export const GetCurrentUser = (state: State) => state.current_user;
export const GetTheme = (state: State) => state.theme;
export const GetHeader = (state: State) => state.header;
export const GetGoNext = (state: State) => state.goNext;
export const GetGoBack = (state: State) => state.goBack;
