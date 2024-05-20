import { Button, Icon } from 'semantic-ui-react';
import { useEffect } from 'react';

let _ = require('underscore');
let paper = require('paper');

const HistoryTracker = ({paperReady, undoStack, setUndoStack, redoStack, setRedoStack})=>{
    useEffect(() => {
        if(paperReady && paper.project){ 
          paper.project.clear();
        }
      }, [paperReady])

    const undo = () => {
        console.log("Undo pressed.")
        if (undoStack.length > 0) {
            const historyEvent = undoStack[0];
            const newUndoStack = undoStack.slice(1);
            console.log(historyEvent);
            historyEvent.inverse();
            setUndoStack(newUndoStack);

            const newRedoStack = [historyEvent, ...redoStack ];
            setRedoStack(newRedoStack);
        } else {
            console.log("Nothing to undo.");
        }
    }
    
    const redo = () => {
        console.log("Redo pressed.")
        if (redoStack.length > 0) {
            
            const historyEvent = redoStack[0];
            const newRedoStack = redoStack.slice(1);
            console.log(historyEvent);
            historyEvent.action();
            setRedoStack(newRedoStack);

            const newUndoStack = [historyEvent,...undoStack ];
            setUndoStack(newUndoStack);
        } else {
            console.log("Nothing to redo.");
        }
    }
    return (
        <div>
            <Button icon onClick={undo}>
                <Icon name='undo' />
            </Button>
            <Button icon onClick={redo}>
                <Icon name='redo' />
            </Button>
        </div>
    )
}


export {HistoryTracker};