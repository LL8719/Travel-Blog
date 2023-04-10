module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    if(!date) {
      return Date.now();
    }
    return date.toLocaleDateString();
  }
}
 
