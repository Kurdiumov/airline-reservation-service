// Convert Degress to Radians
const Deg2Rad = (deg) => {
  return (deg * Math.PI) / 180;
};

const PythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  const R = 6371; // km
  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = lat2 - lat1;
  const d = Math.sqrt(x * x + y * y) * R;
  return d;
};

const getNearest = (latitude, longitude, locations) => {
  let mindif = 99999;
  let closest;

  for (let index = 0; index < locations.length; ++index) {
    const dif = PythagorasEquirectangular(
      latitude,
      longitude,
      locations[index].latitude,
      locations[index].longitude
    );
    if (dif < mindif) {
      closest = index;
      mindif = dif;
    }
  }

  // return the nearest location
  const closestLocation = locations[closest];
  console.log("The closest location is " + closestLocation[0]);
  return closestLocation;
};

export default getNearest;
