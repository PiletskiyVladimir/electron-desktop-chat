export function apiError (error) {
    return {
        status: error.response.status,
        data: null,
        errors: error.response.data
    }
}

export function apiSuccess (response) {
    return {
        status: response.status,
        data: response.data,
        errors: null
    }
}