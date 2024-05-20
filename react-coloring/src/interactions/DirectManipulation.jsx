import { useEffect } from 'react';

let _ = require('underscore');
let paper = require('paper');

const createDMCircle = ()=>{
    var circle = new paper.Path.Circle({
      center: paper.view.center,
      radius: 150,
      fillColor: 'red',
      strokeColor: 'black',
      strokeWidth: 2, 
      onMouseDown: function(event){
        this.fillColor = "blue";
      }, 
      onMouseDrag: function(event){
        this.position = this.position.add(event.delta);
      },
      onMouseUp: function(event){
        this.fillColor = "red";
      }
    });

}

const DirectManipulation = (paperReady) => {
  useEffect(() => {
    if(paperReady && paper.project){ 
      paper.project.clear();
      createDMCircle();
    }
  }, [paperReady])
}

export {DirectManipulation};