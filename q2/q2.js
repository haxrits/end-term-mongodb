
const hrDB = db.getSiblingDB("hr");
const employees = hrDB.getCollection("employees");

print("\nSET 1 - SCENARIO 1.2: EMPLOYEE DIRECTORY");
print("Database: hr | Collection: employees");


print("\nSTEP 1 - insertMany(): Insert eight employees");
const result1 = employees.insertMany([
  { empId: 1, name: "Anita",  dept: "HR",      salary: 42000, city: "Chennai" },
  { empId: 2, name: "Bala",   dept: "IT",      salary: 65000, city: "Bengaluru" },
  { empId: 3, name: "Charan", dept: "IT",      salary: 58000, city: "Chennai" },
  { empId: 4, name: "Deepa",  dept: "Finance", salary: 50000, city: "Mumbai" },
  { empId: 5, name: "Elan",   dept: "IT",      salary: 72000, city: "Chennai" },
  { empId: 6, name: "Farah",  dept: "HR",      salary: 45000, city: "Delhi" },
  { empId: 7, name: "Gopal",  dept: "Finance", salary: 61000, city: "Chennai" },
  { empId: 8, name: "Hema",   dept: "Sales",   salary: 38000, city: "Hyderabad" }
]);
printjson(result1);


print("\nSTEP 2 - $gt: Employees earning more than 60000");
employees.find(
  { salary: { $gt: 60000 } },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);


print("\nSTEP 3 - $gte and $lte: Salary between 45000 and 60000 inclusive");
employees.find(
  { salary: { $gte: 45000, $lte: 60000 } },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);


print("\nSTEP 4 - $in: Employees in IT or Finance department");
employees.find(
  { dept: { $in: ["IT", "Finance"] } },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);


print("\nSTEP 5A - $and: Chennai employees earning more than 50000");
employees.find(
  {
    $and: [
      { city: "Chennai" },
      { salary: { $gt: 50000 } }
    ]
  },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);


print("\nSTEP 5B - $or: Employees in HR or earning more than 70000");
employees.find(
  {
    $or: [
      { dept: "HR" },
      { salary: { $gt: 70000 } }
    ]
  },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);


print("\nSTEP 6 - $nin: Employees not living in Chennai or Bengaluru");
employees.find(
  { city: { $nin: ["Chennai", "Bengaluru"] } },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);

print("\nSTEP 7 - $regex: Names beginning with A, B or C");
employees.find(
  { name: { $regex: "^[ABC]" } },
  { _id: 0, empId: 1, name: 1, dept: 1, salary: 1, city: 1 }
).sort({ empId: 1 }).forEach(printjson);

print("\nSTEP 8 - Projection, sort(), skip() and limit()");
employees.find(
  {},
  { _id: 0, name: 1, salary: 1 }
).sort({ salary: -1 }).skip(2).limit(3).forEach(printjson);
