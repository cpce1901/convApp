export const changeDate = (date) => {
    const fecha = new Date(date);
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    const new_created = `${day}-${month}-${year}`;
    return new_created
  }
  
  export const getGreatings = () => {
    const horaActual = new Date().getHours();
  
    if (horaActual >= 5 && horaActual < 12) {
      return "¡Buenos días! ☀️";
    } else if (horaActual >= 12 && horaActual < 20) {
      return "¡Buenas tardes! 🌤️";
    } else {
      return "¡Buenas noches! 🌙";
    }
  }
  
  
  export const around = (decimal) => {
    const aroundNumber = parseFloat(decimal.toFixed(2));
    return aroundNumber
  
  }
  
  