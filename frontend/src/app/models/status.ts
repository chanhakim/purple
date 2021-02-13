export enum EStatus {
  NONE,
  SUCCESS,
  FAILURE,
}

export interface IResponse {
    success: boolean;
    error_msg: string;
}