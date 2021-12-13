import axios from 'axios'

export const getSubs = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subs`)
}


export const getSub = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)
}

export const removeSub = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, { headers: { authToken } })
}

export const updateSub = async (slug, sub, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, { headers: { authToken } })
}

export const createSub = async (sub, authToken) => {
    console.log("sub:", sub)
    return await axios.post(`${process.env.REACT_APP_API}/sub`, sub, { headers: { authToken } })
}