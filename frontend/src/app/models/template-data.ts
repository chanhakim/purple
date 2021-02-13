import { IOfficials, IOfficialsKV } from './officials';

export interface ISimpleTemplate {
    subject: string;
    body: string;
}

export interface ITemplateData extends ISimpleTemplate {
    template_id: number;
    elected_officials: IOfficialsKV | null;
    to: string;
    from: string;
}