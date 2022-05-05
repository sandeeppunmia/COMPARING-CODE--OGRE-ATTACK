AFRAME.registerComponent("fireballs",{
    init:function(){
        setInterval(this.throwFireballs,2000)
    },
    throwFireballs:function(){
        var els = document.querySelector(".ogre")
        for(var i=0;i<els.length;i++){
            var fireballs=document.createElement("a-entity");
            fireballs.setAttribute("geometry",{
                primitive:"sphere",
                radius:0.1
            })
            fireballs.setAttribute("gltf-model","./models/fireball/scene.gltf")
            var position=els[i].getAttribute("position")
            position.setAttribute("position",{
                x:position.x+1.5,
                y:position.y+3.5,
                z:position.z
            })
            var scene=document.querySelector("#scene");
            scene.appendChild(fireballs);
            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();
            var ogre = els[i].object3D;
            var player=document.querySelector("#weapon").object3D;
            player.getWorldPosition(position1);
            ogre.getWorldPosition(position2);
            var direction=new THREE.Vector3();
            direction.subVectors(position1,position2).normalize();
            fireballs.setAttribute("velocity",direction.multiplyScalar(10));
            fireballs.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:"0"
            });
            var element=document.querySelector("#countLife");
            var playerLife=parseInt(element.getAttribute("text").value);
            fireballs.addEventListener("collide",function(e){
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife>0){
                        playerLife>=0;
                        element.setAttribute("text",{
                            value:playerLife
                        });
                    }
                    if(playerLife<=0){
                        var text = document.querySelector("#over");
                        text.setAttribute("visible",true);
                        var ogreEl = document.querySelector(".ogre")
                        for(var i=0;i<ogreEl.length;i++){
                            scene.removeChild(ogreEl[i])
                        }
                    }
                }
            });
        }
    }
})