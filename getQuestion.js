const { default: axios } = require("axios");

class GetQuestion{
    async getQuestionSlug(pageNumber) { 
        console.log("Page Number is",pageNumber)
        let totalattempt = 3;
        let attempt = 0;

        let data = []

        while(attempt < totalattempt){
            try {
                let response = await axios.get(`https://api.codingninjas.com/api/v3/public_section/all_problems?count=100&page=${pageNumber}&search=&attempt_status=NOT_ATTEMPTED&sort_entity=&sort_order=&request_differentiator=1688484581454`);
                let questions = response.data.data.problem_list;
                for (let i = 0; i < questions.length; i++){
                    data.push(questions[i].slug);
                }
                break;
            } catch (error) {
                if (attempt === 0) {
                    console.log("Error getting question slug", error)
                }
                console.log("Getting question slug retrying...")
                attempt++;
            }
        }

        return data;
    }
}

module.exports = new GetQuestion();