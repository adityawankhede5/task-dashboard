export function localDateToISO(
    dateStr: string
) {
    const [
        year,
        month,
        day,
    ] = dateStr
        .split("-")
        .map(Number);

    return new Date(
        Date.UTC(
            year,
            month - 1,
            day
        )
    ).toISOString();
}

export function isoToDateInput(
    iso: string
) {
    const date =
        new Date(iso);

    return [
        date.getUTCFullYear(),
        String(
            date.getUTCMonth() +
                1
        ).padStart(2, "0"),
        String(
            date.getUTCDate()
        ).padStart(2, "0"),
    ].join("-");
}