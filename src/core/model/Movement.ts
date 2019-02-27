import { DateTimeFormatter } from "./DateTimeFormatter";
import { NumberFormatter } from "./NumberFormatter";

export class Movement {

    private _concept: String;
    private _date: String;
    _value: number;
    _valueFormatted: String;
    private _associateBalance: String;
    isPositive: boolean;

    constructor(concept: String, value: number, associateBalance: number) {
        this._concept = concept;
        this._date = DateTimeFormatter.shortDateTime();
        this._value = value;
        this._valueFormatted = NumberFormatter.pointsAndCommas(value);
        this._associateBalance = NumberFormatter.pointsAndCommas(associateBalance);
        this.isPositive = value > 0 ? true : false;
    }

    public get concept(): String {
        return this._concept;
    }

    public get date(): String {
        return this._date;
    }

    public get value(): number {
        return this._value;
    }

    public get associateBalance(): String {
        return this._associateBalance;
    }

}