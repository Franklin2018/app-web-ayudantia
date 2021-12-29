import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {
  public globalFace: any;

  constructor() { 
    this.globalFace= faceapi;
  }
}
