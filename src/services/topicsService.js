import { get } from "../utils/request";

export async function getTopics() {
    const result = await get("topics")
    return result
}

export async function getTopic(id) {
    const result = await get(`topics/${id}`)
    return result
}