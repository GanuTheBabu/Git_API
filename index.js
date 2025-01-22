const getUser = async (username) => {
  try {
    response = await fetch(`https://api.github.com/users/${username}/events`);
    if (!response.ok) {
      throw new Error(`Request error from server to GitHub`);
    }
    data = await response.json();

    return data;
  } catch (error) {
    console.log(`There is an error fetching data of ${username}`, error);
  }
};

(async () => {
  args = process.argv;
  username = args[2];
  const userdata = await getUser(username);
  for (let i = 0; i < userdata.length; i++) {
    switch (userdata[i].type) {
      case "CreateEvent":
        console.log(
          `${userdata[i].type} for the repo ${userdata[i].repo.name}`
        );
        break;
      case "PushEvent":
        console.log(
          `${userdata[i].type} ${userdata[i].payload.size} commit to ${userdata[i].repo.name}`
        );
        break;
      default:
        break;
    }
  }
})();
