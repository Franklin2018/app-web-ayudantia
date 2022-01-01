import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FaceApiService } from 'src/app/face-api.service';
import { VideoPlayerService } from 'src/app/video-player.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public currentStream:any;
  public responses=["","","","",""];
  public dimensionVideo: any;
  listEvents: Array<any> = [];
  overCanvas: any;
  listExpressions: any = [];
  

  constructor(
    private faceApiService: FaceApiService,
    private videoPlayerService: VideoPlayerService,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.checkMediaSource();
    this.getSizeCam();

  }

  onSubmit(){
    console.log(this.responses);
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
    console.log(this.dimensionVideo)

    
  };

  createCanvasPreview = (videoElement: any) => {
    if (!this.overCanvas) {
      const {globalFace} = this.faceApiService;
      this.overCanvas = globalFace.createCanvasFromMedia(videoElement.nativeElement);
      this.renderer2.setProperty(this.overCanvas, 'id', 'new-canvas-preview');
      const elementPreview = document.querySelector('.canvas-preview');
      this.renderer2.appendChild(elementPreview, this.overCanvas);
    }
  };

}
