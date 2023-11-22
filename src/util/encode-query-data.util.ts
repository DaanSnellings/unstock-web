export function encodeQueryData(data: Record<string, string>): string {
  const ret = []
  for (const d in data)
    ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`)

  return ret.join('&')
}
