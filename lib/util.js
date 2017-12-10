class Util {
	dist(pos1, pos2) {

	}

	wrap(coord, max) {
		if (coord > max) {
			return coord - max;
		} else {
			return coord;
		}
	}
}

export default Util;