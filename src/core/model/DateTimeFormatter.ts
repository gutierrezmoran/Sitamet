export class DateTimeFormatter {

    private static date: Date = new Date();

    // 01/01/9999
    static shortDate(): string {
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return this.date.toLocaleDateString("es-ES", options);
    }

    // 00:00
    static shortTime(): string {
        let options = { hour: 'numeric', minute: 'numeric' };
        return this.date.toLocaleTimeString("es-ES", options);
    }

    static shortDateTime(): string {
        return this.shortDate() + " " + this.shortTime();
    }

}