var mysql = require("mysql")
var inquirer = require("inquirer");
var table = require("table"); 
const util = require("util");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Wrestling1!",
    database: "employee"
});

connection.connect();

connection.query = util.promisify(connection.query);

// start function

function promptUser(){
  var question = [{ 
    name: "introPrompt",
    type: "list",
    message: "Would you like to do?",
    choices: ["View All Employees", "View Employees By Department", "Add Employee", "Remove Employee","Update Employee's Role", "Total Utilize Budget", "Done"]
}]
    return inquirer.prompt(question)
}

async function init(){
  console.log("╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╮╭━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╮\n┃╭━━╯╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃╰╯┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╯╰╮\n┃╰━━┳╮╭┳━━┫┃╭━━┳╮╱╭┳━━┳━━╮┃╭╮╭╮┣━━┳━╮╭━━┳━━┳━━┳╮╭┳━━┳━╋╮╭╯\n┃╭━━┫╰╯┃╭╮┃┃┃╭╮┃┃╱┃┃┃━┫┃━┫┃┃┃┃┃┃╭╮┃╭╮┫╭╮┃╭╮┃┃━┫╰╯┃┃━┫╭╮┫┃\n┃╰━━┫┃┃┃╰╯┃╰┫╰╯┃╰━╯┃┃━┫┃━┫┃┃┃┃┃┃╭╮┃┃┃┃╭╮┃╰╯┃┃━┫┃┃┃┃━┫┃┃┃╰╮\n╰━━━┻┻┻┫╭━┻━┻━━┻━╮╭┻━━┻━━╯╰╯╰╯╰┻╯╰┻╯╰┻╯╰┻━╮┣━━┻┻┻┻━━┻╯╰┻━╯\n╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╭━╯┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╯┃\n╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╰━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰━━╯")
  try { 
    const answer = await promptUser()
    display(answer.introPrompt)   
  }
  catch(err){
    console.log(err)
  }
}

function display(answer){
  switch(answer){
    case "View All Employees":
      viewAll()
      break;
    case "View Employees By Department":
      viewDepartment()
      break;    
    case "Add Employee":
      add() 
      break;
    case "Remove Employee":
      remove() 
      break;
    case "Update Employee's Role":
      updateRole()
      break; 
    case "Total Utilize Budget":
      total()
      break;
    case "Done":
      connection.end();
      break;
  }
}

// view functions
function viewAll(){
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name ";
  query += "FROM employee ";
  query += "INNER JOIN role ON role.id = employee.role_id ";
  query += "INNER JOIN department ON department.id = role.department_id ";
  connection.query(query, function(err, res) {
      if (err) throw err;
      var data = [["id", "First Name", "Last Name", "Role", "Department"]]

      for (var i = 0; i < res.length; i++) {
        info = [res[i].id, res[i].first_name, res[i].last_name, res[i].title, res[i].name]
        data.push(info)
      };

      var config = {  
        border: table.getBorderCharacters("ramac"), 
        columns: { 
          0: { 
            width: 2   
          }, 
          1: { 
            width: 20  
          }, 
          2: { 
            width: 20   
          },
          3: { 
            width: 20   
          } ,
          4: { 
            width: 20   
          } ,
          5: { 
            width: 20  
          } ,
          6: { 
            width: 20  
          } 
        } 
      }; 

      var x = table.table(data, config); 
      console.log(x)
      init()
    });

};

function viewDepartment(){
    inquirer
        .prompt({ 
            name: "department",
            type: "input",
            message: "What department did the employee worked in?"
        })
    .then(function(answer){
      var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name ";
      query += "FROM employee ";
      query += "INNER JOIN role ON role.id = employee.role_id ";
      query += "INNER JOIN department ON role.department_id = department.id ";
      query += "WHERE (department.name = ?) ";
      connection.query(query,[answer.department], function(err, res) {
    if (err) throw err;
        dataDepartment = [["First Name", "Last Name", "Title", "Department"]]
    for (var i = 0; i < res.length; i++) {
        var infoDepartment = [res[i].first_name, res[i].last_name, res[i].title, res[i].name]
        dataDepartment.push(infoDepartment)
      }

      var config = {  
        border: table.getBorderCharacters("ramac"), 
        columns: { 
          0: { 
            width: 20  // Column 0 of width 1 
          }, 
          1: { 
            width: 20  // Column 1 of width 20 
          }, 
          2: { 
            width: 20   // Column 2 of width 5 
          },
          3: { 
            width: 20   // Column 2 of width 5 
          }
        } 
      }; 
      
      var x = table.table(dataDepartment, config); 
      console.log(x)
      init()
    });
});
};

