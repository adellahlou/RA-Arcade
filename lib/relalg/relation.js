/*
 * The classes to respresent a relation
 */
define(['deep-equal'], function(deepEqual) {
        function Relation(header, data) {
            this.header = header.slice() // We use slice to copy-by-value instead of by-reference
            this.data = []
            for (var i = 0; i < data.length; i++) this.push(data[i])
        }
        Relation.prototype.header = null
        Relation.prototype.data = null
        /*
         * Adds a new row to the relation. Checks for duplicates
         */
        Relation.prototype.push = function(newRow) {
            if (this.data.some(function(existingRow) {
                return deepEqual(newRow, existingRow)
            }))
                return false

            this.data.push(newRow.slice()) // Same. We want by-value..
            return true
        }

        //compares two relations. Note that the attributes have to be in the same order
        Relation.prototype.equalsRelation = function(otherRelation, compareHeader) {
            if(this.data.length !== otherRelation.data.length)
                return false;
            
            if(compareHeader && !deepEqual(this.header, otherRelation.header)) {
                return false;   
            }
            
            var matched = [];
            this.data.forEach(function(thisRow, thisIndex) {
                for (var i = 0; i < otherRelation.data.length; i++) {

                    if (matched.indexOf(i) === -1) {
                        if (deepEqual(thisRow, otherRelation.data[i])){
                            matched.push(i);
                            break;
                        }   
                    }
                }
            });
            return (this.data.length === matched.length);
        };
    


/*
 * A pretty-print function for relations
 */
Relation.prototype.toString = function() {
    // Helper function to calculate the number of characters needed to display a variable
    var length = function(input) {
        if (typeof(input) == 'string') return input.length
        else if (typeof(input) == 'number') return ("" + input).length
    }

    // Calculate the lengths of the longest string in each column
    var lengths = new Array(this.header.length)
    for (var i = 0; i < this.header.length; i++)
        lengths[i] = length(this.header[i])
    for (i = 0; i < this.data.length; i++)
        for (var j = 0; j < this.data[i].length; j++)
            lengths[j] = Math.max(lengths[j], length(this.data[i][j]))

    // Helper function to format one row in the table
    var formatRow = function(row, lengths) {
        var rtn = '|'
        for (var i = 0; i < row.length; i++)
            rtn += ' ' + (new Array(lengths[i] - length(row[i]) + 1).join(' ')) + row[i] + ' |'
        return rtn
    }

    var delim = '+'
    for (i = 0; i < lengths.length; i++)
        delim += (new Array(lengths[i] + 3).join('-')) + '+'

    // Formats the data into the final table..
    var rtn = delim + "\n" +
        formatRow(this.header, lengths) + "\n" +
        delim
    for (i = 0; i < this.data.length; i++)
        rtn += "\n" + formatRow(this.data[i], lengths)

    return rtn + "\n" + delim + "\n"
}

return Relation
})