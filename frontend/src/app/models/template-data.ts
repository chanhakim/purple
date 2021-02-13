import { IOfficials, IOfficialsKV } from './officials';

export interface ITemplateData {
    template_id: number;
    elected_officials: IOfficialsKV | null;
    to: string;
    from: string;
    subject: string;
    body: string;
}