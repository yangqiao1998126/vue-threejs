import * as THREE from 'three'

import Config from '../config'

// Main webGL renderer class
export default class Renderer {
  constructor(scene, container) {
    // Properties
    this.scene = scene
    this.container = container

    // Create WebGL renderer and set its antialias
    this.threeRenderer = new THREE.WebGLRenderer({
      antialias: true //抗锯齿
    })

    // Set clear color to fog to enable fog or to hex color for no fog
    this.threeRenderer.setClearColor(scene.fog.color)
    //设置像素比率
    this.threeRenderer.setPixelRatio(window.devicePixelRatio) // For retina

    // Appends canvas
    container.appendChild(this.threeRenderer.domElement)

    // Shadow map options
    this.threeRenderer.shadowMap.enabled = true//允许在场景中使用阴影贴图
    this.threeRenderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Get anisotropy for textures
    Config.maxAnisotropy = this.threeRenderer.getMaxAnisotropy()

    // Initial size update set to canvas container
    this.updateSize()

    // Listeners
    document.addEventListener('DOMContentLoaded', () => this.updateSize(), false)
    window.addEventListener('resize', () => this.updateSize(), false)
  }

  updateSize() {
    this.threeRenderer.setSize(window.innerWidth, window.innerHeight)
  }

  render(scene, camera) {
    // Renders scene to canvas target
    this.threeRenderer.render(scene, camera)
  }
}
