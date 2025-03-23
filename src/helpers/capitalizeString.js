const capitalizeString = str => {
  return !!str && str.replace(/^./, str[0].toUpperCase());
};

export default capitalizeString;
