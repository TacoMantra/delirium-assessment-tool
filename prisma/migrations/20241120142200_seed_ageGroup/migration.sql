
INSERT INTO age_group (name, min_age, max_age)
VALUES
    ('0-17', 0, 17),
    ('18-30', 18, 30),
    ('31-40', 31, 40),
    ('41-50', 41, 50),
    ('51-60', 51, 60),
    ('61+', 61, NULL)
ON CONFLICT (name) DO NOTHING;
