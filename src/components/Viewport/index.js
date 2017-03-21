import React from 'react';

export default ({ playerHpPercentage, map, player, darkness}) => {

	let viewport = map;

	const viewDistance = 15;
	const lightDistance = 7;

	if (darkness) {
		viewport = viewport.map(
			(row, rowKey) => row.map(
				(cell, cellKey) => (
						(cellKey < player.col +lightDistance) &&
						(cellKey > player.col -lightDistance) &&
						(rowKey  < player.row +lightDistance) &&
						(rowKey  > player.row -lightDistance)
						? cell : cell="darkness"
				)
			)
		)
	}

	const mapRowLenght = map.length;
	const mapColLenght = map[0].length

	const lowerRowFilter = Math.min(player.row - viewDistance, mapRowLenght - viewDistance*2)
	const higherRowFilter = Math.max (player.row + viewDistance, viewDistance*2) ;
	//higher = player.row + viewdistance
	const lowerColFilter = Math.min(player.col - viewDistance, mapColLenght - viewDistance*2)
	const higherColFilter =	Math.max(player.col + viewDistance, viewDistance*2)

	viewport = viewport.filter( (row, rowKey) =>
							rowKey > lowerRowFilter && rowKey < higherRowFilter
	)
	viewport = viewport.map(
		row => row.filter( (cell, cellKey) =>
			cellKey > lowerColFilter && cellKey < higherColFilter
		)
	)

	return (
		<div className="viewport">
				{
					viewport.map( (row, rowKey) => {
						return (
							<div key={rowKey} className="row">
								{
									row.map( (cell, cellKey) => {
										const entityType = cell.split(" ")[0];

										let healthBarDiv;
											if (entityType === "enemy" || entityType === "player") {
												let healthPercentage;
												let hpBarFill;
												if (entityType === "enemy") {
													healthPercentage = cell.split(" ")[2]+'%';
													hpBarFill = "redFill";
												} else {
													healthPercentage = playerHpPercentage;
													hpBarFill = "greenFill"
												}
												healthBarDiv = 	<div className="onMapHpBar">
																					<div className={hpBarFill} style={{ width: healthPercentage }}></div>
																				</div>;
											}

										let entityLabel;
											switch (entityType) {
												case "enemy":
													entityLabel = "Enemy";
													break;
												case "health":
													entityLabel = "HP Pot";
													break;
												case "weapon":
													entityLabel = "Weapon";
													break;
												case "exit":
													entityLabel = "Exit";
													break;
												default:
													entityLabel = "";
											}

										return (
											<div className={cell} key={rowKey+''+cellKey}  data-label={entityLabel} >
												{ healthBarDiv || '' }
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
	)
}
