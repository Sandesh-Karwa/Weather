import { meteomaticsUrlHeader } from "../config";
import { endpoints } from "../endpoints";
import { getISOFormatDate } from "../utils/getDate";

/**
 * Fetching weather details based on weather parameter, coordinates and time period and format the response in Highcharts format
 */
export async function getWeather ({
    weatherParameter,
    coordinates,
    timePeriod
}){
  const startDate = getISOFormatDate(1);
  const endDate = getISOFormatDate(0);
  
  const response = await fetch(endpoints.getMaps + startDate + '--' + endDate + ':'+ timePeriod +'/' + weatherParameter + '/' + coordinates.join(',') + '/json?model=mix', {
    method: 'GET', headers: meteomaticsUrlHeader()
  })
  return await response.json().then((response) => {
    return response.data[0].coordinates[0].dates.map(({ date, value }) => ({
      x: new Date(date).getTime(),
      y: value,
    }));
  });
}