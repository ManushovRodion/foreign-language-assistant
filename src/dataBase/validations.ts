export function validRequered<T>(
  object = {} as T,
  key: keyof T,
  message = "Значение поля {KEY} не должно быть пустым!"
) {
  const errorMmssage = message.replace("{KEY}", String(key));

  if (
    !object[key] ||
    (typeof object[key] === "string" && !String(object[key]).trim())
  ) {
    throw Error(errorMmssage);
  }
}
