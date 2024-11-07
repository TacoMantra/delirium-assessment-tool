import dayjs from 'dayjs';

export default function validateNewPatient(
    firstName: string,
    lastName: string,
    dateOfBirth: string
) {
    const dateOfBirthObject = dayjs(dateOfBirth);
    const age = dayjs().diff(dateOfBirth, 'years');

    const errors: {
        firstName?: string;
        lastName?: string;
        dateOfBirth?: string;
    } = {};

    const nameRegex = /^[A-Za-z]{2,50}$/;

    if (!firstName) {
        errors.firstName = 'First name is required.';
    }

    if (!nameRegex.test(firstName)) {
        errors.firstName =
            'First name must contain only letters and be 2-50 characters long.';
    }

    if (!lastName) {
        errors.lastName = 'Last name is required.';
    }

    if (!nameRegex.test(lastName)) {
        errors.lastName =
            'Last name must contain only letters and be 2-50 characters long.';
    }

    if (!dateOfBirthObject.isValid()) {
        errors.dateOfBirth = 'Invalid date format.';
        return errors;
    }

    if (age < 1 || age > 120) {
        errors.dateOfBirth = 'Patient must be between 1 and 120 years old.';
    }

    return Object.keys(errors).length ? errors : null;
}
