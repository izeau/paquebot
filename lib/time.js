/**
 * Computes number of minutes between two dates
 * @param {date} close the more recent date
 * @param {date} far   the furthest date
 */
function computeMinutes(close, far) {
  const diff = (far.getTime() - close.getTime()) / 1000;
  return Math.abs(Math.round(diff / 60));
}

/**
 * Converts number of minutes into [HH]h[mm]min format.
 * @param {number} minutes
 */
function convertMinutesToTime(minutes) {
  const hours = minutes / 60;
  const rhours = Math.floor(hours);
  const rminutes = Math.round((hours - rhours) * 60);

  return `${rhours ? rhours + 'h' : ''}${
    rminutes
      ? (rminutes < 10 ? (rhours ? '0' : '') + rminutes : rminutes) + 'min'
      : ''
  }`;
}
