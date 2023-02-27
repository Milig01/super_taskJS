//Переводит первый символ в верхний регистр, а все остальные в нижний регистр.
export function conversionToLowerCase(line) {
    let char = line[0].toUpperCase();

    line = line.toLowerCase();
    line = char + line.slice(1);

    return line;
}

/*Форматирует строку с целью правильной расстановки пробелов. Работает следующим образом:
* функция использует внутреннюю функцию addOrDelSpaceLeftOrRight(mark, addOrDel, orientation);
* параметр mark - знак препинания, который нужно форматировать пробелами слева или справа;
* параметр addOrDel означает хотим ли мы добавить пробел или удалить;
* orientaion - слева или справа.
*/
export function formatSpace(line) {
    let left = -1, right = 1, del = false, add = true;
    
    addOrDelSpaceLeftOrRight
    (' ', del, left)       // (' ', add, right) - не запускать! Бесконечный цикл. Можно (' ', add, left)
    ('.', add, right)
    (',', add, right)
    (':', add, right)    //не ограничиваясь только знаками из задания, добавим форматирование других знаков
    (';', add, right)   //в любом случае их легко добавлять и убирать
    ('!', add, right)
    ('?', add, right)
    (')', add, right)
    ('}', add, right)
    ('.', del, left)
    (',', del, left)
    (':', del, left)
    (';', del, left)
    ('!', del, left)
    ('?', del, left)
    (')', del, left)
    ('}', del, left)
    ('(', add, left)
    ('(', del, right)
    ('{', add, left)
    ('{', del, right)
    ('-', add, right)
    ('-', add, left)

    line = line.trim();

    return line;

    function addOrDelSpaceLeftOrRight(mark, addOrDel, orientation) {
        let pos = line.indexOf(mark, 0);

        while (pos != -1) {
            let position = pos + orientation;
            let bool = line[position] == ' ' ? !addOrDel : addOrDel;

            if (bool) {
                addOrDel ? orientation == right
                ? line = line.slice(0, position) + ' ' + line.slice(position) //добавляет пробел справа
                : line = line.slice(0, position + right) + ' ' + line.slice(position + right) //добавляет пробел слева
                : line = line.slice(0, position) + line.slice(position + 1); //удаляет пробел слева или справа
            }

            //в зависимости от того, добавляли или удаляли слева пробел, сдвигаем указатель в строке
            if (bool && orientation == left) {
                pos = addOrDel ? pos + right : pos + left;
            }

            pos = line.indexOf(mark, pos + 1);
        }

        return addOrDelSpaceLeftOrRight; //для удобства
    }
}

//подсчитывает количество слов в строке.
//словом считается набор подряд идущих символов русского алфавита, без учета регистра
export function numberOfWords(line) {
    let bool = false;
    let regExp = /[а-я]/;
    let numOfWords = 0;

    line = line.toLowerCase();

    for (let i = 0; i <= line.length; i++) {
        if ( !regExp.test(line[i]) ) {
            bool = false;
            continue;
        }

        if (!bool) {
            numOfWords++;
            bool = true;
        }
    }

    return numOfWords;
}

//осуществляет поиск уникальных слов без учета регистра, и подсчитывает их количество
// возвращает Map, где ключ - слово, значение - его количество
// у возвращаемого Map, переопределен метод toString(), - который возвращает строку элементов, удобную для чтения.
//для использования в console.log(), метод toString() нужно вызывать явно.
export function findUniqWords(line) {
    let bool = false; //показывает, текущий символ является частью слова или нет.
    let regExp = /[а-я]/;
    let words = [];
    let word = [];

    line = line.toLowerCase();

    for (let i = 0; i <= line.length; i++) {
        if ( !regExp.test(line[i]) ) {
            if (bool) {
                let w = word.join('');
                words.push(w);
                word = [];
            }

            bool = false;
            continue;
        }

        word.push(line[i]);
        bool = true;
    }

    let result = new Map();

    for (let w of words) {
        if (!result.has(w)) result.set(w, 0);

        result.set(w, result.get(w) + 1);
    }

    result.toString = function() {
        let arr = Array.from(this);
        let name = '';

        arr.sort((a, b) => {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            if (a[0] == b[0]) return 0;
        });
        
        for (let elem of arr) {
            name += `${elem[0]}: ${elem[1]}\n`;
        }

        return name;
    };

    return result;
}