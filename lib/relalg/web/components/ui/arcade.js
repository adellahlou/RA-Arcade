define(['jquery', 'flight/lib/component', '../../popup'],
    function($, defineComponent, Popup) {

        return defineComponent(arcade_view);

        function arcade_view() {
            var levelSelectLabel = 'levelSelect';
            var playingLevelLabel = 'arcade';
            var playgroundLabel = 'playground';

            var levelSelectDirective = '<h3 style="display:inline">Hello! Welcome to the Relational Algebra Arcade,</h3> an interactive way to learn and practice relational algebra. If you are not familiar with RA or relations, then I suggest you read the tutorials available from the top navigation bar. The beginner levels below are meant to get you used to the basics of relational algebra and the arcade syntax. From there, it only gets more interesting with more advanced concepts and challenging levels!';

            var playgroundDirective = '<h3 style="display:inline">Welcome to the Relational Algebra Playground!</h3> This is an interpreter style tool to help you explore relational algebra in any way you wish. Want a more directed experience? Click the Arcade Button! <span style="color:white;">If the input editor will not work, click on the Player-Set Dataset to make sure it is selected.';
            
            var intermediatePopup = "<h4>Woah there!</h4> Sorry, but the last of the beginner levels and intermediate tutorials are not available yet. I am working on supporting extended relational algebra operations, which will include aggregates and nulls. An example question that could be asked is: Find the greatest value in the A column of Foo. This question is actually currently possible, so give it a shot!";
            
            var advancedPopup = "<h4>Woops, you're ahead of the curve!</h4> Sorry, but advanced tutorials are not available yet. I am working on supporting extended relational algebra operations, which will include aggregates and nulls. A example question that could be asked is: How many PC's and laptops are there that have over 4 GB's of RAM but cost under $600? Look forward to these challenges soon, and checkout the Playground in the meantime!";

            this.currentLevel = null;
            this.mode = levelSelectLabel;

            this.defaultAttrs({
                playgroundButton: '#playgroundButton',
                arcadeButton: '#arcadeButton',
                levelListSelector: '#levelListContainer',
                levelButton: '.levelButton',
                beginnerList: 'ul.beginner',
                intermediateList: 'ul.intermediate',
                advancedList: 'ul.advanced',
                directiveDisplay: '.directive',
                levels: undefined
            });

            //creates lists for beginner,intermediate, and advanced levels
            this.initializeLevels = function() {
                var bl = this.select('beginnerList');
                var il = this.select('intermediateList');
                var al = this.select('advancedList');

                //draws the buttons to select levels
                for (var i = 0; i < 10; i++) {
                    bl.append($('<li></li>').append($('<span>' + i + '</span>').addClass('btn btn-lg btn-success levelButton').data('levelNumber', i)).data('levelNumber', i));
                    il.append($('<li></li>').append($('<span>' + i + '</span>').addClass('btn btn-lg btn-warning levelButton').data('levelNumber', 10 + i)));
                    al.append($('<li></li>').append($('<span>' + i + '</span>').addClass('btn btn-lg btn-danger levelButton').data('levelNumber', 20 + i)));
                }
            };


            this.startLevel = function(levelNumber) {
                var newLevel = this.attr.levels[levelNumber];
                this.setQuestion(newLevel.question);
                var levelDataset = newLevel.datasetName;
                //this.trigger('resetSets');

                //changes the data set being used
                this.trigger('uiSetSelected', {
                    name: levelDataset
                });

                //triggers all other components to change
                $(document).trigger('setArcadeMode');

                if (levelNumber < 8) {
                    this.displayTutorial(levelNumber);
                }
            };

            //catches relation Selected
            this.evaluateAnswer = function(e, data) {
                if (data.name !== 'Result' || this.mode !== playingLevelLabel)
                    return;

                var resultRelation = data.relation;
                var level = this.attr.levels[this.currentLevel];
                var desiredRelation = level.setAnswer;
                var correct = (this.currentLevel === 1) ?
                    resultRelation.equalsRelation(desiredRelation, true) :
                    resultRelation.equalsRelation(desiredRelation);

                if (correct) {
                    alert("Correct! Level complete!\n\n Our answer was: " + level.expressionAnswer);
                    this.trigger('uiRemoveRelation', {
                        name: 'Result'
                    });

                    this.trigger('resetSets');
                    this.trigger(document, 'setLevelSelectMode');
                } else {
                    var pop = new $.Popup();
                    pop.o.afterOpen = function() {
                        var popup = this;
                        setTimeout(function() {
                            popup.close();
                        }, 1300);
                    };

                    pop.open('<h4 style="font-size:20pt;"> Woops, not quite. Try Again!</h4>', 'html');
                }
            };

            this.displayTutorial = function(levelNumber) {
                var tutorialsOffset = '';
                var popup = new $.Popup();

                switch (levelNumber) {
                    case 0:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/projecttut.html?pw=800&amp;pt=html', 'ajax');
                        break;
                    case 1:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/renametut.html?pw=800&amp;pt=html', 'ajax');
                        break;
                    case 2:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/uniontut.html?pw=800&amp;pt=html',
                            'ajax');
                        break;
                    case 3:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/intersecttut.html?pw=800&amp;pt=html',
                            'ajax');
                        break;
                    case 4:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/differencetut.html?pw=800&amp;pt=html',
                            'ajax');
                        break;
                    case 5:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/selecttut.html?pw=800&amp;pt=html',
                            'ajax');
                        break;
                    case 6:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/naturaljointut.html?pw=800&amp;pt=html',
                            'ajax');
                        break;
                    case 7:
                        popup.open(tutorialsOffset + 'tutorials/raOperators/naturaljointut.html?pw=800&amp;pt=html',
                            'ajax');
                        break;
                    default:
                        break;
                }
            }

            this.setQuestion = function(questionText) {
                if (typeof questionText === typeof '')
                    this.select('directiveDisplay').html('<h3>Question:</h3> ' + questionText);
            };

            this.levelSelectMode = function() {
                this.mode = levelSelectLabel;
                this.currentLevel = null;
                this.select('levelListSelector').show();
                this.select('arcadeButton').html('Arcade');
                this.select('directiveDisplay').html(levelSelectDirective);
            };

            this.playgroundMode = function(e, data) {
                this.mode = playgroundLabel;
                this.currentLevel = null;
                this.trigger('resetSets');
                this.select('arcadeButton').html('Arcade');
                this.select('directiveDisplay').html(playgroundDirective);
                this.select('levelListSelector').hide();
            };

            //Gets the level that was selected and starts changing UI
            this.arcadeMode = function(e, data) {
                var levelNumber = $(e.target).data('levelNumber');

                if (levelNumber > 19) {
                    var pop = new $.Popup();
                    pop.open(advancedPopup, 'html');
                    return;
                } else if (levelNumber > 7) {
                    var pop = new $.Popup();
                    pop.open(intermediatePopup, 'html');
                    return;
                }
                this.mode = playingLevelLabel;
                this.currentLevel = levelNumber;

                this.select('levelListSelector').hide();
                this.select('arcadeButton').html('Go Back');
                this.startLevel(this.currentLevel);
            };

            //handles Playground or Arcade button click
            this.buttonPress = function(e, data) {
                var decision;
                if (this.mode === playingLevelLabel)
                    decision = confirm('You will lose your work. Continue?');

                if (decision || this.mode !== playingLevelLabel) {
                    if ($(e.target).is('#playgroundButton')) {
                        this.trigger('setPlaygroundMode');
                    } else {
                        this.trigger('setLevelSelectMode');
                    }
                };
            };

            this.after('initialize', function() {
                this.on('click', {
                    arcadeButton: this.buttonPress,
                    playgroundButton: this.buttonPress,
                    levelButton: this.arcadeMode
                });

                this.on(document, 'relationSelected', this.evaluateAnswer);
                this.on(document, 'setLevelSelectMode', this.levelSelectMode);
                this.on(document, 'setPlaygroundMode', this.playgroundMode);
                this.initializeLevels();
            });
        }

    });