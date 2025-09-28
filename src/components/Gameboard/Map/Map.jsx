import React, { useEffect, useRef, useState, useContext } from 'react';
import { PlayerDataContext, SocketContext } from '../../../App';

import mapImage from '../../../images/map.jpg';
import positionMapCoords from '../positions';
import pawnImages from '../../../constants/pawnImages';
import canPawnMove from './canPawnMove';
import getPositionAfterMove from './getPositionAfterMove';

const Map = ({ pawns, nowMoving, rolledNumber }) => {
    const player = useContext(PlayerDataContext);
    const socket = useContext(SocketContext);
    const canvasRef = useRef(null);

    const [hintPawn, setHintPawn] = useState();

    const paintPawn = (context, pawn) => {
        const { x, y } = positionMapCoords[pawn.position];
        const touchableArea = new Path2D();
        touchableArea.arc(x, y, 12, 0, 2 * Math.PI);
        const image = new Image();
        image.src = pawnImages[pawn.color];
        image.onload = function () {
            context.drawImage(image, x - 17, y - 15, 35, 30);
        };
        return touchableArea;
    };

    const handleCanvasClick = event => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect(),
            cursorX = event.clientX - rect.left,
            cursorY = event.clientY - rect.top;
        
        for (const pawn of pawns) {
            //Changes : Check if touchableArea is a valid Path2D object
            if (!pawn.touchableArea || typeof pawn.touchableArea === 'number') {
                continue;
            }
            
            try {
                if (ctx.isPointInPath(pawn.touchableArea, cursorX, cursorY)) {
                    if (canPawnMove(pawn, rolledNumber)) {
                        socket.emit('game:move', pawn._id);
                        return; //Changes : Only move one pawn per click
                    }
                }
            } catch (error) {
                console.warn('Error checking point in path for pawn click:', pawn._id, error);
                continue; //Changes : Handle canvas errors gracefully
            }
        }
        setHintPawn(null);
    };

    const handleMouseMove = event => {
        if (!nowMoving || !rolledNumber) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;
        canvas.style.cursor = 'default';
        
        for (const pawn of pawns) {
            //Changes : Check if touchableArea is a valid Path2D object
            if (!pawn.touchableArea || typeof pawn.touchableArea === 'number') {
                continue;
            }
            
            try {
                if (
                    ctx.isPointInPath(pawn.touchableArea, x, y) &&
                    player.color === pawn.color &&
                    canPawnMove(pawn, rolledNumber)
                ) {
                    const pawnPosition = getPositionAfterMove(pawn, rolledNumber);
                    if (pawnPosition) {
                        canvas.style.cursor = 'pointer';
                        if (hintPawn && hintPawn.id === pawn._id) return;
                        setHintPawn({ id: pawn._id, position: pawnPosition, color: 'grey' });
                        return;
                    }
                }
            } catch (error) {
                console.warn('Error checking point in path for pawn:', pawn._id, error);
                continue; //Changes : Handle canvas errors gracefully
            }
        }
        setHintPawn(null);
    };

    useEffect(() => {
        const rerenderCanvas = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.src = mapImage;
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
                
                //Changes : Group pawns by position to handle overlapping
                const pawnsByPosition = {};
                pawns.forEach((pawn, index) => {
                    if (!pawnsByPosition[pawn.position]) {
                        pawnsByPosition[pawn.position] = [];
                    }
                    pawnsByPosition[pawn.position].push({ pawn, index });
                });
                
                //Changes : Paint pawns and assign touchable areas
                Object.values(pawnsByPosition).forEach(positionPawns => {
                    if (positionPawns.length === 1) {
                        //Changes : Single pawn at position
                        const { pawn, index } = positionPawns[0];
                        pawns[index].touchableArea = paintPawn(ctx, pawn);
                    } else {
                        //Changes : Multiple pawns at same position - create combined touchable area
                        const { x, y } = positionMapCoords[positionPawns[0].pawn.position];
                        const combinedTouchableArea = new Path2D();
                        combinedTouchableArea.arc(x, y, 12, 0, 2 * Math.PI);
                        
                        //Changes : Paint all pawns at this position
                        positionPawns.forEach(({ pawn, index }) => {
                            paintPawn(ctx, pawn);
                            pawns[index].touchableArea = combinedTouchableArea;
                        });
                    }
                });
                
                if (hintPawn) {
                    paintPawn(ctx, hintPawn);
                }
            };
        };
        rerenderCanvas();
    }, [hintPawn, pawns]);

    return (
        <canvas
            className='canvas-container'
            width={460}
            height={460}
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
        />
    );
};
export default Map;
