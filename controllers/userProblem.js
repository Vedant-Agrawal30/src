const Problem = require("../models/problem");
const {getLanguageById, submitBatch, submitToken} = require("../utils/ProblemUtility")

const createProblem = async(req,res)=> {
    const {title, description, difficulty,tags, visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body

    try {
        
        for(const {language, completeCode} of referenceSolution) {

            // source Code : 
            // language_id : 
            // stdin : 
            // expectedOutput : 

            const languageId = getLanguageById(language);
// I am creating Batch submission
            const submissions = visibleTestCases.map((testcase)=> ({

                source_code:completeCode,
                language_id:languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }))


        const submitResult = await submitBatch(submissions);

        const resultToken = submitResult.map((value)=> {value.token })

        const testResult = await submitToken(resultToken);

        for(const test of testResult) {
            if(test.status_id != 3 ) {
              return   res.status(400).send("Error Occured")
            }
        }
    }
    // we can store it in out DB if our for loop ends and cehck all thing is perfectly

   const userProblem =  await Problem.create({
        ...req.body, 
        problemCreator: req.result._id
    });

    res.status(201).send("Problem Saved successfully");


    } catch (error) {
        res.status(400).send("Error : "+ error)
    }
}

module.exports = createProblem;