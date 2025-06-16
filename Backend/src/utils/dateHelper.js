export const getDateRange = (days) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days));
  
  return { startDate, endDate };
};

export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};