import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from 'three/examples/jsm/libs/dat.gui.module'

let circle;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

//CREATE THE RENDERER
const renderer = new THREE.WebGLRenderer();
//SET THE SIZE
renderer.setSize(window.innerWidth, window.innerHeight);
//ADD IT TO THE DOCUMENT
document.body.appendChild(renderer.domElement);

//ORBIT CONTROLL
const controls = new OrbitControls(camera, renderer.domElement);

//CREATE A MATERIAL
const materialBox = new THREE.MeshBasicMaterial({color: "#ff9944"});
const materialCircle = new THREE.MeshBasicMaterial({color: "#ff0011"});

//CREATE GUI
let gui = new GUI();
const cubeFolder = gui.addFolder('Cube');

/*
GEOMETRY TEST
 */

//CREATING A CUBE
const createCube = () => {
    const geometryCube = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometryCube, materialBox);
    camera.position.z = 5;
    scene.add(cube);
    cubeFolder.add(cube.scale, 'x', 1, 5);
    cubeFolder.add(cube.scale, 'y', 1, 5);
    cubeFolder.add(cube.scale, 'z', 1, 5);
}

//CREATING A CIRCLE
const createCircle = () => {
    const geometryCircle = new THREE.CircleGeometry(1, 32);
    circle = new THREE.Mesh(geometryCircle, materialCircle);
    circle.position.x = 3;
    scene.add(circle);
}



const createCone = () => {
    const geometryCone = new THREE.ConeGeometry(1, 2,10);
    const materialCone = new THREE.MeshBasicMaterial({color: "#fff000"});
    const cone = new THREE.Mesh(geometryCone, materialCone);
    cone.position.x = 3;
    scene.add(cone);
}

const edgeGeometry = () => {
    const geometryBox = new THREE.BoxGeometry(8,8,8);
    const edges = new THREE.EdgesGeometry(geometryBox);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color : 0xff11ff}))
    scene.add(line);
}

controls.update();

const animate = () => {
    requestAnimationFrame(animate);

    controls.update()

    renderer.render(scene, camera);
}
edgeGeometry();
createCube();
createCone();
// createCircle()
animate();