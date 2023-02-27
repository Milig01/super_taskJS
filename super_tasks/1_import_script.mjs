import {numberOfWords, conversionToLowerCase, formatSpace, findUniqWords} from "./1_task.mjs";

let text1 = `   Вот пример строки,в которой     используются знаки препинания.
После знаков должны стоять пробелы , а перед знаками их быть не должно .
Если есть лишние подряд идущие пробелы, они должны быть устранены.`;

let text2 = `а теперь . . .попробуем   например :отформатировать(  нечто  : невообразимое  ?  !)ну . . .Давайте попробуем !
Допустим  :у нас есть ... вот такой :{ страшный текст }куча подряд идущих ,каких-то символов ,как же с этим справиться то ? !`;

let text3 = 'А Если слово а И есЛи встречается если очень очень много раз слова очень и если то даже если ';

let text4 = 'Текст, в котором слово текст несколько раз встречается и слово тоже';

let str1 = conversionToLowerCase(text2);
let str2 = formatSpace(text2);
let str3 = numberOfWords(text2);
let str4 = findUniqWords(text2);

//console.log(text2);

//console.log(str1);
console.log(str2);
//console.log(str3);
//console.log( str4.toString() );