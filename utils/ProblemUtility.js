const axios = require("axios")

const getLanguageById = (lang)=> {
    const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }

    return language[lang.toLowerCase()];
}

const submitBatch = async (submissions) => {

    
const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
      base64_encoded: 'false'
    },
    headers: {
      'x-rapidapi-key': 'a9dc9ee2cbmsh93c758bbc93e83fp134a0ajsnad844bb6b569',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      submissions
    }
  };
  
  async function fetchData() {
      try {
          const response = await axios.request(options);

          return response.data;
      } catch (error) {
          console.error(error);
      }
  }
  
 return await fetchData();


}

const waiting = async(timer)=> {
  setTimeout(() => {
    return 1;
  }, timer);
}

const submitToken = async (resultToken) => {
// yeh option wala code judge0 ki web se copy kiya hai
const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'a9dc9ee2cbmsh93c758bbc93e83fp134a0ajsnad844bb6b569',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

while(true) {

  const result = await fetchData();
  
  const IsResultObtained = result.submission.every((res)=> res.status_id>2);
  
  if(IsResultObtained) {
    return result.submissions;
  }

  await waiting(1000);
  
} 
  

}

module.exports = {getLanguageById,submitBatch, submitToken};