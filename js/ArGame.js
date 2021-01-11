import * as THREE from './three.module.js';
import { ARButton } from './ARButton.js';

let number;
let camera, scene, renderer;
let controller;

function Test()
{
 console.log("Test function has been called succesfully");
 number = 5;
}

function LogNumber()
{
 console.log("Printed number ", number);
}

function CreateWebsiteContainer()
{
 const container = document.createElement( 'div' );
 document.body.appendChild( container );
 console.log("Create website container function has been called")
}

function CreateArScene()
{
 scene = new THREE.Scene();
 console.log("Create scene function has been called")
}

function CreateArCamera()
{
 camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );
 console.log("Create camera function has been called")
}

function CreateLight()
{
 const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
 light.position.set( 0.5, 1, 0.25 );
 scene.add( light );
 console.log("Create light function has been called")
}

function CreateRenderer()
{
 renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
 renderer.setPixelRatio( window.devicePixelRatio );
 renderer.setSize( window.innerWidth, window.innerHeight );
 renderer.xr.enabled = true;
 container.appendChild( renderer.domElement );
 console.log("Create renderer function has been called")
}

function AddArButton()
{
 document.body.appendChild( ARButton.createButton( renderer ) );
 console.log("Create ar button function has been called")
}

function SetupUserInput()
{
 //Change this function if you want to change the function of the application
 function onSelect()
 {
  const geometry = new THREE.BoxBufferGeometry( GenerateRandomNr(0.1,0.3), GenerateRandomNr(0.1,0.3), GenerateRandomNr(0.1,0.3)).rotateX(Math.PI / GenerateRandomNr(1,4));
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
  mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
  scene.add( mesh );
 }

 controller = renderer.xr.getController( 0 );
 controller.addEventListener( 'select', onSelect );
 scene.add( controller );
 console.log("Create user input function has been called")
}

function AddWindowEvent()
{
 window.addEventListener( 'resize', onWindowResize, false );
 console.log("Create window event function has been called")
}

function OnWindowResize()
{

 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();

 renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate()
{
 renderer.setAnimationLoop( render );
}

function render()
{
 renderer.render( scene, camera );
}

export{CreateWebsiteContainer, CreateArScene, CreateArCamera, CreateLight, CreateRenderer, AddArButton, SetupUserInput, AddWindowEvent,animate};
