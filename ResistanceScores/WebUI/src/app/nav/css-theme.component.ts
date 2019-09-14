import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-css-theme',
  templateUrl: './css-theme.component.html',
  styleUrls: ['./css-theme.component.scss']
})
export class CssThemeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  private LOCAL_STORAGE_KEY = 'css-theme';
  private DARK = 'dark-theme';
  private LIGHT = 'light-theme';

  _isDarkTheme = false;

  ngOnInit() {
    const theme = this.getStorageVariable();
    if (theme === this.DARK) {
      this.isDarkTheme = true;
    }
  }

  enableDarkTheme(): void {
    this.setDarkBodyClass();
    this.setDarkStorageVariable();
  }

  disableDarkTheme(): void {
    this.removeDarkBodyClass();
    this.setLightStorageVariable();
  }

  get isDarkTheme(): boolean { return this._isDarkTheme; }
  set isDarkTheme(value: boolean) {
    this._isDarkTheme = value;
    if (value === true) {
      this.enableDarkTheme();
    } else {
      this.disableDarkTheme();
    }
  }
  
  getStorageVariable = () => localStorage.getItem(this.LOCAL_STORAGE_KEY);
  setStorageVariable = (value: string) => localStorage.setItem(this.LOCAL_STORAGE_KEY, value);
  setDarkStorageVariable = () => this.setStorageVariable(this.DARK);
  setLightStorageVariable = () => this.setStorageVariable(this.LIGHT);

  setBodyClass = (value: string) => this.document.body.classList.add(value);
  setDarkBodyClass = () => this.setBodyClass(this.DARK);
  removeBodyClass = (value: string) => this.document.body.classList.remove(value);
  removeDarkBodyClass = () => this.removeBodyClass(this.DARK);


}
