import { INewsStoriesValued, IOfficialsKV } from 'src/app/models/officials';
import { DActions, EDataActions } from '../actions/data.actions';
import { initialDataState, IDataState } from '../state/data.state';

export const dataReducers = (
    state = initialDataState,
    action: DActions
): IDataState => {
    switch (action.type) {
        case EDataActions.SetZipCode: {
            return {
                ...state,
                zip: action.zipcode
            };
        }
        case EDataActions.AddNewsStories: {
            const allNews: INewsStoriesValued[] = [
                ...action.newsStories
            ]

            return {
                ...state,
                news_stories: allNews
            };
        }
        case EDataActions.AddSingleStory: {
            const updateStory: INewsStoriesValued[] = [
                ...state.news_stories,
                action.newsStory
            ]

            return {
                ...state,
                news_stories: updateStory
            };
        }
        case EDataActions.AddElectedOfficial: {
            return {
                ...state,
                elected_officials: action.electedOfficial
            };
        }
        case EDataActions.SelectedNews: {
            return {
                ...state,
                selected_news: action.selectedNews
            };
        }
        case EDataActions.UpdateTemplate: {
            return {
                ...state,
                template: action.temp
            };
        }
        default:
            return state;
    }
}