class Hour {
  hour = 0;
  minute = 0;
  second = 0;
  constructor(hour) {
    if (!hour) {
      let date = new Date();
      hour =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    this.reconizer(hour);
  }
  reconizer(hour) {
    let regexS = /(\d+):(\d{2}):(\d{2})/;
    let regexM = /(\d+):(\d{2})/;
    let regexH = /(\d+)/;
    if (regexS.test(hour)) {
      this.addHour(Number(regexS.exec(hour)[1]));
      this.addMinute(Number(regexS.exec(hour)[2]));
      this.addSecond(Number(regexS.exec(hour)[3]));
    } else if (regexM.test(hour)) {
      this.addHour(Number(regexM.exec(hour)[1]));
      this.addMinute(Number(regexM.exec(hour)[2]));
      this.second = 0;
    } else if (regexH.test(hour)) {
      this.addHour(Math.floor(hour));
      const decimHour = Number(hour) - this.hour;
      const tempSec = (Math.ceil(decimHour * 60 * 100) * 60) / 100;
      this.addSecond(tempSec | 0);
    }
  }
  addHour(hour) {
    this.hour += hour;
    return this;
  }
  addMinute(minute) {
    let totalMinute = this.minute + minute;
    if (totalMinute >= 60) {
      this.addHour(Math.floor(totalMinute / 60));
      this.minute = totalMinute % 60;
    } else {
      this.minute += minute;
    }
    return this;
  }
  addSecond(second) {
    let totalSecond = this.second + second;
    if (totalSecond >= 60) {
      this.addMinute(Math.floor(totalSecond / 60));
      this.second = totalSecond % 60;
    } else {
      this.second += second;
    }
    return this;
  }
  getHour() {
    return this.hour;
  }
  getMinute() {
    return this.minute;
  }
  getSecond() {
    return this.second;
  }
  getInSecond() {
    return this.hour * 60 * 60 + this.minute * 60 + this.second;
  }
  getInMinute() {
    return this.hour * 60 + this.minute + this.second / 60;
  }
  getInHour() {
    return this.hour + this.minute / 60 + this.second / 60 / 60;
  }

  getInTextHour() {
    return `${this.hour.toString().padStart(2, "0")}:${this.minute
      .toString()
      .padStart(2, "0")}:${this.second.toString().padStart(2, "0")}`;
  }
  toDayObject() {
    let hour = this.hour % 24;
    let day = Math.floor(this.hour / 24);

    return { day, hour, minute: this.minute, second: this.second };
  }
  getInDay() {
    let hour = (this.hour % 24) / 24;
    let day = Math.floor(this.hour / 24);

    return day + hour;
  }
  getInTextDay() {
    let hour = this.hour % 24;
    let day = Math.floor(this.hour / 24);

    return `${day}jour, ${hour
      .toString()
      .padStart(2, "0")} heures, ${this.minute
      .toString()
      .padStart(2, "0")} minutes, ${this.second
      .toString()
      .padStart(2, "0")} secondes`;
  }

  valueOf() {
    return this.getInHour();
  }
  format(format) {
    let newFormat = format;
    newFormat = newFormat.replace(
      /(?<!\[)HH(?![\w\s]*[\]])/g,
      this.hour.toString().padStart(2, "0")
    );
    newFormat = newFormat.replace(
      /(?<!\[)H(?![\w\s]*[\]])/g,
      this.hour.toString()
    );
    newFormat = newFormat.replace(
      /(?<!\[)mm(?![\w\s]*[\]])/g,
      this.minute.toString().padStart(2, "0")
    );
    newFormat = newFormat.replace(
      /(?<!\[)m(?![\w\s]*[\]])/g,
      this.minute.toString()
    );
    newFormat = newFormat.replace(
      /(?<!\[)ss(?![\w\s]*[\]])/g,
      this.second.toString().padStart(2, "0")
    );
    //console.log(newFormat.match(/s(?![^[]]*])/g));

    newFormat = newFormat.replace(
      /(?<!\[)s(?![\w\s]*[\]])/g,
      this.second.toString()
    );
    return newFormat.replace(/[\[\]]/g, "");
  }
}

/**
 * @typedef {Hour}
 * @returns {CalculHeure}
 */
function CalculHeure(...arguments) {
  return new Hour(...arguments);
}

const heure1 = new CalculHeure("9:30:30");
const heure2 = new CalculHeure("15:30:34");

console.log(heure1.getInTextHour()); //09:30:30
console.log(heure1.getInTextDay()); //0jour, 09 heures, 30 minutes, 30 secondes
console.log(CalculHeure(1.5)); //{ hour: 1, minute: 30, second: 0 }
console.log(+CalculHeure(1.5)); //1.5
console.log(heure1 + heure2); //25.017777777777777
console.log(CalculHeure(heure1 + heure2)); //{ hour: 25, minute: 1, second: 4 }
console.log(CalculHeure(heure1 + heure2).getInTextDay()); //1jour, 01 heures, 01 minutes, 04 secondes
console.log(heure1.format("[Il est] HHhmm et ss [secondes]")); //Il est 09h30 et 30 secondes
