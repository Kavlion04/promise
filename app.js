async function fetchUserInfo() {
    const username = document.getElementById('username').value;
    const errorDiv = document.getElementById('error');
    const userInfo = document.getElementById('user-info');

    errorDiv.textContent = '';
    userInfo.innerHTML = '';

    if (!username) {
        errorDiv.textContent = 'Iltimos, GitHub nikini kiriting.';
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error(`Bu GitHub nikname ${username} mavjud emas`);
        }

        const data = await response.json();
        localStorage.setItem('github-user', JSON.stringify(data));

        userInfo.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar" width="100">
            <h2>${data.name || 'Ismi yo\'q'}</h2>
            <p>${data.bio || 'Biografiya mavjud emas'}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Public Repositories: ${data.public_repos}</p>
            <p>Location: ${data.location || 'Yer mavjud emas'}</p>
            <p>Company: ${data.company || 'Kompaniya mavjud emas'}</p>
            <p>Website: <a href="${data.blog}" target="_blank">${data.blog || 'Mavjud emas'}</a></p>
            <p>Twitter: <a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username || 'Mavjud emas'}</a></p>
            <p>Blog: <a href="${data.blog}" target="_blank">${data.blog || 'Mavjud emas'}</a></p>
            <p>Subscribe: <a href="https://youtube.com/${data.twitter_username}" target="_blank">${data.twitter_username || 'Mavjud emas'}</a></p>
            <a href="${data.html_url}" target="_blank">GitHub Profilini Ko'rish</a>
        `;
    } catch (error) {
        errorDiv.textContent = error.message;
    }
}

fetchUserInfo();