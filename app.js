const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "./output/team.html");

const render = require("./lib/htmlRenderer");

const staff = []
const idArray = []

function appMenu() {

    function createManager() {
        console.log("Build your team.");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your Manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your Manager's ID?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your Manager's Email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your Manager's Office Number?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            staff.push(manager);
            idArray.push(answers.manager.id);
            createTeam()
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberType",
                message: "What type of Team Member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "None"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your Engineer's name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your Engineer's Id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your Engineer's email?",
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your Engineer's Github?"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            staff.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your Intern's name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your Intern's ID?"
            },
            {
                type: "input",
                name: "inputEmail",
                message: "What is your Intern's email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "Where does your Intern attend school?"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            staff.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }

    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdir(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(staff), "utf-8")
    }

    createManager();
}

appMenu();



