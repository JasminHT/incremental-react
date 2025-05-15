import React from 'react';
import { useHoverCost } from '../hooks/useHoverCost.js';
import { useGameState } from 'hooks/useGameState.js';


export default function ObjectHint() {
  const { hover_cost, hover_type, setHoverCost, clearHoverCost } = useHoverCost();
	const { affordPartialCost } = useGameState();

	var affordance = {};

	if (hover_cost) {
		for (let[cost_resource, cost_value] of Object.entries(hover_cost)) {
			if (affordPartialCost(hover_type, cost_resource))  //suffix should be here
				affordance[cost_resource] = 'black';
			else
				affordance[cost_resource] = 'red';
		}
	}

	if (hover_cost)  
		return (
			<div className="Hint">
				Cost: 
				{Object.entries(hover_cost).map(([resource, amount]) => (

					<span>{resource}: {amount}; </span>

				))}
			</div> 
		)
	else 
		return (
		<div className="Hint"></div>
		)
}
