import { generateErrorMessage } from 'zod-error';
class ValidationError extends Error {
    constructor(error) {
        super('Validation Error');
        this.statusCode = 400;
        this.errors = this.stringifyErrors(error);
    }
    stringifyErrors(error) {
        const errorString = generateErrorMessage(error.issues, {
            code: {
                enabled: false,
            },
            path: {
                enabled: true,
                transform: ({ value }) => (value ? value : ''),
                type: 'breadcrumbs',
            },
            message: {
                enabled: true,
                transform: ({ value }) => (value ? value : ''),
            },
            delimiter: {
                component: '',
                error: '\n',
            },
            transform: ({ index, pathComponent, messageComponent }) => {
                const pathMessage = pathComponent ? ` at ${pathComponent}` : '';
                return `Error ${index + 1}${pathMessage}: ${messageComponent}`;
            },
        });
        return errorString;
    }
}
export default ValidationError;
