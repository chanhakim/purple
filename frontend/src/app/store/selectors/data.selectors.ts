import { createSelector, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IDataState } from '../state/data.state';

const selectApp = (state: IAppState) => state.appData;

export const getData = createSelector(
    selectApp,
    (state: IDataState) => state
)

export const selectZip = createSelector(
    selectApp,
    (state: IDataState) => state.zip
);

// Multiple
export const selectNewsStories = createSelector(
    selectApp,
    (state: IDataState) => state.news_stories
);

export const selectElectedOfficials = createSelector(
    selectApp,
    (state: IDataState) => state.elected_officials
);

export const selectNews = createSelector(
    selectApp,
    (state: IDataState) => state.selected_news
);

export const selectTemplate = createSelector(
    selectApp,
    (state: IDataState) => state.template
);
