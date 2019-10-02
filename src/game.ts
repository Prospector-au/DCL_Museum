import utils from "../node_modules/decentraland-ecs-utils/index"

const environment = new Entity()
const glass = new Entity()
const lift = new Entity()
const grass = new Entity()
const wind = new Entity()
const intro = new Entity()
const chamber = new Entity()
const basement = new Entity()
const fundament = new Entity()


let grassAnimator = new Animator()
const grassClip = new AnimationState('wind')
let liftAnimator = new Animator()
const downClip = new AnimationState('down')
const upClip = new AnimationState('up')
grassClip.looping = true
downClip.looping = false
upClip.looping = false
downClip.speed = 0.2
upClip.speed = 0.2

const windSoundClip = new AudioClip('sounds/wind.mp3')
const windSource = new AudioSource(windSoundClip)
const introSoundClip = new AudioClip('sounds/intro.mp3')
const introSource = new AudioSource(introSoundClip)
const chamberSoundClip = new AudioClip('sounds/chamber.mp3')
const chamberSource = new AudioSource(chamberSoundClip)
const basementSoundClip = new AudioClip('sounds/basement.mp3')
const basementSource = new AudioSource(basementSoundClip)
const liftSoundClip = new AudioClip('sounds/lift.mp3')
const liftSource = new AudioSource(liftSoundClip)
introSource.loop = false
windSource.loop = true
chamberSource.loop = true
basementSource.loop = true
liftSource.loop = false


grassAnimator.addClip(grassClip)
liftAnimator.addClip(downClip)
liftAnimator.addClip(upClip)

environment.addComponent(new GLTFShape('models/env.glb'))
environment.addComponent(new Transform({ position: new Vector3(56, 0, 56)}))

fundament.addComponent(new GLTFShape('models/fund.glb'))
fundament.addComponent(new Transform({ position: new Vector3(56, 0, 56)}))

glass.addComponent(new GLTFShape('models/glass.glb'))
glass.addComponent(new Transform({ position: new Vector3(56, 0, 56)}))

grass.addComponent(new GLTFShape('models/grass.glb'))
grass.addComponent(new Transform({ position: new Vector3(56, 0, 56)}))
grass.addComponent(grassAnimator)

lift.addComponent(new GLTFShape('models/lift.glb'))
lift.addComponent(new Transform({ position: new Vector3(56, 0, 56)}))
lift.addComponent(liftAnimator)
lift.addComponent(liftSource)
let S = true
lift.addComponent(new OnClick(e => {
    if (S == true) {
    upClip.stop()
    downClip.stop()
    downClip.play()
    liftSource.playOnce()
    S = false
    }
    else {
        downClip.stop()
        upClip.play()
        liftSource.playOnce()
        S = true
    }

      
}))

wind.addComponent(new Transform({ position: new Vector3(0, 30, 0)}))
wind.addComponent(windSource)

intro.addComponent(new Transform({ position: new Vector3(56, 10, 56)}))
intro.addComponent(introSource)

chamber.addComponent(new Transform({ position: new Vector3(56, 60, 56)}))
chamber.addComponent(chamberSource)

basement.addComponent(new Transform({ position: new Vector3(56, -20, 56)}))
basement.addComponent(basementSource)

intro.addComponent(new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(55, 0, 55), Vector3.Zero()), //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
     () => { introSource.playing = true
     }, 
     null //onCameraExit
     ))


engine.addEntity(environment)
engine.addEntity(fundament)
engine.addEntity(glass)
engine.addEntity(grass)
engine.addEntity(lift)
engine.addEntity(wind)
engine.addEntity(intro)
engine.addEntity(chamber)
engine.addEntity(basement)


grassClip.play()
windSource.playing = true
chamberSource.playing = true
chamberSource.volume = 0.3
basementSource.playing = true
basementSource.volume = 1



