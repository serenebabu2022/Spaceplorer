export interface ApodData {
  title: string;
  url: string;
  explanation: string;
  date: string;
}
export interface Instrument {
  displayName: string;
}
export interface IPSData {
  activityId: string;
  eventTime: string;
  link: string;
  location: string;
  instruments: Instrument[];
}
export interface SEPData {
  sepID: string;
  eventTime: string;
  link: string;
  instruments: Instrument[];
}
export interface AsteroidListResponse {
  element_count: number;
  near_earth_objects: {
    [date: string]: AsteroidData[];
  };
}
export interface AsteroidData {
  id: string;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: [
    {
      close_approach_date: string;
      relative_velocity: {
        kilometers_per_second: string;
        kilometers_per_hour: string;
      };
      miss_distance: {
        astronomical: string;
        lunar: string;
        kilometers: string;
      };
      is_sentry_object: boolean;
    }
  ];
}
