import { Action } from '@ngrx/store';
import { INewsStoriesValued, IOfficialsKV } from 'src/app/models/officials';
import { ISimpleTemplate } from "src/app/models/template-data";

export enum EDataActions {
    SetZipCode = '[DATA] Setting Zip Code',
    AddNewsStories = '[DATA] Adding Multiple Stories',
    AddSingleStory = '[DATA] Adding Single Story',
    AddElectedOfficial = '[DATA] Adding Elected Official',
    SelectedNews = '[DATA] Selected a News Story',
    UpdateTemplate = '[DATA] Update Template',
}

export class SetZipCode implements Action {
    public readonly type = EDataActions.SetZipCode;
    constructor(public zipcode: string) { }
}

export class AddNewsStories implements Action {
    public readonly type = EDataActions.AddNewsStories;
    constructor(public newsStories: INewsStoriesValued[]) { }
}

export class AddSingleStory implements Action {
    public readonly type = EDataActions.AddSingleStory;
    constructor(public newsStory: INewsStoriesValued) { }
}

export class AddElectedOfficial implements Action {
    public readonly type = EDataActions.AddElectedOfficial;
    constructor(public electedOfficial: IOfficialsKV) { }
}

export class SelectedNews implements Action {
    public readonly type = EDataActions.SelectedNews;
    constructor(public selectedNews: INewsStoriesValued) { }
}

export class UpdateTemplate implements Action {
    public readonly type = EDataActions.UpdateTemplate;
    constructor(public temp: ISimpleTemplate) { }
}

export type DActions = 
    | SetZipCode
    | AddNewsStories
    | AddSingleStory
    | AddElectedOfficial
    | SelectedNews
    | UpdateTemplate;