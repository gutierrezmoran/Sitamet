export class MovementType {

    private _type: string;
    private _itemType: string;

    constructor(type: string, itemType: string) {
        this._type = type;
        this._itemType = itemType;
    }

	public get type(): string {
		return this._type;
	}

	public get itemType(): string {
		return this._itemType;
    }
    
    public convertNumberAccordingType(value: number): number {
        return this._type === "spent" ? value * -1 : value;
    }

}