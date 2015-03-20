define(['../relation'], function(Relation) {
        //console.log(Relation);
        var Levels = [];


        //BEGINNER LEVELS:
        Levels.push(new Level(
            'Night-Out',
            "We are going to start off with an simple one. Below we have a relation. If you don't know a relation is, I suggest that click on the relations tab. We are going to use the Project operator to show only the name of bars. The syntax is <span class='arcadeSyntax'>Project[attr1, attr2](Relation)</span>",
            new Relation(['name'], [
                ['Down Under Pub'],
                ['The Edge'],
                ['James Joyce Pub'],
                ['Satisfaction'],
                ['Talk of the Town']
            ]), 'Result := Project[name](Bar)'));

        Levels.push(new Level(
            'Night-Out',
            "We're going to learn another RA operation. Let's go ahead and rename one of the attributes of this relation Bar from name to establishment. The command in the interpreter is <span class='arcadeSyntax'>Arcade Syntax: Rename[oldname/newname](Relation)</span>",
            new Relation(['establishment', 'address'], [
                ['Down Under Pub', '802 W. Main Street'],
                ['The Edge', '108 Morris Street'],
                ['James Joyce Pub', '912 W. Main Street'],
                ['Satisfaction', '905 W. Main Street'],
                ['Talk of the Town', '108 E. Main Street']
            ]), 'Result := Rename[name/establishment](Bar)'
        ));

        Levels.push(new Level('Night-Out',
            "Let's keep going! Remember set operations? If you don't, have no fear. Just click the tab above called RA Operations to read about all the different relational algebra operations we're practicing. For this level, try the Union operator on Bar and Drinker. Note that Union and the rest of the set operators require the headers of the two relations to be exactly the same. You can click on these relations to view them. <span class='arcadeSyntax'>Arcade Syntax: RelationA Union RelationB</span> ",
            new Relation(['name', 'address'], [
                ['Down Under Pub', '802 W. Main Street'],
                ['The Edge', '108 Morris Street'],
                ['James Joyce Pub', '912 W. Main Street'],
                ['Satisfaction', '905 W. Main Street'],
                ['Talk of the Town', '108 E. Main Street'],
                ['Amy', '100 W. Main Street'],
                ['Ben', '101 W. Main Street'],
                ['Coy', '200 S. Duke Street'],
                ['Dan', '300 N. Duke Street'],
                ['Eve', '100 W. Main Street']
            ]),
            'Result := Bar Union Drinker'
        ));

        Levels.push(new Level(
            'Player-Set',
            "Good job on Union! Go ahead and try Intersect on Foo and the A and B columns of Baz. Note that all of the set operators require the headers of the two relations to be exactly the same.<span class='arcadeSyntax'>Arcade Syntax: RelationA Intersect RelationB</span>",
            new Relation(
                ['A', 'B'], [
                    [1, 2]
                ]),
            'Result: Foo Intersect Project[A, B](Baz)'
        ));

        //LEVEL 5
        Levels.push(new Level(
            'Player-Set',
            "Last but not least, let's try Difference on Foo and Bar. Note: Difference only returns tuples from RelationA.<span class='arcadeSyntax'>Arcade Syntax: RelationA - RelationB</span>",
            new Relation(
                ['A', 'B'], [
                    [3, 4],
                    [4, 5],
                    [10, 11]
                ]),
            'Result := Foo - Bar'
        ));

       Levels.push(new Level(
            'Night-Out',
                "If you've done all the levels thus far, you might start to realize that you already have the power to transform data stored in relations into new, useful forms. The select operator raises relational algebra's power to whole new level. The arcade currently allows the use of ==, >=, <=, <, >, != comparison operators and the && (and), || (or) operators. You must use 's to quote strings, and ' can be used within a string by doubling 's ('').<span class='arcadeSyntax'>Arcade Syntax: Select[cond1 logical-operator cond2](Relation).   For example: Select[drinker=='Amy'](Likes)</span>Find all the drinkers who frequent James Joyce Pub.",
                new Relation(['drinker', 'bar', 'times_a_week'], [
                        ['Amy', 'James Joyce Pub', 2],
                        ['Ben', 'James Joyce Pub', 1],
                        ['Dan', 'James Joyce Pub', 1],
                        ['Eve', 'James Joyce Pub', 2]
                    ]),
                    "Result := Select[bar=='James Joyce Pub'](Frequents)"
    ));

    Levels.push(new Level('Night-Out',
                          "Another powerful operation is the Natural Join operation. It's recommended that you go up to the RA Operations Tutorial and read up on Natural Join. Using Natural Join, create a relation that shows each person, the beers they like, the bar it's served at and its price. Note that one solution to this uses only one operation. <span class='arcadeSyntax'>Arcade Syntax: RelationA Join RelationB</span>",
        new Relation([], []),
                          ""
    ));

    Levels.push(new Level(
                'Night-Out',
                "Using Natural Join and whatever other operations needed, find just the name of bars that serves what Amy likes.",
        new Relation([], []),
        ""
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    //LEVEL 10
    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));


    /*INTERMEDIATE LEVELS:********************************/
    /*
    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    //LEVEL 15
    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    Levels.push(new Level('Computers',
        new Relation([], [])
    ));

    //LEVEL 20
    Levels.push(new Level('Computers',
        new Relation([], [])
    ));
    */

    //*ADVANCED LEVELS:********************************/
    /*
    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    //LEVEL 25
    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));

    //LEVEL 30
    Levels.push(new Level('Night-Out',
        new Relation([], [])
    ));*/

    return Levels;

    function Level(datasetName, question, desiredAnswer, expressionAnswer) {
        this.datasetName = datasetName;
        this.question = question;
        this.setAnswer = desiredAnswer;
        this.expressionAnswer = expressionAnswer;
    }

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

});