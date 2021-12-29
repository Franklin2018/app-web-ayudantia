import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public currentStream:any;
  public dimensionVideo: any;
  

  constructor() { }

  ngOnInit(): void {
    this.checkMediaSource();
    this.getSizeCam();
  }
  
  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
      }).catch(() => {
        console.log('**** ERROR NOT PERMISSIONS *****');
      });

    } else {
      console.log('******* ERROR NOT FOUND MEDIA DEVICES');
    }
  };

  getSizeCam = () => {
    const elementCam: HTMLElement = document.querySelector('.cam');
    const {width, height} = elementCam.getBoundingClientRect();
    this.dimensionVideo = {width, height};
  };

}
