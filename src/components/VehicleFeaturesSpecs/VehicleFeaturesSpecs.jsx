import { useMemo } from "react";
import PropTypes from "prop-types";

import { selectPossibleVehicleEquipmentList as possibleEquipmentList } from "@/store/campers/selectors";

import { ItemsList, Badge, Separator } from "@/components";

import { filterAvailableEquipment } from "@/helpers";

import css from "./VehicleFeaturesSpecs.module.css";
import clsx from "clsx";

const VehicleFeaturesSpecs = ({ vehicleData = {}, className }) => {
  const camperEquipment = useMemo(
    () => filterAvailableEquipment(possibleEquipmentList, vehicleData),
    [vehicleData]
  );

  const selectedVehicleDetails = [
    "form",
    "length",
    "width",
    "height",
    "tank",
    "consumption",
  ];

  return (
    <div className={clsx(css["features"], className)}>
      <ItemsList
        of={Badge}
        items={camperEquipment}
        className={css["badges-list"]}
      />
      <div className={css["details"]}>
        <h4 className={css["details-title"]}>Vehicle details</h4>
        <Separator />
        <ul className={css["details-list"]}>
          {selectedVehicleDetails.map((key) => (
            <li key={key} className={css["details-item"]}>
              <span>{key}</span>
              <span>{vehicleData?.[key]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


VehicleFeaturesSpecs.propTypes = {
  vehicleData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    AC: PropTypes.bool,
    bathroom: PropTypes.bool,
    kitchen: PropTypes.bool,
    TV: PropTypes.bool,
    radio: PropTypes.bool,
    refrigerator: PropTypes.bool,
    microwave: PropTypes.bool,
    gas: PropTypes.bool,
    water: PropTypes.bool,
    form: PropTypes.string.isRequired,
    length: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    tank: PropTypes.string.isRequired,
    consumption: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default VehicleFeaturesSpecs;
