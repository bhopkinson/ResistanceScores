import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private MILLISECONDS_IN_A_DAY = 86_400_000;
  private DAYS_IN_A_WEEK = 7;
  private MONTHS_IN_A_YEAR = 12;
  private FIRST_OF_ALL_TIME = new Date(2019,3,5); // April 5, 2019 was the first recorded game of Resistance
  private ALL_MONTH_MMM_STRINGS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  /**
   * Returns the dates's day value in days since January 1, 1970 UTC
   */
  public getRelativeDay(date: Date): number {
    const millisecondsSinceEpochDate = date.valueOf();
    const daysSinceEpochDate = Math.floor(millisecondsSinceEpochDate / this.MILLISECONDS_IN_A_DAY);
    return daysSinceEpochDate;
  }

  /**
   * Returns the dates's day value in months since January 1, 1970 UTC
   */
  public getRelativeMonth(date: Date): number {
    const yearsSinceEpochYear = date.getFullYear() - this.epochDate.getFullYear();
    const monthsSinceEpochMonth = date.getMonth() - this.epochDate.getMonth();
    return (this.MONTHS_IN_A_YEAR * yearsSinceEpochYear) + monthsSinceEpochMonth;
  }

  /**
   * Returns the date corresponding to the given number of days since January 1, 1970 UTC
   */
  public getDateFromRelativeDay(relativeDay: number): Date {
    const daysSinceEpochDate = relativeDay;
    const millisecondsSinceEpochDate = daysSinceEpochDate * this.MILLISECONDS_IN_A_DAY;
    return new Date(millisecondsSinceEpochDate);
  }

  /**
   * Returns the date corresponding to the given number of months since January, 1970
   * @param relativeMonth number of months since Jan 1970
   */
  public getDateFromRelativeMonth(relativeMonth: number): Date {
    const date = this.epochDate;
    date.setMonth(relativeMonth);
    date.setDate(1);
    return date;
  }

  public getMMMStringFromRelativeMonth(relativeMonth: number): string {
    const date = this.getDateFromRelativeMonth(relativeMonth);
    const monthIndex = date.getMonth();
    return this.getMMMStringFromMonth(monthIndex);
  }

  public getMMMStringFromMonth(monthIndex: number): string {
    return this.ALL_MONTH_MMM_STRINGS[monthIndex];
  }

  public get today(): Date {
    return new Date();
  }

  public get epochDate(): Date {
    return new Date(0);
  }

  public get oneWeekAgoToday(): Date {
    const date = this.today;
    date.setDate(date.getDate() - this.DAYS_IN_A_WEEK);
    return date;
  }

  public get firstOfAllTime(): Date {
    return this.FIRST_OF_ALL_TIME;
  }

  public get firstOfWeek(): Date {
    const date = this.today;
    const dayOfWeek = date.getDay() || 7; // make Sunday = 7 instead of 0
    date.setDate((date.getDate() - dayOfWeek) + 1);
    return date;
  }

  public get firstOfMonth(): Date {
    const date = this.today;
    date.setDate(1);
    return date;
  }
}
// TODO [TH] Use this somehow
// export class XDate {
//   private _date: Date;
//   private MILLISECONDS_IN_A_DAY = 86_400_000;
//   private DAYS_IN_A_WEEK = 7;
//   private MONTHS_IN_A_YEAR = 12;
//   private FIRST_OF_ALL_TIME = new Date(2019,3,5); // April 5, 2019 was the first recorded game of Resistance
//   private EPOCH_DATE = new Date(0);
  
//   constructor(date: Date) {
//     this._date = date;
//   }

//   public hello = 'ff';

//   public asDate(): Date {
//     return this._date;
//   }

//   public asRelativeDay(): number {
//     const millisecondsSinceEpochDate = this._date.valueOf();
//     const daysSinceEpochDate = Math.floor(millisecondsSinceEpochDate / this.MILLISECONDS_IN_A_DAY);
//     return daysSinceEpochDate;
//   }

//   public asRelativeMonth(): number {
//     const yearsSinceEpochYear = this._date.getFullYear() - this.EPOCH_DATE.getFullYear();
//     const monthsSinceEpochMonth = this._date.getMonth() - this.EPOCH_DATE.getMonth();
//     return (this.MONTHS_IN_A_YEAR * yearsSinceEpochYear) + monthsSinceEpochMonth;
//   }
// }