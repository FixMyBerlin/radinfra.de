export const sum = (input: number[]) => {
  return input.reduce((acc: number, value) => acc + (value || 0), 0)
}
