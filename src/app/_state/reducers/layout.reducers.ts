import { LayoutActions, LayoutActionTypes } from '../actions/layout.actions';
import { Role } from '../../models/role';
import { ThemeType } from "../../models/theme";

export interface State {
  layoutLoaded: boolean;
  config: any;
  pageLoaded: boolean;
  header: string;
  current_user: Role;
  theme: string;
}

export const initialState: State = {
  layoutLoaded: false,
  config: null,
  pageLoaded: true,
  header: 'Менеджер сценариев',
  current_user: null,
  theme: ThemeType.LIGHT
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

    case LayoutActionTypes.LayoutSetPageLoaded: {
      return { ...state, pageLoaded: action.payload };
    }

    case LayoutActionTypes.LayoutSetTheme: {
      return { ...state, theme: action.payload };
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
export const GetPageLoaded = (state: State) => state.pageLoaded;
export const GetTheme = (state: State) => state.theme;
