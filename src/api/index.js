const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/';

export const getVehicle = async (vinCode) => {
  const response = await fetch(`${BASE_URL}vehicles/decodevin/${vinCode}?format=json`);

  return response.json();
};

export const getVariables = async () => {
  const response = await fetch(`${BASE_URL}vehicles/getvehiclevariablelist?format=json`);

  return response.json();
};

export const getDescription = async (id) => {
  const response = await fetch(`${BASE_URL}vehicles/GetVehicleVariableValuesList/${id}?format=json`);

  return response.json();
};