function viewManager(){
    inquirer
        .prompt({ 
            name: "manager",
            type: "input",
            message: "What manager did the employee worked in?"
        })
      .then(function(answer){
          var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, manager.info ";
          query += "FROM employee ";
          query += "INNER JOIN role ON role.id = employee.role_id ";
          query += "INNER JOIN manager ON role.id = manager.id ";
          query += "WHERE (manager.info = ?) ";
          connection.query(query,[answer.manager], function(err, res) {
        if (err) throw err;
            dataManager = [["First Name", "Last Name", "Title", "Manager"]]
        for (var i = 0; i < res.length; i++) {
            var infoManager = [res[i].first_name, res[i].last_name, res[i].title, res[i].info]
            dataManager.push(infoManager)
          }
    
          var config = {  
            border: table.getBorderCharacters("ramac"), 
            columns: { 
              0: { 
                width: 20  // Column 0 of width 1 
              }, 
              1: { 
                width: 20  // Column 1 of width 20 
              }, 
              2: { 
                width: 20   // Column 2 of width 5 
              },
              3: { 
                width: 20   // Column 2 of width 5 
              }
            } 
          }; 
          
          var x = table.table(dataManager, config); 
          console.log(x)
          start()
        });
    });
};


// adding functions
async function add(){
  try {
  const newEmployee = await addPrompt()
  insertManagerEmployee(newEmployee)
  roles(newEmployee.title)

  }
  catch(err) {
    console.log("add" + err)
  }
}

function addPrompt(){
  return inquirer
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
      type: "list",
      message: "What is the employee's title?",
      choices: ["Front Desk", "Accountant","Housekeeper"]
    },
    {
      name: "manager",
      type: "input",
      message: "Who is the employee's manager?"
    },
  ])
}

function insert (defineRole,salary,departmentinfo){
  
  var department = "INSERT INTO department (name) VALUES ? ";
  connection.query(department,[[[departmentinfo]]],function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
  });
  
  var role = "INSERT INTO role (title, salary) VALUES ? ";
  connection.query(role,[[[defineRole, salary]]],function (err, result) {
  if (err) throw err;
  console.log("Number of records inserted: " + result.affectedRows);
  });

  select()
}

async function select(){
    connection.query("SELECT id FROM manager", function(err, res) {
      var array = []
      for (var i = 0; i < res.length; i++) {
        info2 = res[i].id
        array.push(info2)
      }
      var last_element2 = array[array.length - 1];
      manager_id.push(last_element2)
      selectID()
  }); 
  
}

async function selectID(){
  try{
    connection.query("SELECT id FROM role", function(err, res) {
      var array = []

      for (var i = 0; i < res.length; i++) {
        info2 = res[i].id
        array.push(info2)
      }
      var last_element2 = array[array.length - 1]
      role_id.push(last_element2)
      selectEmployeeID()
  });
      }
        catch (error) {
          console.log('deleteProduct -> error', error);
        }
  }

async function selectEmployeeID(){
  try{
    connection.query("SELECT * FROM employee.employee;", function(err, res) {
      var array = []

      for (var i = 0; i < res.length; i++) {
        info2 = res[i].id
        array.push(info2)
      }
      var last_element2 = array[array.length - 1] 
      employeeIDarr.push(last_element2)
      newEmployeeData()
  }); 
    
    connection.query("SELECT * FROM employee.department;", function(err, res) {
    var array = []

    for (var i = 0; i < res.length; i++) {
      info2 = res[i].id
      array.push(info2)
    }
    var last_element2 = array[array.length - 1] 
    console.log("select from d" + last_element2)
    newEmployeeDepartment.push(last_element2)
    newDepartmentData(last_element2)
});
    }
    catch (error) {
      console.log('deleteProduct -> error', error);
    }
}

