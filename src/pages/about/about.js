var Handlebars = require('handlebars/dist/handlebars.min');


console.log('about');
//    模拟数据
var data = {
    "student": [
        {
            "name": "柳2",
            "age": '8',
            "gender": '女',
            "fraction": '89'
        },
        {
            "name": "柳3",
            "age": '9',
            "gender": '女',
            "fraction": '89'
        },
        {
            "name": "柳4",
            "age": '10',
            "gender": '女',
            "fraction": '89'
        }]
};
console.log(data);

//    获取到handlebars这个模板中的全部html内容
var studentTemp = $('#student-temp').html();


console.log('studentTempstudentTempstudentTemp');
console.log(studentTemp);

//    编译
var HanStudent = Handlebars.compile(studentTemp);
console.log('HanStudentHanStudentHanStudentHanStudent');
console.log(HanStudent(data));
console.log($('.student-temp'));
//把编译完成的代码放入到 .student-temp 的这个容器中
$('.student-temp').html(HanStudent(data));
