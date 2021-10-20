import { ChangeEvent, useState, useEffect, FC, FocusEvent } from 'react';
import { useSelector } from "react-redux";
import { DeliveryItem } from '../../store/types';
import CitiesList from './cities-list';
import CountriesList from './countries-list';
import './delivery.css'

const Delivery: FC<DeliveryProps> = (props: DeliveryProps) => {

  const { delivery, setDelivery, deliveryValidate, error, givenRef } = props;
  const deliveryData = useSelector((state: any) => state.delivery);

  const defaultOption: string = delivery.length !== 0 ? "Город" : "none";

  const [...countriesArr]: string[] = deliveryData.map((item: DeliveryItem) => item.country);
  const [...citiesArr]: string[] = deliveryData.map((item: DeliveryItem) => item.cities).flat();

  const [option, setOption] = useState<string>(defaultOption);
  const [country, setCountry] = useState<string>("");
  const [checkedCities, setCheckCities] = useState<Cities>(delivery);

  useEffect(() => {
    setDelivery(checkedCities);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCities.length]);

  const filterCities: IFilterCities = (filterCountry) => {
    return filterCountry === "" 
     ? citiesArr
     : deliveryData.filter((el: any) => el.country === filterCountry)[0].cities
  };

  const filteredCities = filterCities(country);

  const onBlurContainer = (e: FocusEvent<HTMLDivElement>) => {
    return country !== "" && checkedCities.length === 0
        ? deliveryValidate("Небходимо выбрать город!")
        : deliveryValidate("")
  }
  const onFocusContainer = (e: FocusEvent<any>) => {
    deliveryValidate("")
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountry("");
    setCheckCities([]);
    setOption(e.target.value);
  };

  const setItem = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckCities([]);
    if (e.target.checked) {
      setCountry(e.target.value);
    }
  };

  const setCity = (e: ChangeEvent<HTMLInputElement>) => {
    const {value: cityName, checked} = e.target as HTMLInputElement
    // deliveryValidate("")
    return checked
        ? setCheckCities([...checkedCities, cityName])
        : setCheckCities(checkedCities.filter(city => city !== cityName))
  };

  const setAllCities = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target as HTMLInputElement
    return checked
      ? setCheckCities(filteredCities)
      : setCheckCities([])
  };

  return (
    <div 
      tabIndex={0}
      onFocus={onFocusContainer} 
      onBlur ={onBlurContainer} 
      className="deliveryContainer">
      <div className="delivery">
        <label className="selectLabel">
          Delivery:
          <br />
          <select
            className="select"
            value={option}
            onChange={handleChange}
            name="delivery"
            id="delivery">
            <option value="" className="option"></option>
            <option value="Страна" className="option">Страна</option>
            <option value="Город" className="option">Город</option>
          </select>
        </label>
      {option === "Страна" && (
        <CountriesList
          setItem={setItem}
          selectedCountry={country}
          countryList={countriesArr}
        />
      )}

      {(option === "Город" || country.length !== 0) && (
        <CitiesList
          givenRef={givenRef}
          error={error.err}
          setCity={setCity}
          setAll={setAllCities}
          selectedCities={checkedCities}
          citiesList={filteredCities}
        />
        
      )}
    </div>
        <div className="deliveryErr">
          {error.err && <p className="errP">{error.errMsg}</p>}
        </div>
    </div>
    
  );
};

export default Delivery;

type Cities = string[];

type DeliveryProps = {
  delivery: string[];
  givenRef: any;
  error: {err: boolean, errMsg: string}
  setDelivery: (s: Cities) => void;
  deliveryValidate: (valid: string) => any;
}
interface IFilterCities {
  (filterCountry: string): Cities
}