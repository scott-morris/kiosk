// Libraries.

// Private.

const getPrecipitationTimeFrom = (data, key, dateKey = 'dt') => {
  let precipitationTime;
  Array.isArray(data) &&
    data.some((entry) => {
      if (entry[key]) {
        precipitationTime = entry[dateKey];
        return true;
      }
      return false;
    });

  return precipitationTime;
};

// Public.

const getPrecipitationTime = (data) => {
  return (
    getPrecipitationTimeFrom(data.minutely, 'precipitation') ||
    getPrecipitationTimeFrom(data.hourly, 'pop') ||
    getPrecipitationTimeFrom(data.daily, 'pop')
  );
};

export default getPrecipitationTime;
