/*
 * This component is built of the ace editor. Ace customization credit goes to Github community
 * for their work on the grammar for Relational Algebra that could be extended
 */
define(['flight/lib/component', 'ace/ace', '../../../relation'], function (defineComponent, ace, Relation) {

    return defineComponent(input);

    function input() {
        var ENV;

        this.editor = undefined;

        this.defaultAttrs({
            evaluateSelector: '.evaluate',
            graphSelector: '.graph',
            editorSelector: '#editor',
            allSelector: '*'
        });

        this.levelSelectMode = function (e, data) {
            this.select('allSelector').hide();
        };
        
        this.arcadeMode = function(e, data) {
            this.select('allSelector').show();
        };
        
        this.playgroundMode = function(e, data) {
            this.select('allSelector').show();
        };

        this.getInput = function () {
            return this.editor.getValue()
        };

        this.evaluate = function (e) {
            this.trigger('evaluate', {
                expression: this.getInput()
            });
        };

        this.graph = function (e) {
            this.trigger('graph', {
                expression: this.getInput()
            })
        }

        this.ok = function () {
            this.select('graphSelector').attr('disabled', null)
            this.select('evaluateSelector').attr('disabled', null)
        };

        this.parseError = function (error) {
            this.select('graphSelector').attr('disabled', 'disabled')
            this.select('evaluateSelector').attr('disabled', 'disabled')
        };

        this.typeError = function (error) {
            this.select('graphSelector').attr('disabled', null);
            this.select('evaluateSelector').attr('disabled', 'disabled');
        };

        this.enviromentChange = function (e, data) {
            ENV = data.ENV;
            var mode = this.editor.getSession().getMode();
            if (mode.setEnviroment) mode.setEnviroment(ENV);
        }

        this.after('initialize', function () {
            this.editor = ace.edit(this.select('editorSelector')[0].id);
            this.editor.setShowPrintMargin(false);
            this.editor.getSession().setMode("web/components/ace/mode");
            this.editor.getSession().on('changeMode', function () {
                var mode = this.editor.getSession().getMode()
                mode.on('ok', this.ok.bind(this))
                mode.on('parse_error', this.parseError.bind(this))
                mode.on('type_error', this.typeError.bind(this))
                mode.setEnviroment(ENV)
            }.bind(this))

            this.on('click', {
                evaluateSelector: this.evaluate,
                graphSelector: this.graph,
            })
            this.on(document, 'enviromentChange', this.enviromentChange);
            
            this.on(document, 'setPlaygroundMode', this.playgroundMode);
            this.on(document, 'setArcadeMode', this.arcadeMode);
            this.on(document, 'setLevelSelectMode', this.levelSelectMode);
        })
    };
})