/**
 * This is the main entry point for the Flight/Require component
 */
define(
  ['jquery'
  , 'jqueryuitabs'

  , 'bootstrap'
  , './default-data'
  , './levels'
  , './components/ui/input'
  , './components/ui/relation_list'
  , './components/ui/relation_view'
  , './components/ui/graph_modal'
  , './components/ui/set_selector'
  , './components/ui/arcade'
  , './components/data/evaluate'
  , './components/data/graph'
  , './components/data/relations'],
    function (
        $,
        $ui,
        bootstrap,
        defaultData,
        levelData,
        InputUI,
        RelationListUI,
        RelationViewUI,
        GraphModalUI,
        SetSelectorUI,
        ArcadeUI,
        EvaluateData,
        GraphData,
        RelationsData
    ) {
        return function () {
            InputUI.attachTo('#input');
            RelationListUI.attachTo('#relationList');
            RelationViewUI.attachTo('#relationView');
            GraphModalUI.attachTo('#graph');
            SetSelectorUI.attachTo('#set-selector');
            EvaluateData.attachTo(document);
            GraphData.attachTo('#graph-staging');
            RelationsData.attachTo(document, {
                sets: defaultData,
                defaultSet: 'Player-Set'
            });
            
            
            ArcadeUI.attachTo('#arcadeController', { 
                //defines levels attribute that contains levels data
                levels : levelData
            });

            $(document).ready(function () {
                $('#tabs').tabs();
                $("#raTabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
                $("#raTabs li").removeClass("ui-corner-top").addClass("ui-corner-left");
            });
            $(document).trigger($.Event('setLevelSelectMode'));
            //$('#set-selector').trigger($.Event('uiSetSelected', {name : 'Player-Set'}));
        }
    })