function newDepartmentData(departmentID){
  console.log("newDepartmentData" + departmentID)
  var roleID = role_id[role_id.length - 1]
  console.log ("roleID" + roleID)
  connection.query('UPDATE role SET ? WHERE ?',
    [{
      department_id: departmentID
    },
    {
      id: roleID
    },
  ])

}

async function roles(newEmployee){
  switch(newEmployee){
    case "Front Desk":
      var defineRole = "Front Desk Clerk"
      var salary = 45000
      var departmentinfo = "Customer Service"
      insert(defineRole,salary,departmentinfo)
      break;
    case "Accountant":
      var defineRole = "Accountant"
      var salary = 75000
      var departmentinfo = "Fiance"
      insert(defineRole,salary,departmentinfo)
          break;
    case "Housekeeper":
      var defineRole = "Housekeeper"
      var salary = 32000
      var departmentinfo = "Customer Service"
      insert(defineRole,salary,departmentinfo)
          break;
  }
}

function insertManagerEmployee(newEmployee){
  var manager = "INSERT INTO manager (info) VALUES ? ";
  connection.query(manager,[[[newEmployee.manager]]],function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });

  var employee = "INSERT INTO employee (first_name, last_name) VALUES ? ";
  connection.query(employee,[[[newEmployee.first_name, newEmployee.last_name]]],function (err, result) {
  if (err) throw err;
    console.log("employee name inserted work");
  })
}
var role_id = []
var manager_id = []
var employeeIDarr = []
var newEmployeeDepartment = []

function newEmployeeData(){
  
  var roleID = role_id[role_id.length - 1]
  var managerID = manager_id[manager_id.length - 1]
  var employeeID = employeeIDarr[employeeIDarr.length - 1]
  connection.query('UPDATE employee SET ? WHERE ?',
    [{
      role_id: roleID,
      manager_id: managerID
    },
    {
      id: employeeID
    },
  ])
  viewAll()
}



// removing 
async function remove(){
  try{
  const removeEmployee = await removePrompt()
  console.log(removeEmployee.delete)
  employeeDelete(removeEmployee.delete)
  }
  catch(err){
    console.log("removing" + err )
  }
}
var removeRole = []
var removeManager = []
var removeDepartment = []
var removeEmployeeID = []

function employeeDelete(remove){
  
  connection.query("SELECT * FROM employee.employee WHERE (?)",
  {
    id: remove
  },
  function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      info = res[i].role_id
      info2 = res[i].manager_id
      info3 = res[i].id
      removeRole.push(info)
      removeManager.push(info2)
      removeEmployeeID.push(info3)
    }
  selectDepartmentDelete()
  })
}

function selectDepartmentDelete(){
  var last_element2 = removeRole[removeRole.length - 1]
  connection.query("SELECT * FROM employee.role WHERE ?",
  {
    id: last_element2
  },
  function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      info = res[i].department_id
      removeDepartment.push(info2)
    }
  finalEmployeeDeletion()
  })
}

function finalEmployeeDeletion(){
  var employee = removeEmployeeID[removeEmployeeID.length - 1]

  connection.query('DELETE FROM employee WHERE ?', {
      id: employee
    });
  removeFinalRole()
}

function removeFinalRole(){
  var role = removeRole[removeRole.length - 1]
  connection.query('DELETE FROM role WHERE ?', {
        id: role
      });
  removeFinalDepartment()
  }

function removeFinalDepartment(){
  var department = removeDepartment[removeDepartment.length - 1]
  connection.query('DELETE FROM department WHERE ?', {
        id: department
      });
  removeFinalManager()
}

function removeFinalManager(){
  var manager = removeManager[removeManager.length - 1]
  console.log("manager" + manager)
  connection.query('DELETE FROM manager WHERE ?', {
        id: manager
      });
  viewAll()
  }

function removePrompt(){
  return inquirer
    .prompt({
        name: "delete",
         type:"input",
        message:"What is the employee ID?",
    })
  }

