/** Fill in your code here */
/** Tutorials used:
	1. http://learnjsdata.com/getting_started.html
*/
/* Quote: "src/analysis.js would be where your analysis code goes." */
/*
//node.js stuff:
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/



//-----------------------Loading Data]
//source: http://learnjsdata.com/read_data.html

/** loads data from the specified .csv.
*
* "In this form, you have complete control over the data objects and can 
* rename properties (like land_area) and convert values (like population) 
* willy-nilly. On the other hand, you have to be quite explicit about which 
* properties to return. This may or may not be what you are into.
*
* I typically allow D3 to load all the data, and then make modifications 
* in a post-processing step, but it might be more effective for you to be 
* more explicit with the modifications."
*
* Source: http://learnjsdata.com/read_data.html
*
* Nice to now: d3 also supports tab seperated value files (.tsv).
*				This file type avoids the parsing error of values such as
*				2,71 to two seperate values (2 vs 71) instead of one (2.71).
* Note: d3 also supports JSON.
* Note: USE .queue() to line up multiple files for I/O import.
*/
d3.csv("/data/cities.csv", function(d) {
	//accessor function: offers full control on how you return each item.
  return {
    city : d.city,
    state : d.state,
    population : +d.population,		//converts from string to int using +.
    land_area : +d["land area"]		//column header has empty spaces
  };
}, function(data) {
  console.log(data[0]);
  //call functions to process your data here.

  //this site offers proposals to acces data from outside .csv,
  // but they seem not to work: 
  //https://stackoverflow.com/questions/9491885/csv-to-array-in-d3-js
});





//------------------------Combining Data]
//source: http://learnjsdata.com/combine_data.html
var articles = [{
    "id": 1,
    "name": "vacuum cleaner",
    "weight": 9.9,
    "price": 89.9,
    "brand_id": 2
}, {
    "id": 2,
    "name": "washing machine",
    "weight": 540,
    "price": 230,
    "brand_id": 1
}, {
    "id": 3,
    "name": "hair dryer",
    "weight": 1.2,
    "price": 24.99,
    "brand_id": 2
}, {
    "id": 4,
    "name": "super fast laptop",
    "weight": 400,
    "price": 899.9,
    "brand_id": 3
}];

var brands = [{
    "id": 1,
    "name": "SuperKitchen"
}, {
    "id": 2,
    "name": "HomeSweetHome"
}];


//Way 1: using native array functions
/*articles.forEach(function(article) {
    var result = brands.filter(function(brand) {
        return brand.id === article.brand_id;
    });
    delete article.brand_id;
    article.brand = (result[0] !== undefined) ? result[0].name : null;
});
console.log(articles);*/

//Way 2: stack overflow version (faster than using .filter() and creates a new array)
function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};

var result = join(brands, articles, "id", "brand_id", function(article, brand) {
    return {
        id: article.id,
        name: article.name,
        weight: article.weight,
        price: article.price,
        brand: (brand !== undefined) ? brand.name : null
    };
});
console.log(result);


//mergin several rows together from different datasets: read tutorial.


//merging colums of two data sets (required: both must have same length)
var dataset_1 = [{
    'type': 'boat',
    'model': 'Ocean Queen 2000'
}, {
    'type': 'car',
    'model': 'Ferrari'
}];
var dataset_2 = [{
    'price': 23202020,
    'weight': 5656.9
}, {
    'price': 59988,
    'weight': 1.9
}];

var resultOfColumnMerge = _.merge(dataset_1, dataset_2);
console.log(resultOfColumnMerge);





//---------------------------Summarizing Data]
//source: http://learnjsdata.com/summarize_data.html

d3.csv("/data/cities.csv", function(d) {
	//accessor function: offers full control on how you return each item.
  return {
    city : d.city,
    state : d.state,
    population : +d.population,
    land_area : +d["land area"]		//column header has empty spaces
  };
}, function(data) {
  console.log(data[0]);
  //call functions to process your data here.
  	main(data);
});

var main = function(data){
	summerizeData(data);
	iteratingAndReducing(data);
	//do stuff
}

var summerizeData = function(data){
	var minLand = d3.min(data, function(d) { return d.land_area; });
	console.log(minLand);

	var maxLand = d3.max(data, function(d) { return d.land_area; });
	console.log(maxLand);

	//Spannweite (min u. max gleichzeitig)
	var landExtent = d3.extent(data, function(d) { return d.land_area; });
	console.log(landExtent);

	//Mittelwert (avg)
	var landAvg = d3.mean(data, function(d) { return d.land_area; });
	console.log(landAvg);

	//Standardabweichung
	var landSD = d3.deviation(data, function(d) { return d.land_area; });
	console.log(landSD);
}


//-------------------------------------IteratingOverAndREducingData]
//source: http://learnjsdata.com/iterate_data.html

