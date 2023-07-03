export default function last(list) {
    if (Array.isArray(list) === false)
    return undefined;
  return list.length ? list[list.length-1] : undefined;
}