const epochConvert = (epoch) => {
  const currentDate = new Date();
  const currentEpoch = Math.floor(currentDate.getTime() / 1000); 

  return currentEpoch > epoch;
};

export default epochConvert;
