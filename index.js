var mysql = require("mysql")
var inquirer = require("inquirer");
var table = require("table"); 
var data, config; 

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wrestling1!",
    database: "employeeDB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log(connection.threadId);
    start();
});

function start(){
    inquirer
        .prompt({ 
            name: "introPrompt",
            type: "list",
            message: "Would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee","Update Employee Role", "Done"]
        })
        .then(function(answer){
            if (answer.introPrompt === "View All Employees") {
                viewAll();
            } 
            else if(answer.introPrompt === "View All Employees By Department"){
                viewDepartment()  
            }
            else if(answer.introPrompt === "Add Employee"){
                add()  
            }
            else{
                connection.end();
            }
    })
}

function viewAll(){
    connection.query("SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      var data = [["id", "First Name", "Last Name", "Title", "Department", "Salary", "Manager"]]

      for (var i = 0; i < res.length; i++) {
        info = [res[i].id, res[i].first_name, res[i].last_name, res[i].title, res[i].department, res[i].salary, res[i].manager]
        data.push(info)
      };

      config = {  
        border: table.getBorderCharacters("ramac"), 
        columns: { 
          0: { 
            width: 2   // Column 0 of width 1 
          }, 
          1: { 
            width: 15  // Column 1 of width 20 
          }, 
          2: { 
            width: 15   // Column 2 of width 5 
          },
          3: { 
            width: 15   // Column 2 of width 5 
          } ,
          4: { 
            width: 15   // Column 2 of width 5 
          } ,
          5: { 
            width: 15  // Column 2 of width 5 
          } ,
          6: { 
            width: 15  // Column 2 of width 5 
          } 
        } 
      }; 

      var x = table.table(data, config); 
      console.log(x)
      start()
    });

}

function viewDepartment(){
    inquirer
        .prompt({ 
            name: "department",
            type: "input",
            message: "What department did the employee worked in?"
        })

    var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
      }
    });
};


function add() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee first name?"
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee last name?"
        },
        {
          name: "title",
          type: "input",
          message: "What is the employee's title?",
        },
        {
          name: "department",
          type: "input",
          message: "What department does the employee work in?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the employee's salary?",
        },
        {
          name: "manager",
          type: "input",
          message: "Who is the employee's manager?",
        },
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            title: answer.title,
            department: answer.department,
            salary: answer.salary,
            manager: answer.manager
          },
          function(err) {
            if (err) throw err;
            console.log("Employee Added!");
        
            start();
          }
        );
      });
  };
