import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CITIES
} from '../data/mockData';
import {
  getStoredLocation,
  setStoredLocation,
  getStoredAddresses
} from '../data/storage';
import { useToast } from './ToastContext';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const { showToast } = useToast();
  const initialLoc = getStoredLocation();

  const [cities] = useState(INITIAL_CITIES);
  const [selectedCity, setSelectedCity] = useState(initialLoc.city || INITIAL_CITIES[0]);
  const [selectedArea, setSelectedArea] = useState(initialLoc.area || 'Banjara Hills');
  const [addressString, setAddressString] = useState(initialLoc.addressString || 'Banjara Hills, Hyderabad');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState(getStoredAddresses());

  useEffect(() => {
    const loc = getStoredLocation();
    if (loc) {
      setSelectedCity(loc.city);
      setSelectedArea(loc.area);
      setAddressString(loc.addressString);
    }
    setSavedAddresses(getStoredAddresses());
  }, []);

  const changeCity = (cityObj) => {
    const defaultArea = cityObj.areas[0] || 'Center';
    const addr = `${defaultArea}, ${cityObj.name}`;
    setSelectedCity(cityObj);
    setSelectedArea(defaultArea);
    setAddressString(addr);

    setStoredLocation({
      city: cityObj,
      area: defaultArea,
      addressString: addr
    });

    showToast(`Delivery location switched to ${cityObj.name}`, 'info');
  };

  const changeArea = (areaStr) => {
    const addr = `${areaStr}, ${selectedCity.name}`;
    setSelectedArea(areaStr);
    setAddressString(addr);

    setStoredLocation({
      city: selectedCity,
      area: areaStr,
      addressString: addr
    });

    showToast(`Location set to ${areaStr}`, 'info');
  };

  const selectAddress = (addressObj) => {
    const matchedCity = cities.find(c => c.name.toLowerCase() === addressObj.city.toLowerCase()) || selectedCity;
    const addr = `${addressObj.flatNo ? addressObj.flatNo + ', ' : ''}${addressObj.street || addressObj.area}, ${matchedCity.name}`;
    
    setSelectedCity(matchedCity);
    setSelectedArea(addressObj.area);
    setAddressString(addr);

    setStoredLocation({
      city: matchedCity,
      area: addressObj.area,
      addressString: addr
    });

    showToast(`Delivering to ${addressObj.title || 'Saved Address'}`, 'success');
  };

  const detectGPS = () => {
    showToast('Locating your GPS coordinates...', 'info');
    setTimeout(() => {
      const hyd = cities[0];
      changeCity(hyd);
      showToast('Detected: Banjara Hills, Hyderabad', 'success');
    }, 1000);
  };

  return (
    <LocationContext.Provider
      value={{
        cities,
        selectedCity,
        selectedArea,
        addressString,
        savedAddresses,
        isLocationModalOpen,
        setIsLocationModalOpen,
        openLocationModal: () => setIsLocationModalOpen(true),
        closeLocationModal: () => setIsLocationModalOpen(false),
        changeCity,
        changeArea,
        selectAddress,
        detectGPS
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};
