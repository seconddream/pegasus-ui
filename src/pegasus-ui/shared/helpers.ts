export const wait = (ms:number) => new Promise(res => setTimeout(res, ms))
export const padToArray = (middle: number, expand: number, step=1) =>{
  const paddings =  Array.from(Array(expand+1).keys())
  paddings.shift()
  const negPaddings = paddings.reverse()
  return [...negPaddings.map(i=>middle-i*step), middle, ...paddings.map(i=>middle+i*step)]
}