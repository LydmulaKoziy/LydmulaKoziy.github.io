var tasksCompleted = {
    'Anna': 29,
    'Serg': 35,
    'Elena': 1,
    'Anton': 99
};

var task = 0;
var nameWinner = '';

for(var name in tasksCompleted){
    if(task < tasksCompleted[name]){
        task = tasksCompleted[name]
        nameWinner = tasksCompleted[name];
    }
}
// console.log(task);
console.log(nameWinner);
