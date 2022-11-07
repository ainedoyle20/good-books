const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
	}
};

export const getBookById = async (bookId) => {
  console.log("GETTING BOOK BY ID");
  try {
    const response = await fetch(`https://hapi-books.p.rapidapi.com/book/${bookId}`, options);
    const bookDetails = await response.json();
    return bookDetails;
  } catch (error) {
    console.log("Error fetching book by id: ", error);
  }
}

export const searchBookByName= async (bookName) => {
  console.log("GETTING BOOK BY NAME");
  if (!bookName) return;
  const modifiedBookName = bookName.replaceAll(" ", "+");
  console.log("modifiedBookName: ", modifiedBookName);
  try {
    const response = await fetch(`https://hapi-books.p.rapidapi.com/search/${modifiedBookName}`, options);
    const searchResults = await response.json();
    return searchResults;
  } catch (error) {
    console.log("Error searching for book: ", error);
  }
}

// fetch('https://hapi-books.p.rapidapi.com/book/56597885', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));