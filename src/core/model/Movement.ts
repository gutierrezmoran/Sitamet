export class Movement {

    private _concept: String;
    private _date: String;
    private _value: String;

    constructor(concept: String, value: String) {
        this._concept = concept;
        this._date = this.currentDate;
        this._value = value;
    }

    /**
     * Getter concept
     * @return {String}
     */
    public get concept(): String {
        return this._concept;
    }

    /**
     * Getter date
     * @return {String}
     */
    public get date(): String {
        return this._date;
    }

    /**
     * Getter value
     * @return {String}
     */
    public get value(): String {
        return this._value;
    }

    /**
     * Setter concept
     * @param {String} value
     */
    public set concept(value: String) {
        this._concept = value;
    }

    /**
     * Setter date
     * @param {String} value
     */
    public set date(value: String) {
        this._date = value;
    }

    /**
     * Setter value
     * @param {String} value
     */
    public set value(value: String) {
        this._value = value;
    }

    private get currentDate(): string {
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let hour = date.getHours();
        let minute = date.getMinutes();

        return (day > 9 ? day : "0" + day) + "/" +
            (month > 9 ? month : "0" + month) + "/" +
            date.getFullYear() + " " +
            (hour > 9 ? hour : "0" + hour) + ":" +
            (minute > 9 ? minute : "0" + minute);
    }

}