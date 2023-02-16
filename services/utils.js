export async function useFetch(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()

    return data
  } catch (e) {
    throw console.error(e)
  }
}
