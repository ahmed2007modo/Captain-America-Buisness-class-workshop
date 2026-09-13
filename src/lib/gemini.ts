export type GoalType = 'weight-loss' | 'muscle-gain' | 'glucose-optimization' | 'glp1-mode'

export interface GeminiScanResult {
  dishName: string
  status: 'Good' | 'Okay' | 'Avoid'
  proteinGrams: string
  reasoning: string
  silentOrderTip: string
}

export interface VenueDetails {
  name: string
  address: string
  phone: string
  website: string
  mapUrl: string
  openingHours: string
  menuSummary: string
  goalAlignedDishes: string[]
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>
    }
  }>
}

export async function callGemini(
  model: string,
  prompt: string,
  imageDataUrl?: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env file.')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const contents: Array<{ role: string; parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> }> = []

  if (imageDataUrl) {
    // Guard: reject filename strings like "image.png" — only accept data URLs
    if (!imageDataUrl.startsWith('data:image/')) {
      throw new Error('Invalid image data. Please upload a valid image file.')
    }
    // Validate and extract base64 from data URL
    let base64Data = imageDataUrl
    let mimeType = 'image/jpeg'
    const commaIndex = imageDataUrl.indexOf(',')
    if (commaIndex !== -1) {
      const header = imageDataUrl.substring(0, commaIndex)
      base64Data = imageDataUrl.substring(commaIndex + 1)
      mimeType = header.includes('png') ? 'image/png' : header.includes('jpeg') || header.includes('jpg') ? 'image/jpeg' : 'image/jpeg'
    }
    // Validate base64 length (min 100 chars to be meaningful)
    if (!base64Data || base64Data.length < 100) {
      throw new Error('Invalid image data. Please upload a valid image file.')
    }
    contents.push({
      role: 'user',
      parts: [
        { text: prompt },
        { inline_data: { mime_type: mimeType, data: base64Data } }
      ]
    })
  } else {
    contents.push({ role: 'user', parts: [{ text: prompt }] })
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.3,
        topP: 0.9,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json'
      }
    })
  })

  if (!response.ok) {
    let detail = ''
    try { const body = await response.json(); detail = body?.error?.message || '' } catch { /* ignore */ }
    if (response.status === 401) throw new Error('Invalid Gemini API key.')
    if (response.status === 429) throw new Error('API rate limit reached. Please try again.')
    throw new Error(detail || `Gemini API error: ${response.status}`)
  }

  const data: GeminiResponse = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty response from Gemini.')
  return text
}

export async function fastScan(
  prompt: string,
  imageDataUrl?: string
): Promise<GeminiScanResult> {
  const raw = await callGemini('gemini-1.5-flash', prompt, imageDataUrl)
  return parseGeminiResponse(raw)
}

export async function executiveScan(
  prompt: string,
  imageDataUrl?: string
): Promise<GeminiScanResult> {
  const raw = await callGemini('gemini-1.5-pro', prompt, imageDataUrl)
  return parseGeminiResponse(raw)
}

export async function findRestaurants(
  occasion: string,
  goal: GoalType
): Promise<VenueDetails[]> {
  const prompt = `Find Berlin restaurants for a ${occasion} occasion for someone following a ${goal} diet. Return JSON array of venues with: name, address, phone, website, map_url, opening_hours, menu_highlights (3 dishes aligned with the goal), and goal_aligned_dishes (array of dish names).`
  const raw = await callGemini('gemini-1.5-flash', prompt)
  try {
    const cleaned = raw.replace(/```(?:json)?/g, '').trim()
    const start = cleaned.indexOf('[')
    const end = cleaned.lastIndexOf(']')
    const jsonPart = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned
    const parsed = JSON.parse(jsonPart) as VenueDetails[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function analyzeMenuPhoto(imageDataUrl: string): Promise<{ dishes: string[]; fullMenu: string }> {
  const prompt = `Analyze this restaurant menu photo and return: 1) All dish names available on the menu, 2) A summarized full menu description. Return JSON: {"dishes":["dish1","dish2","..."],"fullMenu":"full menu description"}`
  const raw = await callGemini('gemini-1.5-pro', prompt, imageDataUrl)
  try {
    const parsed = JSON.parse(raw) as { dishes: string[]; fullMenu: string }
    return parsed
  } catch {
    return { dishes: ['Unknown Dish'], fullMenu: raw.slice(0, 500) }
  }
}

function parseGeminiResponse(raw: string): GeminiScanResult {
  try {
    const parsed = JSON.parse(raw) as GeminiScanResult
    return {
      dishName: parsed.dishName || 'Unknown Dish',
      status: ['Good', 'Okay', 'Avoid'].includes(parsed.status) ? parsed.status : 'Okay',
      proteinGrams: parsed.proteinGrams || 'N/A',
      reasoning: parsed.reasoning || 'Analysis complete.',
      silentOrderTip: parsed.silentOrderTip || 'Enjoy your meal.'
    }
  } catch {
    return {
      dishName: 'Analysis Incomplete',
      status: 'Okay',
      proteinGrams: 'N/A',
      reasoning: raw.slice(0, 200),
      silentOrderTip: 'Review manually.'
    }
  }
}
