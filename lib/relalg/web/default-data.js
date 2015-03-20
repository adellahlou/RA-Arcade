/*
 * Very simple data-store (aka, a shared object)
 */
define(['../relation'], function(Relation) {
    return {
        'Player-Set': {
            Foo: new Relation(['A', 'B'], [
                [1, 2],
                [3, 4],
                [4, 5],
                [10, 11]
            ]),
            Bar: new Relation(['A', 'B'], [
                [1, 2],
                [5, 6],
                [4, 9],
                [11, 10]
            ]),
            Baz: new Relation(['A', 'B', 'C'], [
                [1, 2, 3],
                [5, 6, 7]
            ]),
            Bam: new Relation(['D', 'E'], [
                [20, 30],
                [53, 62],
                [11, 10]
            ]),
            A: new Relation(
                ['sno', 'pno'], [
                    ['s1', 'p1'],
                    ['s1', 'p2'],
                    ['s1', 'p3'],
                    ['s1', 'p4'],
                    ['s2', 'p1'],
                    ['s2', 'p2'],
                    ['s3', 'p2'],
                    ['s4', 'p2'],
                    ['s4', 'p4']
                ]
            ),
            B: new Relation(
                ['pno'], [
                    ['p2'],
                    ['p3'],
                    ['p20']
                    
                ]
            )
        },
        'Address book': {
            People: new Relation(['pid', 'name', 'age', 'aid'], [
                [1, 'John', 42, 1],
                [2, 'Victor', 22, 2],
                [3, 'Jane', 37, 1],
                [4, 'Anna', 26, 3],
                [5, 'Lindsey', 32, 4]
            ]),
            Addresses: new Relation(['aid', 'street', 'number', 'zip', 'country'], [
                [1, 'Long st.', 1200, 87501, 'USA'],
                [2, 'Blvd. de Poisson', 86, 65120, 'France'],
                [3, 'Ave. de Beurre', 100, 65120, 'France'],
                [4, 'Broad Ave.', 587, 87501, 'USA']
            ])
        },
        'Night-Out': {
            'Bar': new Relation(['name', 'address'], [
                ['Down Under Pub', '802 W. Main Street'],
                ['The Edge', '108 Morris Street'],
                ['James Joyce Pub', '912 W. Main Street'],
                ['Satisfaction', '905 W. Main Street'],
                ['Talk of the Town', '108 E. Main Street']
            ]),
            'Beer': new Relation(['name', 'brewer'], [
                ['Amstel', 'Amstel Brewery'],
                ['Budweiser', 'Anheuser-Busch Inc.'],
                ['Corona', 'Grupo Modelo'],
                ['Dixie', 'Dixie Brewing'],
                ['Erdinger', 'Erdinger Weissbrau'],
                ['Full Sail', 'Full Sail Brewing']
            ]),
            'Drinker': new Relation(['name', 'address'], [
                ['Amy', '100 W. Main Street'],
                ['Ben', '101 W. Main Street'],
                ['Coy', '200 S. Duke Street'],
                ['Dan', '300 N. Duke Street'],
                ['Eve', '100 W. Main Street']
            ]),
            'Frequents': new Relation(['drinker', 'bar', 'times_a_week'], [
                ['Amy', 'James Joyce Pub', 2],
                ['Ben', 'James Joyce Pub', 1],
                ['Ben', 'Satisfaction', 2],
                ['Ben', 'Talk of the Town', 1],
                ['Coy', 'Down Under Pub', 1],
                ['Coy', 'The Edge', 1],
                ['Dan', 'Down Under Pub', 2],
                ['Dan', 'The Edge', 1],
                ['Dan', 'James Joyce Pub', 1],
                ['Dan', 'Satisfaction', 2],
                ['Dan', 'Talk of the Town', 2],
                ['Eve', 'James Joyce Pub', 2]
            ]),
            'Serves': new Relation(['bar', 'beer', 'price'], [
                ['Down Under Pub', 'Amstel', 2.75],
                ['Down Under Pub', 'Budweiser', 2.25],
                ['Down Under Pub', 'Corona', 3.00],
                ['The Edge', 'Amstel', 2.75],
                ['The Edge', 'Budweiser', 2.50],
                ['The Edge', 'Corona', 3.00],
                ['James Joyce Pub', 'Amstel', 3.00],
                ['James Joyce Pub', 'Corona', 3.25],
                ['James Joyce Pub', 'Dixie', 3.00],
                ['James Joyce Pub', 'Erdinger', 3.50],
                ['Satisfaction', 'Amstel', 2.75],
                ['Satisfaction', 'Budweiser', 2.25],
                ['Satisfaction', 'Corona', 2.75],
                ['Satisfaction', 'Dixie', 2.75],
                ['Satisfaction', 'Full Sail', 2.75],
                ['Talk of the Town', 'Amstel', 2.50],
                ['Talk of the Town', 'Budweiser', 2.20]
            ]),
            'Likes': new Relation(['drinker', 'beer'], [
                ['Amy', 'Amstel'],
                ['Amy', 'Corona'],
                ['Ben', 'Amstel'],
                ['Ben', 'Budweiser'],
                ['Coy', 'Dixie'],
                ['Dan', 'Amstel'],
                ['Dan', 'Budweiser'],
                ['Dan', 'Corona'],
                ['Dan', 'Dixie'],
                ['Dan', 'Erdinger'],
                ['Eve', 'Amstel'],
                ['Eve', 'Corona']
            ])
        },
        'Computers': {
            'Product': new Relation(['maker', 'model', 'type'], [
                ['A', 1001, 'pc'],
                ['A', 1002, 'pc'],
                ['A', 1003, 'pc'],
                ['A', 2004, 'laptop'],
                ['A', 2005, 'laptop'],
                ['A', 2006, 'laptop'],
                ['B', 1004, 'pc'],
                ['B', 1005, 'pc'],
                ['B', 1006, 'pc'],
                ['B', 2007, 'laptop'],
                ['C', 1007, 'pc'],
                ['D', 1008, 'pc'],
                ['D', 1009, 'pc'],
                ['D', 1010, 'pc'],
                ['D', 3004, 'printer'],
                ['D', 3005, 'printer'],
                ['E', 3001, 'printer'],
                ['E', 3002, 'printer'],
                ['E', 3003, 'printer'],
                ['G', 2010, 'laptop'],
                ['H', 3006, 'printer'],
                ['H', 3006, 'printer']
            ]),

            'PC': new Relation(['model', 'speed', 'ram', 'hd', 'price'], [
                [1001, 2.66, 1024, 250, 2114],
                [1002, 2.10, 512, 250, 995],
                [1003, 1.42, 512, 80, 478],
                [1004, 2.80, 1024, 250, 649],
                [1005, 3.2, 512, 250, 630],
                [1006, 3.2, 1024, 320, 1049],
                [1007, 2.2, 1024, 200, 510],
                [1008, 2.2, 2048, 250, 770],
                [1009, 2.0, 1024, 250, 650],
                [1010, 2.8, 2048, 300, 770],
                [1011, 1.86, 2048, 160, 959],
                [1012, 2.8, 1024, 160, 649],
                [1013, 3.06, 512, 80, 529]
            ]),

            'Laptop': new Relation(['model', 'speed', 'ram', 'hd', 'screen', 'price'], [
                [2001, 2.0, 2048, 240, 3673],
                [2002, 1.73, 1024, 80, 949],
                [2003, 1.80, 512, 60, 549],
                [2004, 2.0, 512, 60, 1150],
                [2005, 2.16, 1024, 120, 2500],
                [2006, 2.0, 2048, 80, 1700],
                [2007, 1.83, 1024, 120, 1429],
                [2008, 1.6, 1024, 100, 900],
                [2009, 1.6, 512, 80, 680],
                [2010, 2.0, 2048, 160, 2300]
            ]),
            'Printer': new Relation(['model', 'color', 'type', 'price'], [
                [3001, 'true', 'ink-jet', 99],
                [3002, 'false', 'laser', 239],
                [3003, 'true', 'laser', 899],
                [3004, 'true', 'ink-jet', 120],
                [3005, 'false', 'laser', 120],
                [3006, 'true', 'ink-jet', 100],
                [3007, 'true', 'laser', 200]
            ])
        }
    }
})