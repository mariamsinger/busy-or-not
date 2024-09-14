export interface GooglePlace {
    formatted_address: string;
    geometry: Geometry;
    name: string;
}

interface Geometry {
    location: {
        lat(): number;
        lng(): number;
    };
}
