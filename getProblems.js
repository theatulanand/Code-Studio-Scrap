const axios = require('axios');

class GetProblem {
    async getProblemStatement(slug) {
        const url = `https://api.codingninjas.com/api/v3/public_section/problem_detail?slug=${slug}&list_slug=&challenge_slug=&request_differentiator=1688486170400`;
        const maxRetries = 3;
        let retryCount = 0;

        let data = null;

        while (retryCount < maxRetries && data === null) {
            try {
                let response = await axios.get(url);
                data = response.data.data.offerable.problem
            } catch (error) {
                console.log("Error is", error.message);
                retryCount++;
                console.log("Retrying from get problems...");
            }
        }

        return data;
    }
}



module.exports = new GetProblem();
