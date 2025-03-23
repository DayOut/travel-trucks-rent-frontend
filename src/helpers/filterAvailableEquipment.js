/**
 * Filters the available equipment based on the provided vehicle data.
 * This function iterates through an array of possible equipment and adds
 * the equipment objects that have a matching value in the vehicle data
 * or are set to true.
 *
 * @param {Object[]} possibleEquipmentList - An array of possible equipment
 *   where each object contains an id and a value that can be an array or
 *   an object.
 * @param {Object} vehicleData - An object containing vehicle data
 *   specifications, where keys correspond to equipment ids and values are
 *   the vehicle's equipment characteristics.
 *
 * @returns {Object[]} An array of equipment objects that are available based
 *   on the provided vehicle data. The objects are either those found in the
 *   possible equipment list or objects that meet the specified conditions.
 */
const filterAvailableEquipment = (
  possibleEquipmentList = [],
  vehicleData = {}
) => {
  const result = possibleEquipmentList.reduce((acc, { id, value }) => {
    if (Array.isArray(value)) {
      const vehicleValue = vehicleData[id];
      const arrValue = value.find(({ id }) => id === vehicleValue);
      if (arrValue) {
        acc.push(arrValue.value);
      }
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      if (vehicleData[id]) {
        acc.push(value);
      }
    }
    return acc;
  }, []);
  return result;
};

export default filterAvailableEquipment;
