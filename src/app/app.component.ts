import { Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sub: Subscription;
  digit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  symbolLow: any = 'abcdefghijkmnpqrstuwxyz';
  symbolUp: any = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  randomArrIndex = 0;
  smallArr = this.digit.concat(
    this.symbolLow.split(''),
    this.symbolUp.split('')
  ); //ЗАКОМЕНТУВАТИ ДЛЯ ПЕРЕВІРКИ НА СИНІЙ КОЛІР
  //  smallArr = this.digit //РОЗКОМЕНТУВАТИ ДЛЯ ПЕРЕВІРКИ НА СИНІЙ КОЛІР
  arrLength = this.smallArr.length;
  final: string = 'Start';
  redToggle = false;
  blueToggle = false;
  zeroToggle = false;
  boolResult: any;

  constructor() {
    const timer$ = new Observable((observer) => {
      const intervalId = setInterval(() => {
        let result = [];
        for (let j = 0; j < 5; j++) {
          this.randomArrIndex = Math.floor(Math.random() * this.arrLength);
          for (let i = 0; i < this.arrLength; i++) {
            if (this.randomArrIndex === i) {
              result.push(this.smallArr[i]);
            }
          }
        }
        this.polindrome(result);
        this.zeroInString(result);
        this.allNumber(result);
        console.log(result);
        observer.next(result);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    });
    this.sub = timer$.subscribe((val: []) => (this.final = val.join('')));
  }

  polindrome(arr: Array<string>) {
    let resultString = arr.join('');
    isPalindrome(resultString);
    function isPalindrome(string: string) {
      let firstSide = string.toLowerCase().replace(/\w/g, '');
      let secondSide = firstSide.split(' ').reverse().join(' ');
      let boolResult = secondSide === firstSide;
      return boolResult;
    }
    if (this.boolResult) {
      return (this.redToggle = true);
    } else {
      return (this.redToggle = false);
    }
  }

  zeroInString(elem) {
    elem.find((element: any) => {
      if (element === 0) {
        return (this.zeroToggle = true);
      } else {
        return (this.zeroToggle = false);
      }
    });
  }
  allNumber(elem: any) {
    let v = [];
    for (let i = 0; i < elem.length; i++) {
      if (elem[i] === this.digit[elem[i]]) {
        v.push(true);
      } else {
        v.push(false);
      }
    }
    v.every((item) =>
      item === true ? (this.blueToggle = true) : (this.blueToggle = false)
    );
  }
  stop() {
    this.sub.unsubscribe();
  }
}
