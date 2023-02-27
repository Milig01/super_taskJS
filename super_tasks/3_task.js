class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;

        this.constructor.products.push(this);
    }

    static products = []; //все созданные продукты записываются в этот массив

    //метод работает только с массивом products
    static selectionProducts(request) {
        return this.selectionArray(request, this.products);
    }

    //производит выборку элементов в массиве array, в соответствии со строкой запроса
    static selectionArray(request, array) {
        let funcRequest = this.interpreterRequest(request);

        let filteredArray = array.filter(funcRequest);

        return filteredArray;
    }

    //принимает строку запроса и возвращает соответствующую функцию для выборки
    static interpreterRequest(request) {
        let funcRequests = [];
        let arrayRequests = request.split('&');

        for (let singleRequest of arrayRequests) {
            let [property, parameter, textFunc] = processingRequest(singleRequest);

            let funcRequest = createFuncRequest(property, parameter, textFunc);

            funcRequests.push(funcRequest);
        }

        function resultRequest(item) {
            for (let req of funcRequests) {
                if (req(item) == false) return false;
            }

            return true;
        }

        return resultRequest;

        //выделяет из строки 3 смысловые части
        function processingRequest(request) {
            let separator = request.indexOf('-');
            let property = request.slice(0, separator);
            let filter = request.slice(separator + 1);

            let [parameter, textFunc] = findOperator(filter);

            return [property, parameter, textFunc];
        }

        function findOperator(filter) {
            let numOperators = [ ['<=', '<='], ['>=', '>='], ['<', '<'], ['>', '>'], ['=', '=='] ];
            let strOperators = [ ['contains', 'includes'], ['starts', 'startsWith'], ['ends', 'endsWith'] ];

            for (let op of numOperators) {
                if ( filter.includes(op[0]) ) {
                    let parameter = +filter.slice(op[0].length);
                    let textFunc = `return item[property] ${op[1]} param;`

                    return [parameter, textFunc];
                }
            }

            for (let op of strOperators) {
                if ( filter.includes(op[0]) ) {
                    let parameter = filter.split('-')[1];
                    let textFunc = `return item[property].${op[1]}(param);`

                    return [parameter, textFunc];
                }
            }
        }

        function createFuncRequest(property, param, textFunc) {
            let func = new Function('item', 'property', 'param', textFunc);

            return item => func(item, property, param);
        }
    }

    //для удобного создания большого количества продуктов
    static create(initString) {
        let list = initString.split(';');

        for (let str of list) {
            let prop = str.trim().split('/');
            
            new Product(prop[0], +prop[1], +prop[2], prop[3]);
        }

    }

    static show(products) {
        for (let prod of products) {
            console.log(`${prod.name}, price: ${prod.price}, quantity: ${prod.quantity}, description: ${prod.description}`);
        }
    }
}

new Product('abc', 10, 1, 'abc');

Product.create(`
Apple/60/30/fruit, green, medium;
Banane/45/220/fruit, yellow, medium;
Raspberry/120/50/berry, red, small;
Lemon/30/60/fruit, yellow, medium;
Watermelon/90/8/berry, green, large;
Potato/35/800/vegetable, brown, medium;
Carrot/53/400/vegetable, orange, medium;
Eggplant/130/40/vegetable, violet, large;
Radish/25/200/vegetable, red, small;
Pampkin/140/20/vegetable, orange, large;
Butter/120/7/dairy products, white, small;
Cheese/220/15/dairy products, yellow, medium;
Milk/80/20/dairy products, white, medium;
Meat/200/40/black;
Strawberry/80/12/red;
Blueberry/240/18/blue
`);

let arr = Product.selectionProducts('price->100&description-contains-b&price->=120');

//Product.show(Product.products);
Product.show(arr);