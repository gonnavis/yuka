/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { SteeringBehavior } from '../SteeringBehavior.js';
import { Vector3 } from '../../math/Vector3.js';

const averageDirection = new Vector3();
const direction = new Vector3();

class AlignmentBehavior extends SteeringBehavior {

	constructor() {

		super();

	}

	calculate( vehicle, force /*, delta */ ) {

		averageDirection.set( 0, 0, 0 );

		const neighbors = vehicle.neighbors;

		// iterate over all neighbors to calculate the average direction vector

		for ( const neighbor of neighbors ) {

			neighbor.getDirection( direction );

			averageDirection.add( direction );

		}

		if ( neighbors.size > 0 ) {

			averageDirection.divideScalar( neighbors.size );

			// produce a force to align the vehicle's heading

			vehicle.getDirection( direction );
			force.subVectors( averageDirection, direction );

		}

	}

}

export { AlignmentBehavior };
