import { useState, useEffect } from 'react';

export interface Country {
  code: string;
  label: string;
  phone: string;
}

export function useFetch(): Country[] | null {
  const [countryList, setCountryList] = useState<Country[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countries: Country[] = data.map((country: any) => ({
          code: country.cca2,
          label: country.name.common,
          phone:Object.values(country.idd).join("").replace(/[^\d+]/g, '')
        }));

        setCountryList(countries.sort((a,b) => a.label.localeCompare(b.label)));
      } catch (error) {
        console.error('Error fetching country data:', error);
        setCountryList([]);
      }
    };

    fetchData();
  }, []);

  return countryList;
}
