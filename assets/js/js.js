document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.querySelector('.search-btn');
    const artistInput = document.querySelector('.artist-input');
    const details = document.querySelector('.details');

    // Function to fetch artist biography from Wikipedia API
    async function fetchArtistBio(artistName) {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${artistName}`;
        const options = {
            method: 'GET',
            headers: {
                'Api-User-Agent': 'Example/1.0', // Add a user agent as per Wikimedia's API usage policy
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const pages = data.query.pages;
            const firstPageId = Object.keys(pages)[0];
            const artistBio = pages[firstPageId].extract;
            return artistBio;
        } catch (error) {
            console.error('Error fetching artist biography:', error);
            return null;
        }
    }

    // Function to update the UI with artist bio
    function updateUI(artistBio) {
        details.innerHTML = `<h2>${artistInput.value} Bio</h2>`;
        if (artistBio) {
            details.innerHTML += `<p>${artistBio}</p>`;
        } else {
            details.innerHTML += '<p>Artist biography not found.</p>';
        }
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', async function () {
        const artistName = artistInput.value.trim();
        if (artistName !== '') {
            const artistBio = await fetchArtistBio(artistName);
            updateUI(artistBio);
        } else {
            alert('Please enter an artist name.');
        }
    });
});
