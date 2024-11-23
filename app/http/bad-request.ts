export function notFound() {
    return new Response('Not Found', { status: 404, statusText: 'Not Found' });
}

/**
 * Creates an HTTP response with a status of 400 (Bad Request).
 *
 * @param {string} body - The body content to include in the response.
 * @returns {Response} A `Response` object with a 400 status and the provided body.
 */
export function badRequest(body: string) {
    return new Response(body, {
        status: 400,
        statusText: 'Bad Request',
    });
}
