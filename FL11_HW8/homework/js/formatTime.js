function formatTime(minutes) {
  if (minutes >= 0) {
    let timeInMinutes = [{ type: 'day(s)', amount: 1440 },
    { type: 'hour(s)', amount: 60 },
    { type: 'minute(s)', amount: 1 }];
    let result = '';
    for (let i = 0; i < timeInMinutes.length; i++) {
      let amount = parseInt(minutes / timeInMinutes[i].amount);
      result += `${amount} ${timeInMinutes[i].type}`;
      minutes %= timeInMinutes[i].amount;
    }
    return result;
  }
}
console.log(formatTime(2673));
console.log(formatTime(59));
console.log(formatTime(120));
console.log(formatTime(0));
console.log(formatTime(21303));
console.log(formatTime(369));
console.log(formatTime(-50));