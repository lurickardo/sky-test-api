export class ErrorDto {
    private _status: number;

    private _message: string;

    get status(): number {
        return this._status;
    }

    get message(): string {
        return this._message;
    }
}