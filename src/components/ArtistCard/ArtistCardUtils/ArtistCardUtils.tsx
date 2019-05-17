export function formattedBio(
  nationality?: string,
  birthday?: string,
  deathday?: string
): string {
  if (nationality && birthday && deathday) {
    return `${nationality} ${birthday} - ${deathday}`
  }

  if (nationality && birthday) {
    return `${nationality} ${birthday}`
  }

  if (nationality) {
    return `${nationality}`
  }

  return ``
}
