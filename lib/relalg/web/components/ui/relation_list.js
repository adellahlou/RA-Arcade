/*
 * Component for selecting relation to view
 */
define(['jquery', 'flight/lib/component', '../../../tree', '../../../util/htmlify'],
    function($, defineComponent, Tree, htmlify) {
        return defineComponent(relation_list)

        function relation_list() {
            var selectedRelation;

            this.defaultAttrs({
                tailSelector: '.list .divider',
                itemSelector: '.list .relation',
                linkSelector: '.list .relation a',
                addSelector: '.list .btn-group .add',
                removeSelector: '.list .btn-group .remove',
                allSelector: '*'
            });

            /* Hides and shows the components as needed*/
            this.playgroundMode = function(e, data) {
                this.$node.show();
                this.select('allSelector').show();
                this.select('addSelector').show();
                this.select('removeSelector').show();
            };
            //mode for while in level
            this.arcadeMode = function(e, data) {
                this.$node.show();
                this.select('allSelector').show();
                this.select('addSelector').hide();
                this.select('removeSelector').hide();
            };
            ///mode to choose levels
            this.levelSelectMode = function(e, data) {
                this.$node.hide();
            };

            //called when Add button pressed
            this.relationAdded = function(e, data) {
                var li = $('<li>')
                    .addClass('relation')
                    .attr('data-relation', data.name)
                    .append($('<a>')
                        .attr('href', '#')
                        .html(htmlify(new Tree.RelationReference(data.name)))
                ).insertBefore(this.select('tailSelector'))
            };

            //called when dataset is changed
            this.setChanged = function(e, data) {
                var setName = data.name;
                if (setName !== 'Player-Set') {
                    this.select('addSelector').hide();
                    this.select('removeSelector').hide();
                } else {
                    this.select('addSelector').show();
                    this.select('removeSelector').show();
                }
            };
            
            //called when UI button is selected
            this.relationSelected = function(e, data) {
                selectedRelation = data.name
                this.select('itemSelector').removeClass('active')
                this.select('itemSelector').filter('[data-relation="' + selectedRelation + '"]').addClass('active')
            };

            this.selectRelation = function(e, data) {
                var relationName = $(data.el).parent().data('relation');
                this.trigger('uiRelationSelected', {
                    name: relationName
                })

                e.preventDefault()
            };

            this.addRelation = function(e) {
                var name = window.prompt('Enter a name for the new relation')
                this.trigger('uiAddRelation', {
                    name: name
                });
            };

            this.removeRelation = function(e) {
                if (window.confirm('Are you sure you want to delete ' + selectedRelation))
                    this.trigger('uiRemoveRelation', {
                        name: selectedRelation
                    });
            };

            this.relationRemoved = function(e, data) {
                this.select('itemSelector').filter('[data-relation="' + data.name + '"]').remove();
            };

            //attaches the listeners
            this.after("initialize", function() {
                this.on(document, 'relationAdded', this.relationAdded);
                this.on(document, 'relationSelected', this.relationSelected);
                this.on(document, 'relationRemoved', this.relationRemoved);
                this.on(document, 'uiSetSelected', this.setChanged);

                this.on("click", {
                    linkSelector: this.selectRelation,
                    addSelector: this.addRelation,
                    removeSelector: this.removeRelation
                });

                this.on(document, 'setPlaygroundMode', this.playgroundMode);
                this.on(document, 'setArcadeMode', this.arcadeMode);
                this.on(document, 'setLevelSelectMode', this.levelSelectMode);
            })
        }
    })