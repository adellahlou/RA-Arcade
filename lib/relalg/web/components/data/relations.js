/*
 * Component for handling browser storage of relations
 */
define(['flight/lib/component', '../../../relation'], function(defineComponent, Relation) {
    return defineComponent(relations)

    function relations() {
        var currentSet;

        this.defaultAttrs({
            sets: undefined,
            ogsets: undefined,
            defaultSet: undefined
        });

        this.cellChange = function(e, data) {
            this.attr.sets[currentSet][data.relation].data[data.row][data.cell] = data.newValue
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            })
            this.trigger('uiRelationSelected', {
                name: data.relation
            });
        };

        this.resetSets = function(e, data) {
            this.attr.sets = clone(this.attr.ogsets);

            for (var set in this.attr.sets)
                this.trigger('dataSetAdded', {
                    name: set
                });
            
            this.trigger('uiSetSelected', {
                name: this.attr.defaultSet
            });
        };

        this.headerChange = function(e, data) {
            // Equivalent to evaluating
            // data.relation := Rename[data.from/data.to](data.relation)
            var header = this.attr.sets[currentSet][data.relation].header;
            header[header.indexOf(data.from)] = data.to;
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            });
            this.trigger('uiRelationSelected', {
                name: data.relation
            });
        };

        this.addRelation = function(e, data) {
            // Equivalent to evaluting
            // {name} := [[''] -> ['']]
            var name = data.name;
            if (this.attr.sets[currentSet][name]) {
                for (var i = 2; this.attr.sets[currentSet][name + i]; i++);
                name = name + i;
            }
            this.attr.sets[currentSet][name] = new Relation([''], [
                ['']
            ]);
            this.trigger('relationAdded', {
                name: name
            });
            this.trigger('uiRelationSelected', {
                name: name
            });
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            });
            return name;
        };

        this.removeRelation = function(e, data) {
            delete this.attr.sets[currentSet][data.name];
            this.trigger('relationRemoved', {
                name: data.name
            });
            this.trigger('uiRelationSelected', {
                name: Object.keys(this.attr.sets[currentSet])[0]
            });
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            });
        };

        this.addRow = function(e, data) {
            // relation := relation} Union [[schema] -> [newRow]
            var relation = this.attr.sets[currentSet][data.relation];
            var newRow = relation.header.map(function() {
                return ''
            });
            relation.data.push(newRow);
            this.trigger('uiRelationSelected', {
                name: data.relation
            });
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            });
        };

        this.addColumn = function(e, data) {
            var name = data.name;
            var header = this.attr.sets[currentSet][data.relation].header;
            if (header.indexOf(name) != -1) {
                for (var i = 2; header.indexOf(name + '_' + i) != -1; i++);
                name = name + '_' + i;
            }

            this.attr.sets[currentSet][data.relation].header.push(name);
            this.attr.sets[currentSet][data.relation].data.map(function(oldRow) {
                oldRow.push('');
                return oldRow;
            });
            this.trigger('uiRelationSelected', {
                name: data.relation
            });
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            });
        };

        this.setSelected = function(e, data) {
            var dataSet, name;
            if (currentSet) {
                dataSet = this.attr.sets[currentSet];

                for (name in dataSet) {
                    this.trigger('relationRemoved', {
                        name: name
                    });
                }
            }

            currentSet = data.name;
            dataSet = this.attr.sets[currentSet];
            for (name in dataSet) {
                this.trigger('relationAdded', {
                    name: name
                });
            }
            var firstRelation = Object.keys(dataSet)[0]
            this.trigger('relationSelected', {
                name: firstRelation,
                relation: this.attr.sets[currentSet][firstRelation]
            });
            this.trigger('enviromentChange', {
                ENV: this.attr.sets[currentSet]
            });
        }

        this.relationSelected = function(e, data) {
            var relation = this.attr.sets[currentSet][data.name];
            this.trigger('relationSelected', {
                relation: relation,
                name: data.name
            });
        }

        this.enviromentChange = function(e, data) {
            this.attr.sets[currentSet] = data.ENV
        };

        this.after("initialize", function() {
            this.on('uiCellChanged', this.cellChange);
            this.on('uiHeaderChanged', this.headerChange);
            this.on('uiAddRelation', this.addRelation);
            this.on('uiRemoveRelation', this.removeRelation);
            this.on('uiAddRow', this.addRow);
            this.on('uiAddColumn', this.addColumn);
            this.on('uiRelationSelected', this.relationSelected);
            this.on('uiSetSelected', this.setSelected);
            this.on('enviromentChange', this.enviromentChange);
            this.on('resetSets', this.resetSets);

            for (var set in this.attr.sets)
                this.trigger('dataSetAdded', {
                    name: set
                });

            this.trigger('uiSetSelected', {
                name: this.attr.defaultSet
            });
            
            this.attr.ogsets = clone(this.attr.sets);
        });


        function clone(obj) {
            var copy;

            // Handle the 3 simple types, and null or undefined
            if (null == obj || "object" != typeof obj) return obj;

            // Handle Date
            if (obj instanceof Date) {
                copy = new Date();
                copy.setTime(obj.getTime());
                return copy;
            }

            // Handle Array
            if (obj instanceof Array) {
                copy = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    copy[i] = clone(obj[i]);
                }
                return copy;
            }

            // Handle Object
            if (obj instanceof Object) {
                copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
                }
                return copy;
            }

            throw new Error("Unable to copy obj! Its type isn't supported.");
        }
    }
})