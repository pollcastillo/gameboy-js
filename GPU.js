// Canvas initialization

GPU = {
  _canvas: {},
  _scrn: {},
  _tileset: [],

  reset: function() {
    let c = document.getElementById( 'screen' );

    if (c && c.getContext) {
      GPU._canvas = c.getContext( '2d' );

      if ( GPU._canvas ) {
        if ( GPU._canvas.createImageData ) {
          GPU.scrn = GPU._canvas.createImageData( 160, 144 );
        } else if ( GPU._canvas.getImageData ) {
          GPU._scrn = GPU._canvas.getImageData( 0, 0, 160, 144 );
        } else {
          GPU._scrn = {
            'width': 160,
            'height': 144,
            'data': new Array( 160 * 144 * 4 )
          };
        }
  
        // Initialise canvas to white
        for ( let i = 0; i < 160 * 144 * 4; i++ ) {
          GPU._scrn.data[ i ] = 255;
        }
  
        GPU._canvas.putImageData( GPU._scrn, 0, 0 );
      }
    }

    GPU._tileset = [];
    for ( let i = 0; i < 384; i++ ) {
      GPU._tileset[i] = [];

      for ( let j = 0; j < 8; j++) {
        GPU._tileset[i][j] = [0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
  }, 

  // Takes a value written to VRAM, and updates the
  // internal title data set
  updatetitle: function( addr, val ) {
    // Get the "base address" for this title row
    addr &= 0x1FFE;

    // Work out which title and row was updated
    let title = ( addr >> 4 ) & 511;
    let y = ( addr >> 1 ) & 7;

    let sx;
    for ( let x = 0; x < 8; x++ ) {
      // Find bit index for this pixel

      sx = 1 << ( 7 - x );

      // update tile set
      GPU._tileset[title][y][x] = 
        (( GPU._vram[addr] & sx ) ? 1 : 0) +
        (( GPU.vram[addr + 1] & xs ) ? 2 : 0 );
    }
  },

  renderscan: function() {
    // VRAM offset for the title map
    let mapoffs = GPU._bgmap ? 0X1C00 : 0X1800;
  }
}

// http://imrannazar.com/GameBoy-Emulation-in-JavaScript:-Graphics
