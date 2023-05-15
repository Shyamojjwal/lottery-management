import { Component, OnInit } from '@angular/core';
import { SharedService } from '@app-core/services';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  public progressBarColor: string = "#e53935";
  public progressbarValue: number = 0;
  private totalApiCall: number = 0;
  public isProgressVisible: boolean = false;

  private timingInterval: any;

  constructor(
    private _sharedService: SharedService
  ) {
    this._sharedService.prgBarSubscriber$.subscribe((_isProgressShown: any) => {
      console.log("Here... >> ProgreeBarComponent: ", _isProgressShown)
      if (_isProgressShown) {
        this.totalApiCall += 1;
      } else if (!_isProgressShown && this.totalApiCall > 0) {
        this.totalApiCall -= 1;
      }
      this.isProgressVisible = (this.totalApiCall > 0);

      this.setProgressValue();
    })
  }

  ngOnInit(): void {
  }

  setProgressValue = () => {
    if (this.isProgressVisible && this.progressbarValue == 0) {
      this.timingInterval = setInterval(() => {
        if (this.progressbarValue <= 25) {
          this.progressbarValue += 5;
        } else if (this.progressbarValue <= 50) {
          this.progressbarValue += 2.5;
        } else if (this.progressbarValue <= 70) {
          this.progressbarValue += 2;
        } else if (this.progressbarValue <= 95) {
          this.progressbarValue += 0.05;
        }
      }, 1000);
    } else if (!this.isProgressVisible) {
      this.progressbarValue = 100;
      setTimeout(() => {
        this.isProgressVisible = false;
        this.progressbarValue = 0;
        clearInterval(this.timingInterval)
      }, 1000);
    }
  }

}
