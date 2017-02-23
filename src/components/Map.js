import React from 'react';

const Map = ({ map }) => (
	<div>
		<p> here I put the map </p>
	
		{
			map.map(
				(row, rowKey) => (
					<div className="row" key={rowKey}>

					{
						row.map(
							(col, colKey) => (
								<div className={col} key={rowKey+''+colKey}> {rowKey} {colKey} </div>
							)
						)	
					}

					</div>
				)
			)
		}
	</div>
);
export default Map;
