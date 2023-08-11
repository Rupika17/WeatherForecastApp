const baseUrl = 'http://api.weatherapi.com/v1';
const REACT_APP_WEATHER_API_KEY ="feb79de65af14a2cbb2154706230808"

export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = `${baseUrl}/current.json?key=${REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=yes`;
  var headers = {};
  return await (await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: headers,
  })).json();
};

export const fetchExtendedForecastData = async (
  city: string | { lat: number; lng: number }
) => {
  let days = 5;
  var headers = {};
  let url = `${baseUrl}/forecast.json?key=${REACT_APP_WEATHER_API_KEY}&q=${city}&days=${days}&aqi=yes&alerts=no`;

  return await (
    await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: headers,
    })
  ).json();
};

export const fetchCities = async (search: string) => {

    const url = `${baseUrl}/search.json?key=${REACT_APP_WEATHER_API_KEY}&q=${search}`;
    const res = await (
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: search,
          type: 'city',
          language: 'en',
        }),
      })
    ).json();
   if (res.length < 0){
    return ["No Match Found"]
    }
    else{
      return res.map((i: any) => {
        return i.name + ', ' + i.country;
      });
    }
  
  };