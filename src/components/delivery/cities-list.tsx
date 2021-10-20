import { ChangeEvent, FC } from 'react';
import './delivery.css'
import InputItem from './input-item';
const CitiesList: FC<CitiesListProps> = (props: CitiesListProps) => {
    const { citiesList, selectedCities, setCity, setAll, error, givenRef } = props;
    return (
      <div className={`cities ${error ? "errDelivery" : ""}`}>
        <InputItem
            givenRef={givenRef} 
            type="checkbox" 
            name="selectAll"
            className="selectAll"
            checked={selectedCities.length === citiesList.length} 
            itemValue={"Select All"}
            onChange={setAll}
            />
        {citiesList.map((city: string, index: number) => (
          <InputItem
            key={index}
            className="listitem" 
            type="checkbox"
            name={city}  
            itemValue={city}
            checked={selectedCities.includes(city)}
            onChange={setCity}
            />
        ))}
      </div>
    );
};

export default CitiesList;

type CitiesListProps = {
    citiesList: string[];
    givenRef: any
    error: boolean;
    // className: string;
    selectedCities: string[]; 
    setCity: (e: ChangeEvent<HTMLInputElement>) => void;
    setAll: (e: ChangeEvent<HTMLInputElement>) => void;
}