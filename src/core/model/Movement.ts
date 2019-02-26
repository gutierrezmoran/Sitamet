import { DateTimeFormatter } from "./DateTimeFormatter";
import { NumberFormatter } from "./NumberFormatter";

export class Movement {

    private _concept: String;
    private _date: String;
    private _value: String;
    private _associateBalance: String;
    isPositive: boolean;

    constructor(concept: String, value: number, associateBalance: number) {
        this._concept = concept;
        this._date = DateTimeFormatter.shortDateTime();
        this._value = NumberFormatter.pointsAndCommas(value);
        this._associateBalance = NumberFormatter.pointsAndCommas(associateBalance);
        this.isPositive = value > 0 ? true : false;
        this._value = this.isPositive ? "+" + this._value : this._value;
    }

    public get concept(): String {
        return this._concept;
    }

    public get date(): String {
        return this._date;
    }

    public get value(): String {
        return this._value;
    }

    public get associateBalance(): String {
        return this._associateBalance;
    }

    public set concept(value: String) {
        this._concept = value;
    }

    public set date(value: String) {
        this._date = value;
    }

    public set value(value: String) {
        this._value = value;
    }

    public set associateBalance(value: String) {
        this._associateBalance = value;
    }

}