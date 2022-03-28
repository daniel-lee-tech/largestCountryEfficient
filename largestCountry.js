// Find the country with the largest population by
// combining the given data on foreign keys

// The output of largestCountry should be an object with a
// key 'name' representing the country name and a key 'population'
// representing the countries total population

// Example Input Data:
// const countries = [
//   { id: 3, name: 'Russia' },
//   { id: 1, name: 'USA' },
// ];

// const cities = [
//   { id: 3, country_id: 1, name: 'Los Angeles' },
//   { id: 8, country_id: 3, name: 'Moscow' },
//   { id: 2, country_id: 1, name: 'Seattle' },
// ];

// const populations = [
//   { id: 3, city_id: 3, amount: 3960000 },
//   { id: 8, city_id: 8, amount: 11920000 },
//   { id: 2, city_id: 2, amount: 8240000 },
// ];

// Example Output: { name: 'USA', population: 12200000 }

const largestCountry = (countries, cities, populations) => {
  const cityPopulations = {}; // cityId : amount
  const cityToCountry = {}; // cityId: countryId
  const countryToName = {}; // countryId: name
  const countryToPopulation = {}; // countryId: amount

  cities.forEach((city) => {
    cityPopulations[city.id] = 0;
    cityToCountry[city.id] = city.country_id;
  });

  populations.forEach((population) => {
    cityPopulations[population.city_id] += population.amount;
  });

  countries.forEach((country) => {
    countryToName[country.id] = country.name;
  });

  Object.keys(cityPopulations).forEach((cityId) => {
    const amount = cityPopulations[cityId];
    const country = cityToCountry[cityId];

    if (country in countryToName) {
      if (country in countryToPopulation) {
        countryToPopulation[country] += amount;
      } else {
        countryToPopulation[country] = amount;
      }
    }
  });

  let highestCountryId = null;
  let highestCountPopulation = 0;

  Object.keys(countryToPopulation).forEach((id) => {
    const population = countryToPopulation[id];
    if (population > highestCountPopulation) {
      highestCountPopulation = population;
      highestCountryId = id;
    }
  });

  const countryName = countryToName[highestCountryId];

  return { name: countryName, population: highestCountPopulation };
};

module.exports = largestCountry;
