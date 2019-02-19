export class Movement {

    private _concept: String;
    private _date: String;
    private _value: number;

    constructor(concept: string, value: number) {
        this._concept = concept;
        this._date = new Date().toISOString();
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
	public get value(): number {
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
	public set value(value: number) {
		this._value = value;
	}

}