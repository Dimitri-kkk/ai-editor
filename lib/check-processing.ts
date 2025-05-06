export async function checkImageProcessing(url: string) {
    try {
        const response = await fetch(url)
        if(response.ok) {
            return true
        }
    } catch (error) {
        console.error("Error checking image processing:", error)
        return false
    }
}