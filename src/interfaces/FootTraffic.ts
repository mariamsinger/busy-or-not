export interface FootTraffic {
    analysis: Analysis[];
    epoch_analysis: number;
    status: string;
    venue_info: VenueInfo;
    message: string;
}

interface Analysis {
    busy_hours: number[];
    day_info: DayInfo;
    day_raw: number[];
    hour_analysis: HourAnalysis[];
    peak_hours: PeakHour[];
    quiet_hours: number[];
    surge_hours: SurgeHours;
}

interface DayInfo {
    day_int: number;
    day_rank_max: number;
    day_rank_mean: number;
    day_text: string;
    venue_closed: number;
    venue_open: number;
}

interface HourAnalysis {
    hour: number;
    intensity_nr: number;
    intensity_txt: string;
}

interface PeakHour {
    peak_start: number;
    peak_max: number;
    peak_end: number;
    peak_intensity: number;
    peak_delta_mean_week: number;
}

interface SurgeHours {
    most_people_come: number;
    most_people_leave: number;
}

interface VenueInfo {
    venue_address: string;
    venue_id: string;
    venue_name: string;
    venue_timezone: string;
    venue_dwell_time_min: number;
    venue_dwell_time_max: number;
    venue_dwell_time_avg: number;
    venue_type: string;
    venue_types: string[];
    venue_lat: number;
    venue_lon: number;
}
