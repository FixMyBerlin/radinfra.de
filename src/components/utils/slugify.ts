export const slugify = (input: string) => {
  const umlautMap: { [key: string]: string } = {
    ä: 'ae',
    ö: 'oe',
    ü: 'ue',
    ß: 'ss',
  }

  return input
    .toLowerCase()
    .trim()
    .replace(/[äöüß]/g, (match) => umlautMap[match] || '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes
}
