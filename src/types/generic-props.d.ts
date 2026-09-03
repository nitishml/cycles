export type GenericProps<T = unknown> = {
    children?: React.ReactNode
    className?: string
} & T


export type EventType = "primary" | "secondary"

export interface CalendarEvent {
    id: string
    title: string
    start: Date
    end: Date
    type: EventType
    color?: "default" | "purple" | "green" | "orange" | "red"
    allDay?: boolean
}

export type ViewType = "month" | "week" | "day"

export interface CalendarState {
    view: ViewType
    date: Date
    events: CalendarEvent[]
}

export interface PaginationResponse {
    page: number;
    limit: number;
    total: number;
    pages: number;
}
