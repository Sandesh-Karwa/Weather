/**
 * This function returns the ISO format date based on number of days passed as parameter
 */
export const getISOFormatDate = (noOfDays = 0) => {
    const updatedDate = new Date();
    updatedDate.setDate(updatedDate.getDate() - noOfDays);
    return updatedDate.toISOString();
}