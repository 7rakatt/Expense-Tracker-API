const getDateRange = (filter) => {
  const today = new Date();
  let startDate, endDate;

  switch (filter) {
    case "last-week":
      startDate = new Date(today.setDate(today.getDate() - today.getDay() - 7)); // Last week's Monday
      endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Last week's Sunday
      break;
    case "this-month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of this month
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of this month
      break;
    case "past-month":
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of last month
      endDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of last month
      break;
    default:
      throw new Error("Invalid filter");
  }

  return { startDate, endDate };
};

module.exports = getDateRange; 