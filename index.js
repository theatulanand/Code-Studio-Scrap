const getProblems = require("./getProblems");
const { getQuestionSlug } = require("./getQuestion");
const fs = require("fs");

async function scrapIt() {
    let questionsSlug = [];
    const totalPage = 31
    try {
        for (let i = 1; i <= totalPage; i++){
            let pageSlug = await getQuestionSlug(i);
            questionsSlug = [...questionsSlug, ...pageSlug]
        }
    } catch (error) {
        console.log("Error while getting questions slug ", error)
    }

    // Getting real problem statement
    let count = 0;
    for (let i = 0; i < questionsSlug.length; i++) {
        try {
            let problemStatement = await getProblems.getProblemStatement(questionsSlug[i]);
            if (problemStatement.name) {
                let sanitizedName = sanitizeFileName(problemStatement.name); // Sanitize the problem name
                let filePath = `./Problems/${sanitizedName}.json`;
                count++;
                console.log(`${count}  Saved ${sanitizedName}.json`);
                await fs.writeFileSync(filePath, JSON.stringify(problemStatement, null, 2));
            }
        } catch (error) {
            console.log("Error while getting and saving problem statement", error);
        }
    }

    console.log("Scrapping completed");
    console.log(`Total problems Scrapped: ${count}`);
}

function sanitizeFileName(fileName) {
    // Replace invalid characters with an underscore
    return fileName.replace(/[<>:"\/\\|?*]/g, "_");
}

scrapIt();
