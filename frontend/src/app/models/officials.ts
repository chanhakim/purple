export interface IOfficials {
    role: string;
    email: string;
    zip_codes: string[];
}

export interface IOfficialsKV {
    [name: string]: IOfficials;
}

export interface INewsStories {
    id: string;
    headline: string;
    body: string;
    zip_code: string[];
    link: string;
    tag: string;
}

export interface INewsStoriesValued extends INewsStories {
    uuid: string;
}

// export interface INewsStoriesKV {
//     [id: number]: INewsStories;
// }

export interface IDifferentIssues {
    elected_officials: IOfficialsKV;
    newstories: INewsStories[];
}