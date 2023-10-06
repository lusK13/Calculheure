class CloneHour {
  hour = 0;
  minute = 0;
  second = 0;
  constructor(hour) {
    if (!hour) {
      let date = new Date();
      hour =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    let regexS = /(\d+):(\d{2}):(\d{2})/;
    let regexM = /(\d+):(\d{2})/;
    let regexH = /(\d+)/;
    if (regexS.test(hour)) {
      this.hour = Number(regexS.exec(hour)[1]);
      this.minute = Number(regexS.exec(hour)[2]);
      this.second = Number(regexS.exec(hour)[3]);
    } else if (regexM.test(hour)) {
      this.hour = Number(regexM.exec(hour)[1]);
      this.minute = Number(regexM.exec(hour)[2]);
      this.second = 0;
    } else if (regexH.test(hour)) {
      this.hour = Number(regexH.exec(hour)[1]);

      const tempSec =
        (Math.ceil(
          Number("0." + regexH.exec(hour).input.split(".")[1]) * 60 * 100
        ) *
          60) /
        100;
      this.addSecond(tempSec | 0);
    }
  }

  addHour(hour) {
    this.hour += hour;
    return this;
  }
  addMinute(minute) {
    let totalMinute = this.minute + minute;
    console.log(totalMinute);
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
  getInHour() {
    return `${this.hour.toString().padStart(2, "0")}:${this.minute
      .toString()
      .padStart(2, "0")}:${this.second.toString().padStart(2, "0")}`;
  }

  getInDay() {
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
    return this.hour + this.minute / 60 + this.second / 60 / 60;
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
 * @typedef {CloneHour}
 * @returns {Hour}
 */
function Hour(...arguments) {
  return new CloneHour(...arguments);
}

//let heure1 = Hour();
//let heure2 = Hour("12:46:43");
//let heure3 = Hour("8:14:45");
//console.log(Hour(heure1 + heure2 + heure3).format("HH[salut]mm et ss[s]"));

//console.log("HH[salHHut]m[HH]m et ss[s]".match(/s(?![^[]]*])/g));

//let text = "salut[il est ]HHhmm[ et ]ss[ secondes]";

//console.log("salut[il est ]HHhmm[ et ]ss[ secondes]".match(/(?:\[[^\[]*\])/g));
//\{\{.*?\}\}
//text.match(/(?<!\[)HH(?![\w\s]*[\]])/g)

//console.log(Hour(762).getInDay());
