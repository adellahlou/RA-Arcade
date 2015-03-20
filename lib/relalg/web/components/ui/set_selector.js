/*
 * This component provides the UI and controller for changing dataset
 */
define(['flight/lib/component'], function(defineComponent) {
    return defineComponent(setSelector)

    function setSelector() {
        this.defaultAttrs({
            spanSelector: 'span',
            linkSelector: '#datasetList li a',
            listSelector: '#datasetList',
            allSelector: '*'
        });


        /* Hides and shows the components as needed*/
        this.playgroundMode = function(e, data) {
            this.$node.show();
        };

        this.arcadeMode = function(e, data) {
            this.$node.hide();
        };

        this.levelSelectMode = function(e, data) {
            this.$node.hide();
        };

        //called when dataset is added
        this.dataSetAdded = function(e, data) {
            var link = $('<li>')
                .append(
                    $('<a>')
                    .attr('href', '#')
                    .text(data.name)
                    .data('set', data.name)
            );
            this.select('listSelector').append(link);
        };

        //called when data set clicked on
        this.dataSetSelected = function(e, data) {
            var $link = $(e.target);
            this.trigger('uiSetSelected', {
                name: $link.data('set')
            });
            e.preventDefault();
        };
        
        this.resetSetsHandler = function(e,data) {
            console.log('set-selector reset');
            this.select('listSelector').html('');
        };

        //attaches the listeners
        this.after('initialize', function() {
            this.on(document, 'dataSetAdded', this.dataSetAdded);
            this.on('click', {
                linkSelector: this.dataSetSelected
            });
            
            this.on(document, 'resetSets', this.resetSetsHandler);
            this.on(document, 'setPlaygroundMode', this.playgroundMode);
            this.on(document, 'setArcadeMode', this.arcadeMode);
            this.on(document, 'setLevelSelectMode', this.levelSelectMode);
        });
    }
})