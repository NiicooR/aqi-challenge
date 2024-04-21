const TOKEN = "28ea7f9fb4f285cb02dc3e6e741ed581b9d4d12e";

type coordinatesType = `${number};${number}`;

const waqiFetch = async (url: string) => {
  const response = await fetch(url + `/?token=${TOKEN}`);

  const data = await response.json();

  if (data["status"] !== "ok" || data["status"] === "error") {
    const er = data["data"];
    console.error(`Error in request ${url} :`, er);
    throw Error(er);
  }

  return data["data"];
};

export const getAQIFeedByCoordinates = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const coordinates: coordinatesType = `${latitude};${longitude}`;

  return waqiFetch(`https://api.waqi.info/feed/geo:${coordinates}`);
};

export const getAQIFeedByCity = async (city: string) => {
  return waqiFetch(`https://api.waqi.info/feed/${encodeURI(city)}`);
};
