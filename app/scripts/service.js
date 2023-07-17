const BASE_URL = "http://localhost:3035"
const getSearch = async (_key) => {
    let res = await fetch(`${BASE_URL}/search?key=${_key}`);
    return res.json()
}

export { getSearch }