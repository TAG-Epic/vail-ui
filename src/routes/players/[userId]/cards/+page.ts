export async function load(request) {
    const userId = request.params.userId;

    return {userId};
}
