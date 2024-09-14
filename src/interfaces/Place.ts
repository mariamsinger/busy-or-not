export interface Place {
    formatted_address: string;
    name: string;
    opening_hours: PlaceOpeningHours;
}

interface PlaceOpeningHours {
    open_now?: boolean;
    periods?: PlaceOpeningHoursPeriod[];
    special_days?: PlaceSpecialDay[];
    type?: string;
    weekday_text?: string[];
}

interface PlaceOpeningHoursPeriod {
    open: PlaceOpeningHoursPeriodDetail;
    closed: PlaceOpeningHoursPeriodDetail;
}

interface PlaceOpeningHoursPeriodDetail {
    day: number;
    time: string;
    date?: string;
    truncated?: boolean;
}

interface PlaceSpecialDay {
    date: string;
    exceptional_hours: boolean;
}
