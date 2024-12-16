import {
  convertEquatorialToHorizontal,
  getSolarEquatorialCoordinate,
  getLunarEquatorialCoordinate,
} from '@observerly/astrometry';

export interface Observation {
  hour: number;
  moonAltitude: number;
  sunAltitude: number;
  moonAzimuth: number;
  sunAzimuth: number;
}

export function calculateAstronomicalObservations(
  latitude: number,
  longitude: number,
  date: Date | string,
): Observation[] {
  const observations: Observation[] = [];

  // Calculate altitudes for 24 hours
  for (let hour = 0; hour < 24; hour++) {
    const datetime = new Date(date);
    datetime.setHours(hour, 0, 0, 0);

    // Calculate Moon altitude using convertEquatorialToHorizontal
    const lunarEquatorial = getLunarEquatorialCoordinate(datetime);
    const moonHorizontal = convertEquatorialToHorizontal(
      datetime,
      { latitude, longitude },
      lunarEquatorial,
    );

    // Calculate Sun altitude using convertEquatorialToHorizontal
    const sunEquatorial = getSolarEquatorialCoordinate(datetime);
    const sunHorizontal = convertEquatorialToHorizontal(
      datetime,
      { latitude, longitude },
      sunEquatorial,
    );

    observations.push({
      hour,
      moonAltitude: moonHorizontal.alt,
      sunAltitude: sunHorizontal.alt,
      moonAzimuth: moonHorizontal.az,
      sunAzimuth: sunHorizontal.az,
    });
  }

  return observations;
}
