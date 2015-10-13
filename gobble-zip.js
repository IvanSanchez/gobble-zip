
var yazl = require('yazl');
var sander = require('sander');
var path = require('path');

module.exports = function concat ( inputdir, outputdir, options ) {

	if ( !options.dest ) {
		throw new Error( 'You must pass a \'dest\' option to gobble-concat' );
	}

// 	console.log('Zipping dir: ', inputdir);

	// Following lines for filtering files heavily inspired on gobble-concat:
	return sander.lsr( inputdir ).then( function ( allFiles ) {

		var mapSeries = require( 'promise-map-series' ),
			minimatch = require( 'minimatch' ),
			patterns = options.files,
			alreadySeen = {},
			fileContents = [];

		if ( !patterns ) {
			// use all files
			return zipFiles( allFiles.sort( options.sort ) );
		}

		if ( typeof patterns === 'string' ) {
			patterns = [ patterns ];
		}

		return mapSeries( patterns, function ( pattern ) {
			var filtered = allFiles.filter( function ( filename ) {
				var shouldInclude = !alreadySeen[ filename ] && minimatch( filename, pattern );

				if ( shouldInclude ) {
					alreadySeen[ filename ] = true;
				}

				return shouldInclude;
			});

			return filtered;
		}).then(function(filtered){
			// Flatten the sets of files matching the patterns into one big sorted list
			filtered = [].concat.apply([], filtered);
			zipFiles(filtered.sort( options.sort ));
		});



		function zipFiles(files) {
			var zipper = new yazl.ZipFile();
			var dest = path.join(outputdir, options.dest);
			for (var i in files) {
// 				console.log('Zipping: ', i, files[i]);
				zipper.addFile(path.join(inputdir, files[i]), files[i]);
			}

			return new sander.Promise(function(resolve,reject) {
				zipper.outputStream.pipe(sander.createWriteStream(dest)).on("close", function() {
// 					console.log("gobble-zip done");
					resolve();
				});
				zipper.end();
			});
		}
	});

}


