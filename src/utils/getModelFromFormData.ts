export default function GetModelFromFormData<T>(form: FormData): T {
    let data: Record<string, string> = {};
    for (var pair of form.entries()) {
        data[pair[0]] = pair[1].toString();
      }
    return data as unknown as T;
}
