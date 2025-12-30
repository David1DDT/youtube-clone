export function omit<T extends object>(
    obj: T,
    property: keyof T | (keyof T)[]
) {
    if (Array.isArray(property)) {
        // remove multiple keys
        const entries = Object.entries(obj).filter(
            ([key]) => !property.includes(key as keyof T)
        )
        return Object.fromEntries(entries) as Partial<T>
    }

    // remove single key
    const { [property]: _, ...rest } = obj
    return rest
}
