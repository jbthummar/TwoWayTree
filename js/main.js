(function() {

	$(document).ready( function() {

		var CanvasControl = function( options ) {
			this.config = {
				hRularHeight : 20,
				vRularWidth: 20,
				ruralBorderWidth: 1,
				offsetView: 5,
				processWidth: 100,
				processHeight: 50,
				connectorWidth: 50,
				levelWidth : 100,
				levelHeight: 200
			};
			this.$elm = $( '#' + options.id );
			this.elm = this.$elm[ 0 ];
			this.zf = options.zf;
			this.data = data;
			
			this.size = null;
			this.contentStartPoint = null;
			this.contentSize = null;
			this.center = null;
			this.origin = null;

			this.processes = [];
			this.levelXPositions = {};

			this.onResize();
			this._calculateProcessPositions();
			this._drawProcesses();
			this._drawRular();
			paper.view.draw();
		};

		CanvasControl.prototype = {

			onResize : function() {
				paper.setup( this.elm );
				this.size = new paper.Size( paper.view.viewSize.getWidth(), paper.view.viewSize.getHeight() );
				this.contentSize = new paper.Size( this.size.width - this.config.vRularWidth - this.config.offsetView,
												   this.size.height - this.config.hRularHeight - this.config.offsetView );
				this.center = new paper.Point( this.contentSize.width/ 2, this.contentSize.height/ 2);
				this.origin = this.center.clone();

				// this.width = parseInt( window.getComputedStyle( this.elm ).width, 10 ) * this.zf;
				// this.height = parseInt( window.getComputedStyle( this.elm ).height, 10 ) * this.zf;

				// this.$elm.prop( 'width', this.width );
				// this.$elm.prop( 'height', this.height );
			},

			_calculateProcessPositions: function() {
				var offset = 0;
				for( var i = this.data.minLevelX, j = 0; i <= this.data.maxLevelX; i++, j++ ) {
					this.levelXPositions[ i ] = ( j * this.config.processWidth ) + offset;
					offset += this.config.connectorWidth;
				}
				console.log( this.levelXPositions);

				var maxLeafNodesLeftEnd = 0, maxLeafNodesRightEnd = 0;

				this.data.nodes.length.forEach( function( node ) {
					if( node.level === this.data.minLevelX ) {
						maxLeafNodesLeftEnd++;
					}
					else if( node.level === this.data.maxLevelX ) {
						maxLeafNodesRightEnd++;
					}
				});

				


			},

			_drawProcesses : function() {
				this.contentStartPoint = new paper.Point( this.config.vRularWidth + this.config.offsetView, this.config.hRularHeight + this.config.offsetView );
				// 	avalaibleWidth = paper.view.viewSize.getWidth() - startPoint.x,
				// 	avalaibleHeight = paper.view.viewSize.getHeight() - startPoint.y;

				// this._calculateXLevelsToDraw( avalaibleWidth, this.center, this.config.levelWidth );

			},

			_calculateXLevelsToDraw : function( width, center, levelWidth ) {

				var i = center.x,
					levelsInView = [];

				
			},

			_drawRular: function() {
				this._drawHRular();
				this._drawVRular();
			},

			_drawHRular : function() {
				var startPoint = new paper.Point( this.config.vRularWidth + 0.5, 0.5 );
				var rect = new paper.Path.Rectangle( startPoint, new paper.Size( paper.view.viewSize.getWidth() - startPoint.x - 0.5, this.config.hRularHeight ));
				rect.strokeColor = 'red';
				rect.strokeWidth = 2;
				// var text = 
			},

			_drawVRular : function() {
				var startPoint = new paper.Point( 0.5, this.config.hRularHeight + 0.5 );
				var rect = new paper.Path.Rectangle( startPoint, new paper.Size( this.config.vRularWidth, paper.view.viewSize.getHeight() - startPoint.y - 0.5 ));
				rect.strokeColor = 'red';
				rect.strokeWidth = 2;
				// var text = 
			}
		};

		var canvasObject = new CanvasControl({ 
			id : 'main-canvas', 
			zf : window.devicePixelRatio || 1,
			data : data
		});

	});

})();

var data = {
	minLevelX: -2,
	maxLevelX: 2,
	nodes: [ 
		{
			id: 0,
			level: 0,
			type: 'root',
			left: [-1,-2],
			right: [1,2],
			text: 'Sample'
		},
		{
			id: -1,
			level: -1,
			type: 'left',
			left: [],
			right: [0],
			text: 'Sample -1'
		},
		{
			id: -2,
			level: -1,
			type: 'left',
			left: [],
			right: [0],
			text: 'Sample -2'
		},
		{
			id: 1,
			level: 1,
			type: 'right',
			left: [0],
			right: [],
			text: 'Sample 1'
		},
		{
			id: 2,
			level: 1,
			type: 'right',
			left: [0],
			right: [],
			text: 'Sample 2'
		}
	]
};