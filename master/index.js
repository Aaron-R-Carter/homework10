const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const open = require("open");
const api = require("./api");
// pdf require
const generateHTML = require("generateHTML");

const questions = [
    {
        type: "input",
        name: "github",
        message: "what is your github username?"

    },

    {
        type: "list",
        name: "color",
        message: "what is your favorite color?",
        choices: [
            "blue", "red", "green", "pink"
        ]

    }
]

function writeToFile(fileName, data) {

    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
};

function init() {
    inquirer.prompt(questions)
        .then(({ github, color }) => {
            api
                .getUser(github)
                .then(response =>
                    api.getTotalStars(github).then(stars => {
                        return generateHTML({
                            stars,
                            color,
                            ...response.data
                        });
                    }))
                .then(html => {
                    //convert from html to pdf
                });
            result.stream.pipe(
                fs.createWriteStream(path.join(__dirname, "githubResume.pdf"))
            )
            conversion.kill();
        })
    open(path.join(process.cwd(), "githubResume.pdf"))
}

init();