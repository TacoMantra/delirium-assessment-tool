/**
 * Enum representing the different types of risk assessment outcomes.
 *
 * This enum is used to classify a patient's risk assessment result based on certain medical features.
 * It includes categories ranging from a positive diagnosis of delirium to no identified risk. Each
 * type indicates a different level of concern for the patient's condition.
 *
 * @readonly
 * @enum {string}
 */
enum RiskAssessmentType {
    'positiveDiagnosis' = 'Positive Diagnosis',
    'atRisk' = 'At Risk',
    'oneOrMoreRiskFactors' = 'One or More Risk Factors',
    'noRisk' = 'No Risk',
    'unknown' = 'Unknown',
}

export default RiskAssessmentType;
