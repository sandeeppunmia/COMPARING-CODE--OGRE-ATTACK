AFRAME.registerComponent("color-balls",{
    init:function(){
        this.shootballs();
    },
    shootballs:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var balls = document.createElement("a-entity");
                balls.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:100
                })
                balls.setAttribute("material","color","black");
                var cam = document.querySelector("#camera-rig");
                pos = cam.getAttribute("position")
                balls.setAttribute("position",{
                    x:pos.x,
                    y:pos.y + 1,
                    x:pos.z - 0.5
                });
                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                balls.setAttribute("velocity",direction.multiplyScalar(-10));
                var scene = document.querySelector("#scene");
                balls.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0"
                })
                balls.setAttribute("visible",false);
                balls.addEventListener("collide",this.removeBalls);
                scene.appendChild(balls);
                console.log(scene)
                this.shootSound();
            }
        })
    },
    removeBalls: function (e) {
        var scene = document.querySelector("#scene");
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;
        var paint = document.createElement("a-entity");
        var pos = element.getAttribute("position")
        var rotate = elementHit.getAttribute("rotation")
        paint.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });
        paint.setAttribute("rotation", {
          x: rotate.x,
          y: rotate.y,
          z: rotate.z,
        });
        paint.setAttribute("scale", {
          x: 2,
          y: 2,
          z: 2,
        });
        var colorNum = parseInt(Math.random() * 5 + 1)
        paint.setAttribute("material", {
          opacity: 1,
          transparent: true,
          src: "./images/paint splash-0" + colorNum + ".png"
        });
        paint.setAttribute("geometry", {
          primitive: "plane",
          width: 0.5,
          height: 0.5
        });
        scene.appendChild(paint)
        element.removeEventListener("collide", this.removeBalls);
        scene.removeChild(element);
    },
    shootSound:function(){
        var entity = document.querySelector("#sound1");
        entity.components.sound.playSound();
    }
  })