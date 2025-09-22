export function dateToIsoString(date: Date): string
{
    return date.toISOString().split("T")[0];
}


export function getTodayInIsoDate(): string
{
    return dateToIsoString(new Date());
}

