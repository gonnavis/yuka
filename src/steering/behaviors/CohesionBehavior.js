/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import { SteeringBehavior } from '../SteeringBehavior.js';
import { SeekBehavior } from './SeekBehavior.js';
import { Vector3 } from '../../math/Vector3.js';

const centerOfMass = new Vector3();

class CohesionBehavior extends SteeringBehavior {

	constructor() {

		super();

		// internal behaviors

		this._seek = new SeekBehavior();

	}

	calculate( vehicle, force /*, delta */ ) {

		centerOfMass.set( 0, 0, 0 );

		const neighbors = vehicle.neighbors;

		// iterate over all neighbors to calculate the center of mass

		for ( const neighbor of neighbors ) {

			centerOfMass.add( neighbor.position );

		}

		if ( neighbors.size > 0 ) {

			centerOfMass.divideScalar( neighbors.size );

			// seek to it

			this._seek.target = centerOfMass;
			this._seek.calculate( vehicle, force );

			// the magnitude of cohesion is usually much larger than separation
			// or alignment so it usually helps to normalize it

			force.normalize();

		}

	}

}

export { CohesionBehavior };
