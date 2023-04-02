// Your code here

// Takes in an array of information about an employee
function createEmployeeRecord(recordArray) {
    return { // creates an object for the employee information
      firstName: recordArray[0],
      familyName: recordArray[1],
      title: recordArray[2],
      payPerHour: recordArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  // it takes in array of arrays whhich are nested array representing the different information about each employee

  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11,15)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord['timeInEvents'] = [timeIn];
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11,15)),
        date: dateStamp.slice(0, 10)
    }
    employeeRecord['timeOutEvents'] = [timeOut];
    return employeeRecord;
  }

  
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100; // divided by a 100 to convert it to a decimal number of hours, since time is given in 24hr system
  }
  

  // This function helps calculate how much an employee earned on a specific date, based on their hourly pay rate and how many hours they worked on that date.

  function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  // 
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date); // the function uses the map method to create a new list that contains all the dates the employee worked
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
   // the function uses the reduce method to add up the wages earned by the employee on each of the dates in the datesWorked list. It starts with an initial value of 0 and then adds the wages earned on each date to the running total. 
    return totalWages;
  }
  // This function helps calculate the total amount of wages earned by all employees over a certain period of time.
  function calculatePayroll(employeeRecords) {
    const totalWages = employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalWages;
  }



