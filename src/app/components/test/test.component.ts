import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FaceApiService } from 'src/app/face-api.service';
import { VideoPlayerService } from 'src/app/video-player.service';
import { AsignaturaService } from '../../services/asignatura.service';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { Test } from 'src/app/models/test';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers:[AsignaturaService]
})
export class TestComponent implements OnInit {

  public finalScore:number=0;
  public messageScore:any;
  public currentStream:any;
  public test:Test;
  public pregunta:any;
  public respuesta:any=[];
  public materiaTitle:any;
  public responses=["","","","",""];
  public dimensionVideo: any;
  listEvents: Array<any> = [];
  overCanvas: any;
  listExpressions: any = [];
  

  constructor(
    private faceApiService: FaceApiService,
    private _testService:AsignaturaService,
    private videoPlayerService: VideoPlayerService,
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private _route:ActivatedRoute,
  	private _router:Router,
  ) { 
    // this.test=new Test("","","",[this.pregunta]);
    // this.pregunta=new Pregunta("","",[this.respuesta]);
  }

  ngOnInit(): void {
    // this.checkMediaSource();
    // this.getSizeCam();
     this.setTitle();
     this.getTest();

  }


getTest(){
  this._route.params.subscribe(params=>{
    
    this._testService.getTestByMateria(params['id']).subscribe(
      response=>{
          if(response.ok == true){
           this.test=response.test;
           this.pregunta=this.test.preguntas; 

           this.pregunta.forEach(resp => {
              this.respuesta.push(resp.respuestas);  
           });

           
          }else{
            console.log(response);
          }
      },
      err=>{
        console.log(err);}
    );
  });	

  }


setTitle() {
  this._route.params.subscribe(params=>{
    
    this._testService.getAsignaturaById(params['id']).subscribe(
      response=>{
          if(response.ok == true){
           this.materiaTitle= "Test de " +response.asignatura.nombre;
          }else{
            console.log(response);
          }
      },
      err=>{
        console.log(err);
       
      }
    );
  });	


   }




  onSubmit(){
    
    this.respuesta.forEach((resp, index) => {
      if(this.responses[index] == resp[0].rc){
        this.finalScore=this.finalScore+20;
      }
    });

 if(this.finalScore >50){
  this.messageScore="Felicidades!!!, materia aprobada.";
  //TODO: Añadir la materia al auxiliar
 }else{
  this.messageScore="Solicitud rechazada, siga intentado.";

 }


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
