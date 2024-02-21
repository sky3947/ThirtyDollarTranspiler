// TrackPieces types: Section and Segment.

/**
 * @abstract
 */
class TrackPiece {
  constructor () {
    if (new.target === TrackPiece)
      throw new TypeError('Cannot instantiate an abstract class');
  }

  /** @abstract */
  addData() {
    throw new Error('Abstract method is not implemented');
  }

  /**
   * @abstract
   * @returns {string}
   */
  toString() {
    throw new Error('Abstract method is not implemented');
  }
}

class Section extends TrackPiece {
  /** @type {TrackData[]} */
  data = [];

  constructor () {
    super();
  }

  /**
   * @param {TrackData} trackData 
   */
  addData(trackData) {
    this.data.push(trackData);
  }
}

class Segment extends TrackPiece {
  /** @type {Section[]} */
  data = [];

  /** @type {string} */
  alias;

  /** @type {number} */
  label;

  /** @type {number[]} */
  prepend = [];

  /** @type {number[]} */
  append = [];

  constructor () {
    super();
  }

  /**
   * @param {Section} section 
   */
  addData(section) {
    this.data.push(section);
  }

  /**
   * @param {number} label 
   */
  addPrepend(label) {
    this.prepend.push(label)
  }

  /**
   * @param {number} label 
   */
  addAppend(label) {
    this.append.push(label)
  }
}

// TrackData types: Divider, Instrument, GlobalVolume, Clear, Tempo, Goto, Label

/**
 * @abstract
 */
class TrackData {
  constructor () {
    if (new.target === TrackData)
      throw new TypeError('Cannot instantiate an abstract class');
  }

  /**
   * @abstract
   * @returns {string}
   */
  toString() {
    throw new Error('Abstract method is not implemented');
  }
}

class Divider extends TrackData {
  constructor () {
    super();
  }
}

class Instrument extends TrackData {
  /** @type {{ pitchData: string[], volumeData: number[] }} */
  data = { pitchData: [], volumeData: [] }

  constructor () {
    super();
  }
}

class GlobalVolume extends TrackData {
  /** @type {number[]} */
  data = [];

  constructor () {
    super();
  }
}

class Clear extends TrackData {
  /** @type {string[]} */
  data = [];

  constructor () {
    super();
  }
}

class Tempo extends TrackData {
  /** @type {string[]} */
  data = [];

  constructor () {
    super();
  }
}

class Goto extends TrackData {
  /**
   * @param {number} data 
   */
  constructor (data) {
    super();
    this.data = data;
  }
}

class Label extends TrackData {
  /**
   * @param {number} data 
   */
  constructor (data) {
    super();
    this.data = data;
  }
}
