import { useState, useContext, createContext } from 'react';

const ColorContext: React.Context<any> = createContext(() => {});

export const useColors = () => {
	return (
		useContext(ColorContext)
	)
}

export const ColorProvider = ({children}: any) => {
	const [position, positionSet] = useState<{x: number, y: number}>({x: 0, y: 0});

	const handleDrag = (e: any, ui:any) => {
		positionSet({
			x: position.x + ui.deltaX,
			y: position.y + ui.deltaY
		})
	}
	const handleClick = (e: any) => {
		e.preventDefault();
		const parentPosition = getPosition(e.currentTarget);
		const xPosition = e.clientX - parentPosition.x
		const yPosition = e.clientY - parentPosition.y

		positionSet({
			...position, x: xPosition, y: yPosition
		})
	}
	const getPosition= (el: any) => {
		let xPos = 0;
		let yPos = 0;

		while (el) {
			if (el.tagName === "BODY") {
				let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
				let yScroll = el.scrollTop || document.documentElement.scrollTop;
				xPos += (el.offsetLeft - xScroll + el.clientLeft);
				yPos += (el.offsetTop - yScroll + el.clientTop);
			}
			else {
				xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			}
			el = el.offsetParent;
		}
		return {
		    x: xPos,
		    y: yPos
		  };
	}
	return (
		<ColorContext.Provider value = {{handleDrag, position, positionSet, handleClick}}>
			{children}
		</ColorContext.Provider>
	)
}