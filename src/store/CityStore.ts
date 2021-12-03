import { defineStore } from "pinia";

interface CityStoreState {
  cities: string[];
}

export const useCityStore = defineStore("city", {
  state: (): CityStoreState => ({
    cities: [
      "san jose",
      "santiago",
      "san francisco",
      "santa rosa",
      "san juan",
      "sabadell",
      "salamanca",
      "salt lake city",
      "salinas",
      "salem",
      "sausalito",
      "taipei",
      "tel aviv",
      "tempe",
      "termez",
      "temuco",
      "tiajuna",
      "tieling",
      "thousand oaks",
      "thunder bay",
      "tokyo",
      "tulsa",
    ],
  }),
});
