

const collegeDB = db.getSiblingDB("college");
const students = collegeDB.getCollection("students");

print("\nSET 1 - SCENARIO 1.1: STUDENT RECORDS");
print("Database: college | Collection: students");

print("\nSTEP 1 - insertOne(): Insert the first student");
const result1 = students.insertOne({
  rollNo: 101,
  name: "Arun",
  dept: "CSE",
  marks: 78,
  city: "Chennai"
});
printjson(result1);

print("\nSTEP 2 - insertMany(): Insert four more students");
const result2 = students.insertMany([
  {
    rollNo: 102,
    name: "Priya",
    dept: "ECE",
    marks: 85,
    city: "Bengaluru"
  },
  {
    rollNo: 103,
    name: "Karthik",
    dept: "CSE",
    marks: 62,
    city: "Chennai"
  },
  {
    rollNo: 104,
    name: "Ravi",
    dept: "MECH",
    marks: 55,
    city: "Madurai"
  },
  {
    rollNo: 105,
    name: "Suresh",
    dept: "CSE",
    marks: 91,
    city: "Trichy"
  }
]);
printjson(result2);

print("\nSTEP 3A - Display all students");
students.find(
  {},
  { _id: 0, rollNo: 1, name: 1, dept: 1, marks: 1, city: 1 }
).sort({ rollNo: 1 }).forEach(printjson);

print("\nSTEP 3B - Display only CSE students");
students.find(
  { dept: "CSE" },
  { _id: 0, rollNo: 1, name: 1, dept: 1, marks: 1, city: 1 }
).sort({ rollNo: 1 }).forEach(printjson);


print("\nSTEP 4 - updateOne(): Set marks of roll number 103 to 68");
const result4 = students.updateOne(
  { rollNo: 103 },
  { $set: { marks: 68 } }
);
printjson(result4);
.
print("\nSTEP 5 - updateMany(): Add semester 3 to every CSE student");
const result5 = students.updateMany(
  { dept: "CSE" },
  { $set: { semester: 3 } }
);
printjson(result5);

print("\nSTEP 6 - deleteOne(): Delete roll number 104");
const result6 = students.deleteOne({ rollNo: 104 });
printjson(result6);


print("\nSTEP 7 - countDocuments(): Count remaining students");
const remainingStudents = students.countDocuments({});
print("Total students remaining: " + remainingStudents);

print("\nFinal student records:");
students.find(
  {},
  { _id: 0, rollNo: 1, name: 1, dept: 1, marks: 1, city: 1, semester: 1 }
).sort({ rollNo: 1 }).forEach(printjson);
