import { Icon, Button } from 'semantic-ui-react';
import { setTool } from '../javascripts/Paper'; 

const paper = require('paper');
const _ = require('underscore');

const ConnectionTool = () => {
    // define your hitOptions
    // use match to filter out the items you want to interact with
    var hitOptions = {
      segments: false,
      stroke: false,
      fill: true,
      // tolerance: 5
    };

    var path, hitResult;

    const ZoneDetector = (event) => {
      if (hitResult) {
        var myRectangle = new paper.Path.Rectangle({
            point: [event.point.x - 10, event.point.y - 10],
            size: [20, 20],
            strokeColor: 'black',
            fillColor: 'green'
        });
      } else {
        var myCircle = new paper.Path.Circle({
            center: event.point,
            radius: 10,
            strokeColor: 'black',
            fillColor: 'red'
        });
      }
    };
    
    const cT = new paper.Tool({
        name: "connection",
        minDistance: 10,
        onMouseDown: function(event){ 
          hitResult = paper.project.hitTest(event.point, hitOptions);
          path = new paper.Path();
          path.strokeColor = 'black';
          path.strokeWidth = 10;
          ZoneDetector(event);
        },
        onMouseDrag: function(event) {
          path.add(event.point);
        },
        onMouseUp: function(event){ 
          hitResult = paper.project.hitTest(event.point, hitOptions);
          ZoneDetector(event);
        }
    });

    return (
        <Button icon onClick={() => setTool("circle")}>
            <Icon name='sitemap' />
        </Button>
    );
};

export { ConnectionTool };