var iteratingAndReducing = function(data) {

	//basic foreach:
	var count = 0;

	data.forEach(function(d) {
	  count += 1;
	});

	console.log(count);


	//create immutable clone of the original dataset (using lowdash):
	var dataObject = {"name":"Carl", "age":"48", "salary":"12300"};
	var copyOfData = _.clone(dataObject);
	copyOfData.age = +copyOfData.age;		//converts from string to int
	copyOfData.salary = +copyOfData.salary;	//converts from string to int
	console.log(dataObject);
	console.log(copyOfData);

	//Shallow copy (default): By default, modification to nested obj still affect clones and original obj
	var dataObjectWNested = {"name":"Saul", "stats":{"age":"55"}};
	var shallowCopy = _.clone(dataObjectWNested);
	shallowCopy.stats.age = +shallowCopy.stats.age;	//converts string to int
	console.log(dataObjectWNested);
	console.log(shallowCopy);

	//Deep copy: create a deep copy by _.clone(___, true):
	var dataObjectForDeepCopy = {"name":"Saul", "stats":{"age":"55"}};
	var deepCopy = _.clone(dataObjectForDeepCopy, true);
	deepCopy.stats.age = +deepCopy.stats.age;
	console.log(dataObjectForDeepCopy);
	console.log(deepCopy);


	//Create a copy using .map(element, index), keeping the original (virtually) immutable:
	var smallData = data.map(function(d,i) {
			//for immutability, we return a new js obj:
	  return {
	    name: d.city.toUpperCase(),
	    index: i + 1,
	    rounded_area: Math.round(d.land_area)
	  };
	});
	console.log(data[0]);
	console.log(smallData[0]);
	//Note: the developer has to take care of keeping the original immutable.


	//filter and receive a data subset:
	var large_land = data.filter(function(d) { return d.land_area > 200; });
	console.log(JSON.stringify(large_land));


	//Sorting:
	/*The built in sort for arrays can do this. A caveat to this function is 
	that, unlike filter, map, and other functions, this modifies the array you 
	are sorting in place, instead of returning a new array with the objects sorted.

	To sort an array, you need a comparator function. This is a function that 
	takes two pieces of data and indicates which one you want higher in the list. 
	The comparator-function-way to do this is to return a negative value if the 
	first value should go higher then the second value, and a positive value if 
	the second value should go higher. If they are equal, and you don't care, 
	then return a 0.*/
	data.sort(function(a,b) {
	  return b.population - a.population;
	});
	console.log(JSON.stringify(data));
	//Note: If you want to keep the original array immutable, create a clone of it beforehand.

	//d3 with one datatype arrays (e.g. int[])
	var populations = data.map(function(d) { return d.population; });
	console.log(populations);
	populations.sort(d3.descending);
	console.log(populations);


	//reducing to one value:
	var landSum = data.reduce(function(sum, d) {
	  return sum + d.land_area;
	}, 0);	//0 := initial value of reduction
	console.log(landSum);

	//concat an array's string elements using reduce
	var weirdString = data.reduce(function(str, d, i) {
	  var ending = (i % 2 === 0) ? " is cool." : " sucks." ;
	  return str + " " + d.city + ending;
	}, "");	//initial value of reduction.
	console.log(weirdString);


	//Chaining functions (pipelines / streams)
	var bigCities = data.filter(function(d) { return d.population > 500000; })
	  .sort(function(a,b) { return a.population - b.population; })
	  .map(function(d) { return d.city; });
	console.log(bigCities);
}




//------------------------------------------Grouping Data]

d3.csv("/data/expenses.csv", function(d) {
	//accessor function: offers full control on how you return each item.
  return {
    name : d.name,
    amount : +d.amount,		//converts from string to int using +.
    date : d.date		//column header has empty spaces
  };
}, function(data) {
  console.log(data);
  //call functions to process your data here.
	groupDataOf(data);
});


var groupDataOf = function(expenses) {
	//creates a dictionary with name as key.
	var expensesByName = d3.nest()
	  .key(function(d) { return d.name; })
	  .entries(expenses);
	console.log(expensesByName);

	//creates a (linear) array with {key,value} - pairs as elements. The value can be 
	//defined by the dev.
	var expensesCount = d3.nest()
	  .key(function(d) { return d.name; })
	  .rollup(function(v) { return v.length; })
	  .entries(expenses);
	console.log(JSON.stringify(expensesCount));
	//...get the mean using d3.mean()
	var expensesAvgAmount = d3.nest()
	  .key(function(d) { return d.name; })
	  .rollup(function(v) { return d3.mean(v, function(d) { return d.amount; }); })
	  .entries(expenses);
	console.log(JSON.stringify(expensesAvgAmount));
	//...accumulate data in an object
	var expenseMetrics = d3.nest()
	  .key(function(d) { return d.name; })
	  .rollup(function(v) { return {
	    count: v.length,
	    total: d3.sum(v, function(d) { return d.amount; }),
	    avg: d3.mean(v, function(d) { return d.amount; })
	  }; })
	  .entries(expenses);
	console.log(JSON.stringify(expenseMetrics));

	//rollup returning an object instead of an array.
	var expensesTotal = d3.nest()
	  .key(function(d) { return d.name; })
	  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
	  .object(expenses);
	console.log(JSON.stringify(expensesTotal));


	//multi-level rollup. Note: the order of .key() functions determines the key-value order.
	var expensesTotalByDay = d3.nest()
	  .key(function(d) { return d.name; })
	  .key(function(d) { return d.date; })
	  .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
	  .object(expenses);
	console.log(JSON.stringify(expensesTotalByDay));
}
