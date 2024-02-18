INSERT INTO employee (nik, name, is_active, start_date, end_date, created_at, updated_at)
VALUES
  ('11012', 'Budi', true, '2022-12-12', '2029-12-12', '2022-12-12 00:00:00', '2022-12-12 00:00:00'),
  ('11013', 'Jarot', true, '2021-09-01', '2028-09-01', '2021-09-01 00:00:00', '2021-09-01 00:00:00');


INSERT INTO employee_education (employee_id, name, level, description, created_by, updated_by, created_at, updated_at)
VALUES
  (1, 'SMKN 7 Jakarta', 'SMA', 'Sekolah Menengah Atas', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00'),
  (2, 'Universitas Negeri Jakarta', 'Strata 1', 'Sarjana', 'admin', 'admin', '2021-09-01 00:00:00', '2021-09-01 00:00:00');


INSERT INTO employee_profile (employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, created_by, updated_by, created_at, updated_at)
VALUES
  (1, 'Jakarta', '1997-05-02', 'Laki-Laki', true, null, 'admin', 'admin', '2022-12-12', '2022-12-12'),
  (2, 'Sukabumi', '1996-05-02', 'Laki-Laki', false, null, 'admin', 'admin', '2021-09-01', '2021-09-01');

INSERT INTO employee_family (employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by, updated_by, created_at, updated_at)
VALUES
  (1, 'Marni', '32100594109960002', 'Ibu Rumah Tangga', 'Denpasar', '1995-10-17', 'Islam', true, false, 'Istri', 'admin', 'admin', '2022-12-12', '2022-12-12'),
  (1, 'Clara', '32100594109020004', 'Pelajar', 'Bangkalan', '2008-10-17', 'Islam', true, false, 'Anak', 'admin', 'admin', '2022-12-12', '2022-12-12'),
  (1, 'Stephanie', '32100594109020005', 'Pelajar', 'Bangkalan', '2008-10-17', 'Islam', true, false, 'Anak', 'admin', 'admin', '2021-09-01', '2021-09-01');