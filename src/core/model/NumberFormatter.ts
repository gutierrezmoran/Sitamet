const LOCAL_SPAIN = "es-ES";
const OPTIONS = { style: "currency", currency: "EUR" };

export class NumberFormatter {

    private static formatter: Intl.NumberFormat = new Intl.NumberFormat(LOCAL_SPAIN, OPTIONS);

    // 99.999,99 €
    static pointsAndCommas(value: number): string {
        return this.formatter.format(value);
    }

}