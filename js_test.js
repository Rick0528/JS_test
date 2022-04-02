//1. Count Employees Number by Factory => [ {name: 'BR1', count: 4}, ... ]
function numOfEmp(factories) {
    let allFactories = [];
    for (let f of factories) {
        let factory = {
            name: f.name,
            count: f.employees.length,
        };
        allFactories.push(factory);
    }
    return allFactories;
}

//2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
function numOfFac(factories) {
    //find all employees()
    allEmployees = [];
    for (let factory of factories) {
        for (let employee of factory.employees) {
            allEmployees.push(employee);
        }
    }

    //calculate the number of employees
    let numOfFactory = [];
    for (let i = 0; i < allEmployees.length; i++) {
        let target = allEmployees[i];
        let e = {
            employee: allEmployees[i],
            count: 1,
        };
        numOfFactory.push(e);
        for (let j = i + 1; j < allEmployees.length; j++) {
            let current = allEmployees[j];
            if (current == target) {
                numOfFactory[i].count++;
                allEmployees.splice(j, 1);
            }
        }
    }
    return numOfFactory;
}

//3.Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
function sortEmp(factories) {
    for (let factory of factories) {
        factory.employees.sort(function (a, b) {
            let nameA = a.toLowerCase();
            let nameB = b.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }
    return factories;
}

//4. Count total hours worked in 1 day ?
function calculateHours(employeeType) {
    //calculate the working hours of every shift
    for (e of employeeType) {
        shiftHours = e.work_end.slice(0, 2) - e.work_begin.slice(0, 2);
        shiftHours = shiftHours > 0 ? shiftHours : shiftHours + 24;
        e.hours = shiftHours;
    }
    return employeeType;
}

function totalWorkedHours(employees, employeeType) {
    empType = calculateHours(employeeType);
    let totalHours = 0;
    //add up all working hours
    for (let employee of employees) {
        let type = employee.type;
        totalHours += empType[type - 1].hours;
    }
    return totalHours;
}

//5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
function typeClassification(dayTime) {
    //classification
    let type = [];
    const time = dayTime.slice(0, 2); //24 hour-clock(0~24)
    for (let e of employeeType) {
        if (e.work_begin.slice(0, 2) <= time && time < e.work_end.slice(0, 2)) {
            type.push(e.id);
        }
    }
    return type;
}

function howManyEmployeeByTime(dayTime) {
    let type = typeClassification(dayTime);
    //the number of working employee
    let numWorkingEmp = 0;
    for (let employee of employees) {
        if (type.includes(employee.type)) {
            numWorkingEmp++;
        }
    }
    return numWorkingEmp;
}

//6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
function totalDaysOfAllTask(tasks) {
    const workedHoursPerDay = totalWorkedHours(employees, employeeType);
    let totalMinutes = 0;
    for (let t of tasks) {
        totalMinutes += t.duration;
    }
    let totalHours = totalMinutes / 60;
    let totalDays = Math.round((totalHours / workedHoursPerDay) * 100) / 100;
    return totalDays;
}
