import { DateTimeFormatter } from "./DateTimeFormatter";
import { NumberFormatter } from "./NumberFormatter";

export class Movement {

    concept: String;
    date: String;
    value: number;
    valueFormatted: String;
    isPositive: boolean;

    constructor(concept: String, value: number) {
        this.concept = concept;
        this.date = DateTimeFormatter.shortDateTime();
        this.value = value;
        this.valueFormatted = NumberFormatter.pointsAndCommas(value);
        this.isPositive = value > 0 ? true : false;
    }

}