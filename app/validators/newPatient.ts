import dayjs from 'dayjs';

/**
 * Validates the input for creating a new patient, including their name and date of birth.
 *
 * This function checks that the first name and last name are non-empty, consist of only letters,
 * and are between 2 and 50 characters long. It also validates the date of birth format and ensures
 * that the patient is between 1 and 120 years old.
 *
 * @param {string} firstName - The first name of the patient.
 * @param {string} lastName - The last name of the patient.
 * @param {string} dateOfBirth - The date of birth of the patient in a string format.
 *
 * @returns {Object|null} Returns an object with error messages for invalid fields, or null if inputs are valid.
 * @returns {string} [errors.firstName] - Error message for an invalid first name.
 * @returns {string} [errors.lastName] - Error message for an invalid last name.
 * @returns {string} [errors.dateOfBirth] - Error message for an invalid date of birth.
 */
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
