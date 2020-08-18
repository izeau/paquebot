function randomIndex(arr) {
  return arr[Math.trunc(Math.random() * arr.length)];
}

module.exports = {
  randomIndex,
};
