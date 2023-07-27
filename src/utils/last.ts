export default function last(list: any): any {
    if (Array.isArray(list) === false)
    return undefined;
  return list.length ? list[list.length-1] : undefined;
}
