import { INewsStoriesValued, IOfficialsKV } from "src/app/models/officials";
import { ISimpleTemplate, ITemplateData } from "src/app/models/template-data";

export interface IDataState {
    zip: string;
    news_stories: INewsStoriesValued[];
    elected_officials: IOfficialsKV | null;
    selected_news: INewsStoriesValued | null;
    template: ITemplateData | null;
}

export const initialDataState: IDataState = {
    zip: '',
    news_stories: [],
    elected_officials: null,
    selected_news: null,
    template: null,
}