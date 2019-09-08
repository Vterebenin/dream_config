# Инструкция по использованию конфигов
0) подготовить окружение (установить nodejs, сделать коммит и пуш до манипуляций)
1) скопировать файлы
2) npm i
3) добавить папку node_modules в gitignore
4) node structureMaker.js
5) npm run server
6) исправьте ошибки при компиляции и все готово!

*При заливе файлов на хостинг:
все точно так же, но нужно переносить все папки dev.*

# Зачем
+ Возможность написания современного JS, css, не думая о прошлом.
+ Возможность использования любых возможных препроцессоров и плагинов
+ dead code elumination -- очистка ненужного кода
+ Возможность использовать линтеры

# Но все же
- Это еще один посредник между вами и сайтом
- Это куча проблем с весом файлов
- необходима нода на файле
- С минифицированием js есть проблемы в наших метках, которые не воспринимаются минификаторами
