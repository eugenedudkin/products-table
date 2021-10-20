import { ChangeEvent, FC } from "react";
import InputItem from "./input-item";

const CountriesList: FC<CountriesListProps> = (props: CountriesListProps) => {
    const { countryList, selectedCountry, setItem } = props;
  
    return (
      <div className="countries">
        {countryList.map((country: string) => (
            <InputItem
              key={country} 
              type="radio" 
              name="country"
              checked={country === selectedCountry} 
              itemValue={country}
              onChange={setItem}
            />
        ))}
      </div>
    );
};

export default CountriesList;

type CountriesListProps = {
    countryList: string[];
    selectedCountry: string;
    setItem: (e: ChangeEvent<HTMLInputElement>) => void;
}

