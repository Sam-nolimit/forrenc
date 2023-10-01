// import formatTodoForAI from "./formatTodoForAI";
// const fetchSuggestion = async (board:Board) => {

//     const todos = formatTodoForAI(board);
//     console.log('FORMATTED TODO to send >> ', todos)
//     const res = await fetch('/api/generateSummary',{
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },  
//         body:JSON.stringify({
//             body:JSON.stringify({todos}),
//         })
//     })

//     const GPTData = await res?.json();
//     console.log(GPTData)
//     const {content} = GPTData;

//     return content;
// }

// export default fetchSuggestion;

import formatTodoForAI from "./formatTodoForAI";

// Define an interface for the response data structure (assuming it matches this structure)
interface ApiResponse {
  content: string;
  // You can add more properties as needed
}

const fetchSuggestion = async (board: Board): Promise<string> => {
  try {
    // Format todos using the formatTodoForAI function
    const todos = formatTodoForAI(board);
    console.log('Formatted todos to send:', todos);

    // Make the API request
    const response = await fetch('/api/generateSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todos }),
    });

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Parse the JSON response
    const apiData: ApiResponse = await response.json();

    // Log the response data
    console.log('API Response:', apiData);

    // Return the content from the response
    return apiData.content;
  } catch (error) {
    console.error('Error fetching suggestion:', error);
    // Handle the error as needed (e.g., show an error message to the user)
    throw error;
  }
};

export default fetchSuggestion;
