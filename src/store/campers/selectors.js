import { createSelector } from "@reduxjs/toolkit";

export const selectVehicleTransmissionsList = [
  {
    id: "automatic",
    value: {
      queryName: "automatic",
      label: "Automatic",
      iconName: "icon-diagram",
    },
  },
  {
    id: "manual",
    value: {
      queryName: "manual",
      label: "Manual",
      iconName: "icon-diagram",
    },
  },
];

export const selectVehicleEnginesList = [
  {
    id: "diesel",
    value: {
      queryName: "diesel",
      label: "Diesel",
      iconName: "icon-fuel-pump",
    },
  },
  {
    id: "petrol",
    value: {
      queryName: "petrol",
      label: "Petrol",
      iconName: "icon-fuel-pump",
    },
  },
  {
    id: "hybrid",
    value: {
      queryName: "hybrid",
      label: "Hybrid",
      iconName: "icon-fuel-pump",
    },
  },
];

export const selectPossibleVehicleEquipmentList = [
  {
    id: "AC",
    value: {
      queryName: "ac",
      label: "AC",
      iconName: "icon-wind",
    },
  },
  {
    id: "bathroom",
    value: {
      queryName: "bathroom",
      label: "Bathroom",
      iconName: "icon-shower",
    },
  },
  {
    id: "kitchen",
    value: {
      queryName: "kitchen",
      label: "Kitchen",
      iconName: "icon-cup-hot",
    },
  },
  {
    id: "TV",
    value: {
      queryName: "tv",
      label: "TV",
      iconName: "icon-tv",
    },
  },
  {
    id: "radio",
    value: {
      queryName: "radio",
      label: "Radio",
      iconName: "icon-radio",
    },
  },
  {
    id: "refrigerator",
    value: {
      queryName: "fridge",
      label: "Refrigerator",
      iconName: "icon-fridge",
    },
  },
  {
    id: "microwave",
    value: {
      queryName: "microwave",
      label: "Microwave",
      iconName: "icon-microwave",
    },
  },
  {
    id: "gas",
    value: {
      queryName: "gas",
      label: "Gas",
      iconName: "icon-gas-stove",
    },
  },
  {
    id: "water",
    value: {
      queryName: "water",
      label: "Water",
      iconName: "icon-water-drop",
    },
  },
];

export const selectVehicleFormsList = [
  {
    id: "panelTruck",
    value: {
      queryName: "van",
      label: "Van",
      iconName: "icon-grid-1x2",
    },
  },
  {
    id: "fullyIntegrated",
    value: {
      queryName: "integrated",
      label: "Fully Integrated",
      iconName: "icon-grid-2x2",
    },
  },
  {
    id: "alcove",
    value: {
      queryName: "alcove",
      label: "Alcove",
      iconName: "icon-grid-3x3",
    },
  },
];


export const selectVehicleValidationList = [
  {
    id: "transmission",
    value: selectVehicleTransmissionsList,
  },
  {
    id: "engine",
    value: selectVehicleEnginesList,
  },
  ...selectPossibleVehicleEquipmentList
];

export const selectLoading = state => state.campers.isLoading;
export const selectError = state => state.campers.error;
export const selectCampersObj = state => state.campers.items ?? {};
export const selectCampers = createSelector([selectCampersObj], campersObj =>
  Object.values(campersObj)
);
export const selectCamperById = (state, id) => state.campers.items?.[id];