//update roles
var updateRoleArr = []
var updateDepartmentArr = []
async function updateRole(){
  try {
    var update = await updateRolePrompt()
    updateRoleOptions(update)
    
  }
  catch(err){
    console.log("update role " + err )
  }
}
async function updateRoleOptions(update){
  console.log(update.id)
  connection.query("SELECT * FROM employee.employee WHERE (?)",
  { 
    id: update.id
  }, 
  function(err, res) {
    var array = []

    for (var i = 0; i < res.length; i++) {
      info2 = res[i].role_id
      array.push(info2)
    }
    var last_element2 = array[array.length - 1] 
    updateRoleArr.push(last_element2)
    var update1 = update
    selectDepartmentData(update1)
    console.log(1)
    });
  
  
  }
function updateOptions(update,departmentID){
  console.log ("updateOptions " + update.title)
  switch(update.title){
    case "Front Desk":
      var id = departmentID
      var defineRole = "Front Desk Clerk"
      var salary = 45000
      var departmentinfo = "Customer Service"
      updateRoleID(id,defineRole,salary,departmentinfo)
      break;
    case "Accountant":
      var id = departmentID
      var defineRole = "Accountant"
      var salary = 75000
      var departmentinfo = "Fiance"
      updateRoleID(id,defineRole,salary,departmentinfo)
          break;
    case "Housekeeper":
      var id = departmentID
      var defineRole = "Housekeeper"
      var salary = 32000
      var departmentinfo = "Customer Service"
      updateRoleID(id,defineRole,salary,departmentinfo)
          break;
  }
}

function selectDepartmentData(update){
  var updateRoleinfo = updateRoleArr[updateRoleArr.length - 1]
  connection.query("SELECT * FROM employee.role WHERE (?)",
  { 
    id: updateRoleinfo
  }, 
  function(err, res) {
    var array = []

    for (var i = 0; i < res.length; i++) {
      info2 = res[i].department_id
      array.push(info2)
    }
    var last_element2 = array[array.length - 1] 
    updateDepartmentArr.push(last_element2)
    console.log("select" + last_element2)
    var update1 = update
    updateOptions(update1, last_element2)
    });
}

function updateRoleID(DepartmentID,defineRole,salary,departmentinfo){
  var updateRoleinfo = updateRoleArr[updateRoleArr.length - 1]

  connection.query('UPDATE role SET ? WHERE ?',
    [{
      title: defineRole,
      salary: salary
    },
    {
      id: updateRoleinfo
    }]
    )
  var department = departmentinfo
  var departmentInfo = DepartmentID
  updateDepartmentData(department,departmentInfo)
}

function updateDepartmentData(department,departmentID){
  console.log(department)
  console.log("department id is " + departmentID)
  var updateDepartmentinfo = updateDepartmentArr[updateDepartmentArr.length - 1]
  console.log(updateDepartmentinfo)
  connection.query('UPDATE department SET ? WHERE ?',
    [{
      name: department
    },
    {
      id: departmentID
    }]
    )
}



function updateRolePrompt(){
  return inquirer
    .prompt([
        {
        name:"id",
        type:"number",
        message:"What is the ID of the employee you want to update?"
    },
    { 
        name: "title",
        type: "list",
        message: "What is the employee's title?",
        choices: ["Front Desk", "Accountant","Housekeeper"]
    }])
  }  

//update manager 
function updateManager(){
    inquirer
    .prompt([
        {
        name:"id",
        type:"number",
        message:"What is the ID of the employee you want to update?"
    },
    { 
        name: "manager",
        type: "input",
        message: "Who is the employee's new manager?"      
    }])
    .then(function(answer){
     connection.query(
      "UPDATE employees SET ? WHERE ?",
      [
        {
          manager: answer.manager
        },
        {
          id: answer.id
        }
    ],
      function(err, res) {
        if (err) throw err
        viewAll()
      }
    );
    });
};

function budget(){
  connection.query("SELECT * FROM employees", function(err, res) {
    var data = []
    for (var i = 0; i < res.length; i++) {
      info = res[i].salary
      data.push(info)
    }
    console.log(
      data.reduce(function(acc, val) { return acc + val; }, 0)
    )
    start()
  })
};

init();