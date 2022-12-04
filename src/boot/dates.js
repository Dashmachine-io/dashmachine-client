import { date } from "quasar";

class Dates {
  getDateObject(timestamp) {
    return date.extractDate(timestamp, `YYYY-MM-DD HH:mm ZZ`);
  }
  toTimestamp(dateObj) {
    return date.formatDate(dateObj, `YYYY-MM-DD HH:mm ZZ`);
  }
  formatDate({ timestamp, formatString } = {}) {
    const dateObj = this.getDateObject(timestamp);
    return date.formatDate(dateObj, formatString);
  }
  relativeDate(timestamp) {
    const dateObj = this.getDateObject(timestamp);
    const now = new Date();
    const diffSeconds = date.getDateDiff(now, dateObj, "seconds");
    const diffMinutes = date.getDateDiff(now, dateObj, "minutes");
    const diffHours = date.getDateDiff(now, dateObj, "hours");
    const diffDays = date.getDateDiff(now, dateObj, "days");
    const diffMonths = date.getDateDiff(now, dateObj, "months");
    const diffYears = date.getDateDiff(now, dateObj, "years");
    // Future
    if (diffSeconds < 0 && diffSeconds > -60) {
      return "Less than a minute from now";
    }
    if (diffMinutes < 0 && diffMinutes > -60) {
      return `${diffMinutes * -1} minute${
        diffMinutes !== -1 ? "s" : ""
      } from now`;
    }
    if (diffHours < 0 && diffHours > -24) {
      return `${diffHours * -1} hour${diffHours !== -1 ? "s" : ""} from now`;
    }
    if (diffDays < 0 && diffDays > -30) {
      return `${diffDays * -1} day${diffDays !== -1 ? "s" : ""} from now`;
    }
    if (diffMonths < 0 && diffMonths > -12) {
      return `${diffMonths * -1} month${diffMonths !== -1 ? "s" : ""} from now`;
    }
    if (diffYears <= -1) {
      return `${diffYears * -1} year${diffYears !== -1 ? "s" : ""} from now`;
    }

    // Past
    if (diffSeconds < 60) {
      return "Less than a minute ago";
    }
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    }
    if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
    }
  }
  dateDiff(timestamp, unit) {
    const dateObj = this.getDateObject(timestamp);
    const now = new Date();
    return date.getDateDiff(now, dateObj, unit);
  }
  addToDate(timestamp, timeObj) {
    const dateObj = this.getDateObject(timestamp);
    return date.addToDate(dateObj, timeObj);
  }
}

const dates = new Dates();

export { dates };
