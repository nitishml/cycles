export type DailyEvent = {
    day: Date;
    events: {
        id: string;
        title: string;
        isHandled: boolean;
    }[]
}