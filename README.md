# Инструкция по использованию конфигов
0) подготовить окружение (установить nodejs, сделать коммит и пуш до манипуляций)
1) скопировать файлы (git clone git@github.com:Vterebenin/dream_config.git) и перенести в корень проекта
2) установить зависимости(модули/пакеты): npm i
3) добавить папку node_modules в gitignore
4) Завести необходимую под webpack структуру node structureMaker.js
5) Опционально, можно убить structureMaker после исполнения, дабы не запустить его по случайности.
6) npm run dev
7) исправьте ошибки при компиляции и все готово!

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
- необходима нода на файл сервере?

# Потенциальные проблемы 

- С минифицированием css есть проблемы в наших метках, которые не воспринимаются минификаторами (не использовать минификацию при компиляции и использовать наш компрессор)
- css компилятор по причине возможности статического импортирования создает файлы-хелперы (наверное их как-то можно исключить)
- какого-то черта не работает jquery-validator, что приводит к тому, что пять файлов отказываются работать (переписать файлы, либо давать опцию их игнорирования в structureMaker.js?)  

# Правила использования

1. нельзя создавать файлы со странным контентом в папке Page(то есть без папок web/js/dev/ и web/css/dev/)

2. нельзя запускать structureMaker.js после компиляции webpack-а: он скопирует скомпиленные файлы в папку web, тем самым убив исходники.

3. не вводить интеграцию webpack в существующие проекты (это просто не нужно, если проект и без него живет, то вы только совершите много работы в никуда)

# FAQ
Как мне использовать модули/библиотеки?
если они есть в npm 
