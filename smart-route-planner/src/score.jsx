const students = [
  { roll: 101, name: "Rahul",  dept: "CSE-AI", score: 92 },
  { roll: 102, name: "Swetha", dept: "CSE-AI", score: 85 },
  { roll: 103, name: "Dinesh", dept: "CSE-AI", score: 96 },
  { roll: 104, name: "Priya",  dept: "CSE-AI", score: 88 },
  { roll: 105, name: "Arjun",  dept: "CSE-AI", score: 79 },
];

function getHighestScorer() {
  return students.reduce((top, s) => (s.score > top.score ? s : top), students[0]);
}

function getAverage() {
  const sum = students.reduce((acc, s) => acc + s.score, 0);
  return (sum / students.length).toFixed(1);
}

function printScoreboard() {
  console.log("Roll No\tStudent Name\tDepartment\tScore");
  students.forEach(s => {
    console.log(`${s.roll}\t${s.name}\t${s.dept}\t${s.score}`);
  });
  console.log();
  const top = getHighestScorer();
  console.log(`Highest Score : ${top.score} (${top.name})`);
  console.log(`Average Score : ${getAverage()}`);
}

function addStudent(roll, name, dept, score) {
  students.push({ roll, name, dept, score });
}

function updateScore(roll, newScore) {
  const student = students.find(s => s.roll === roll);
  if (!student) {
    console.log("Student Not Found");
    return;
  }
  student.score = newScore;
  console.log("Score Updated Successfully");
  const top = getHighestScorer();
  console.log(`Highest Score : ${top.score} (${top.name})`);
  console.log(`Average Score : ${getAverage()}`);
}


printScoreboard();

console.log();


addStudent(106, "Kavin", "CSE-AI", 94);
console.log("Student Added Successfully");
console.log();
printScoreboard();

console.log();


updateScore(105, 98);

console.log();


updateScore(102, 90);

console.log();


updateScore(999, 80);