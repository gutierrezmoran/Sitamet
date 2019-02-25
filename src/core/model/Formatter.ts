const LOCAL_SPAIN = "es-ES";
const OPTIONS = { minimumFractionDigits: 2 };

export class Formatter {

    private static formatter: Intl.NumberFormat = new Intl.NumberFormat(LOCAL_SPAIN, OPTIONS);

    static format(value: number): string {
        return this.formatter.format(value);
    }

}