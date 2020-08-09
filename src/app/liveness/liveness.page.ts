import { Camera } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
// import * as faceapi from 'face-api.js';
declare var faceapi;

@Component({
  selector: 'app-liveness',
  templateUrl: './liveness.page.html',
  styleUrls: ['./liveness.page.scss'],
})
export class LivenessPage implements OnInit {

  options: AnimationOptions = {
    path: '/assets/imgs/liveness/28265-hourglass-loading.json',
  };

  options2: AnimationOptions = {
    path: '/assets/imgs/liveness/10236-reward-badge.json',
  };

  video;
  ready: boolean = true;
  instructions = [
    { ins: 'Posicione seu rosto e aguarde a detecção e instruções', time: null },
    { ins: 'Sorria Durante 3 segundos', time: 3000 },
    { ins: 'Feche um dos olhos durante 5 segundos', time: 5000 },
    { ins: 'Olhe para o lado durante 5 segundos', time: 5000 },
    { ins: 'Aguarde o processamento...', time: null },
  ];

  step = 0;
  instructionAtual = '';
  controlStep1 = 0;
  controlStep2 = 0;
  controlStep3 = 0;
  controlStep4 = 0;

  dataEnvio = {
    st: { base64Img: null },
    so: { base64Img: null },
    pi: { base64Img: null }
  }

  stream;
  controlAudio = 0;

  mediaRecorder;
  chunks: any[] = [];
  finalizado: boolean = false;


  constructor(
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    public androidPermission: AndroidPermissions,
    public activatedRoute: ActivatedRoute,
    public camera: Camera,
    public plt: Platform
  ) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(() => {
      this.init();
      // setTimeout(() => {
        // this.ready = false;
        // this.instructionAtual = this.instructions[0].ins;
        // this.init();
      // }, 10000)
    })
  }

  async init() {
    // let load = await this.loadCtrl.create({});
    // load.present();
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
      faceapi.nets.faceLandmark68Net.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
      faceapi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
      faceapi.nets.faceExpressionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
    ]).then(() => {
      console.log("ENTROU AQUI");
      this.video = document.getElementById('video');
      // this.androidPermission.requestPermission(this.androidPermission.PERMISSION.CAMERA).then(() => {
        this.startVideo();
        this.video.addEventListener('play', () => {
          this.ready = false;
          // load.dismiss();
          const canvas = faceapi.createCanvasFromMedia(this.video);
          document.body.appendChild(canvas);

          const displaySize = {
            width: this.video.width,
            height: this.video.height
          }

          faceapi.matchDimensions(canvas, displaySize);
          this.instructionAtual = this.instructions[this.step].ins;
          let setIntervalVar = setInterval(async () => {

            const detections = await faceapi.detectAllFaces(this.video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.style.top = document.getElementById('video').offsetTop + 'px';
            canvas.style.left = document.getElementById('video').offsetLeft + 'px';
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            // faceapi.draw.drawDetections(canvas, resizedDetections);
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            // console.log('DETECTIONS ==> ', detections);

            if (detections[0]) {
              var canvas2: any = document.getElementById('canvasVideo');
              canvas2.height = this.video.videoHeight;
              canvas2.width = this.video.videoWidth;
              var ctx = canvas2.getContext('2d');
              this.controlStep1++
              if (this.controlStep1 >= 3 && this.step === 0) {
                ctx.drawImage(this.video, 0, 0);

                let img0 = canvas2.toDataURL("image/jpeg", 0.9);
                this.dataEnvio.st.base64Img = img0;
                this.step++;
                this.controlAudio++;
                console.log("STEP / ==> ", this.step, this.instructions[this.step].ins);
                this.instructionAtual = this.instructions[this.step].ins;
              }
              if (detections[0].expressions.happy > 0.90 && this.step === 1) {
                this.controlStep2++;

                if (this.controlStep2 >= 3 && this.step === 1) {
                  ctx.drawImage(this.video, 0, 0);
                  let img = canvas2.toDataURL("image/jpeg", 0.9);
                  this.dataEnvio.so.base64Img = img;
                  this.step++;
                  this.controlAudio++;
                  console.log("STEP // ==> ", this.step, this.instructions[this.step].ins);
                  this.instructionAtual = this.instructions[this.step].ins;
                }

              }
            }

            if (detections.length === 0 && this.step === 3) {
              this.controlStep3++;

              if (this.controlStep3 >= 3 && this.step === 3) {
                this.step++;
                console.log("STEP /// ==> ", this.step, this.instructions[this.step].ins);
                this.instructionAtual = this.instructions[this.step].ins;
                this.video.style.display = 'none';
                // document.getElementById('imgTeste').setAttribute('src', this.dataEnvio.so.base64Img);
                this.stream.getTracks().forEach(t => {
                  console.log('STOP')
                  t.stop();
                })
                clearInterval(setIntervalVar);
                this.finalizado = true;
              }
            }

            if (this.step === 2) {
              this.step++;
              console.log("STEP //// ==> ", this.step, this.instructions[this.step].ins);
              setTimeout(() => {

                ctx.drawImage(this.video, 0, 0);
                let img2 = canvas2.toDataURL("image/jpeg", 0.9);
                this.dataEnvio.pi.base64Img = img2;
                this.instructionAtual = this.instructions[this.step].ins;
                this.controlAudio++;
              }, 5000);
            }


          }, 1000)
        })
      }).catch(err => {
        alert("ERROR 2")
      })
    // }).catch(err => {
    //   alert("ERROR 1")
    // })


  }

  startVideo() {
    navigator.mediaDevices.getUserMedia(
      { video: true }
    ).then(stream => {
      this.stream = stream;
      console.log("VAMOS LÁ ==> ", stream);
      this.video.srcObject = stream;
    }).catch((err) => {
      console.log("ME MOSTRA O ERRO ==> ", err);
    })
  }

  getPicture(canvas) {

  }

  animationCreated(event) {

  }

  goToInicio() {
    this.navCtrl.navigateRoot('');
  }

}
